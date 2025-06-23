import axios from "axios";
import Cookies from "js-cookie";
import { AuthStore } from "@/src/store/authStore";
import { API_BASE_URL } from "../lib/constants";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
};

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const logout = AuthStore.getState().logout;

    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    // ✅ Access Token이 존재하지 않으면 만료로 간주

    if (
      error.response.message === "Unauthorized" ||
      error.response.data.message === "토큰이 만료되었습니다"
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = "Bearer " + token;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/auth/token/access`,
          { refreshToken },
          { withCredentials: true }
        );
        // ✅ 새 Access Token을 받아오고 쿠키에 저장
        Cookies.set("accessToken", data.accessToken);
        apiClient.defaults.headers.common["Authorization"] =
          "Bearer " + data.accessToken;

        processQueue(null, data.accessToken);

        originalRequest.headers.Authorization = "Bearer " + data.accessToken;
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // ✅ RefreshToken이  없다면 → 즉시 로그아웃
    if (!refreshToken) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      logout();
      return Promise.reject(error);
    }

    // ✅ 나머지 일반적인 에러는 그대로 넘김
    return Promise.reject(error);
  }
);

export default apiClient;
