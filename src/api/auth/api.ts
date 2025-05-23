import { Login, User } from "@/src/types/auth";
import apiClient from "../axiosclient";

export const login = async (
  data: Login
): Promise<{ token: string; user: User }> => {
  try {
    const { email, password, userType } = data;
    const response = await apiClient.post(`/auth/login/${userType}`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("로그인 실패");
  }
};
