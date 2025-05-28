import axios from "axios";
import { API_BASE_URL } from "../lib/constants";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  adapter: "fetch", // fetch adapter 사용
  fetchOptions: {
    cache: "force-cache", // Next.js 캐싱 옵션 (필요시)
  },
});

export default apiClient;
