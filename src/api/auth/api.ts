import { Login, Signup, User } from "@/src/types/auth";
import apiClient from "../axiosclient";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
/**
 *
 * @param data  로그인 정보
 * @param data.email 이메일
 * @param data.password 비밀번호
 * @param data.userType 사용자 유형 (예: CUSTOMER, MOVER)
 * @returns
 * 로그인 성공 시 accessToken, refreshToken, user 정보를 포함한 응답
 * @throws 로그인 실패 시 에러 메시지
 * @description
 */
export const login = async (data: Login): Promise<LoginResponse> => {
  try {
    const { email, password, userType } = data;
    const response = await apiClient.post(`/auth/login/local`, {
      email,
      password,
      userType,
    });
    return response.data;
  } catch (error) {
    throw new Error("로그인 실패");
  }
};
/**
 * @param data 회원가입 정보
 * @param data.name 이름
 * @param data.email 이메일
 * @param data.phone 전화번호
 * @param data.password 비밀번호
 * @param data.userType 사용자 유형 (예: CUSTOMER, MOVER)
 * @description
 * 회원가입을 위한 API 호출 함수입니다.
 * 성공 시 사용자 정보를 반환합니다.
 * @returns
 */
export const signup = async (data: Signup): Promise<LoginResponse["user"]> => {
  try {
    const { email, password, userType, name, phone } = data;
    const response = await apiClient.post(`/auth/register`, {
      name,
      email,
      phone,
      password,
      userType,
    });
    return response.data;
  } catch (error) {
    throw new Error("회원가입 실패");
  }
};
