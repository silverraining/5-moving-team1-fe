import axios from "axios";
import Cookies from "js-cookie";
import { AuthStore } from "@/src/store/authStore";
import { API_BASE_URL } from "../lib/constants";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10초 타임아웃 설정
});

let isRefreshing = false; // 토큰 갱신 중복 요청 방지 플래그
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = []; // 갱신 중에 들어온 요청들을 저장하는 큐

/**
 * refresh 중에 실패한 요청들을 처리하는 함수
 * @param error - 에러 발생 시 에러 전달
 * @param token - 갱신 성공 시 새 토큰 전달
 */
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  failedQueue = []; // 큐 초기화
};

// 요청 인터셉터: 모든 요청에 accessToken 헤더 자동 추가
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken"); // 쿠키에서 토큰 가져오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 헤더에 토큰 설정
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config;
    const logout = AuthStore.getState().logout; // 상태 관리에서 로그아웃 함수 가져오기

    // 1) refresh token 만료 감지: API에서 이런 메시지를 받으면 바로 로그아웃 처리
    if (error.response?.data?.message === "Refresh 토큰이 만료되었습니다") {
      // 쿠키 삭제
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      // 상태 초기화 후 로그아웃
      logout();
      return Promise.reject(error);
    }

    // 2) access token 만료 감지 및 갱신 처리
    if (
      error.response?.data?.message === "토큰이 만료되었습니다" &&
      !originalRequest._retry // 재시도 중복 방지 플래그 확인
    ) {
      // 이미 토큰 갱신 중이라면, 갱신 완료 후 재요청 대기
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          // 갱신이 끝나면 queued 요청을 실행할 수 있도록 큐에 넣음
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // 큐에서 받은 새 토큰으로 Authorization 헤더 재설정 후 재요청
            if (!originalRequest.headers) originalRequest.headers = {};
            originalRequest.headers.Authorization = "Bearer " + token;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // 토큰 갱신 시작
      originalRequest._retry = true; // 중복 재시도 방지 플래그 설정
      isRefreshing = true;

      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      // refresh token 없으면 무조건 로그아웃 처리
      if (!refreshToken && accessToken) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        logout();
        return Promise.reject(error);
      }

      try {
        // refresh token 으로 access token 재발급 요청
        const { data } = await axios.post(
          `${API_BASE_URL}/auth/token/access`,
          { refreshToken },
          { withCredentials: true }
        );

        // 새로운 access token 쿠키에 저장
        Cookies.set("accessToken", data.accessToken);

        // axios 기본 헤더도 갱신
        apiClient.defaults.headers.common["Authorization"] =
          "Bearer " + data.accessToken;

        // 원래 요청 헤더도 갱신
        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers.Authorization = "Bearer " + data.accessToken;

        // 대기중이던 요청들에 토큰 전달하며 실행
        processQueue(null, data.accessToken);

        // 원래 요청 재시도
        return apiClient(originalRequest);
      } catch (err) {
        // 갱신 실패 시 대기중인 요청들 에러 처리 및 로그아웃
        processQueue(err, null);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        logout();
        return Promise.reject(err);
      } finally {
        // 갱신 플래그 초기화
        isRefreshing = false;
      }
    }

    // 3) 토큰 만료 외 다른 오류는 그대로 reject
    return Promise.reject(error);
  }
);

export default apiClient;
