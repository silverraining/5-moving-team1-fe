import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../lib/constants";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  adapter: "fetch", // fetch adapter 사용
  fetchOptions: {
    cache: "force-cache", // Next.js 캐싱 옵션 (필요시)
  },
});
//accessToken을 자동으로 backend로 넘겨주기
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken"); // 쿠키에서 토큰 가져오기

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default apiClient;
