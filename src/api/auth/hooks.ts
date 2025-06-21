import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AuthStore } from "@/src/store/authStore";
import { login, logout, signup } from "./api";
import { Login, User, Signup } from "@/src/types/auth";

export const useLogin = (): UseMutationResult<
  { accessToken: string; refreshToken: string; user: User },
  Error,
  Login
> => {
  const setAuth = AuthStore((state) => state.login); // 로그인 후 상태 저장 함수

  return useMutation({
    mutationFn: (data: Login) => login(data),
    onSuccess: (data) => {
      // 로그인 응답 로그
      console.log("=== Login API Response ===");
      console.log("Full login response:", data);
      console.log("user object:", data.user);
      console.log("user.id:", data.user?.id);
      console.log("user.role:", data.user?.role);

      setAuth(data.accessToken, data.refreshToken, data.user);
    },
  });
};

export const useSignup = (): UseMutationResult<User, Error, Signup> => {
  return useMutation({
    mutationFn: (data: Signup) => signup(data),
  });
};

export const useLogout = (): UseMutationResult<void, Error, void> => {
  return useMutation({
    mutationFn: () => logout(),
  });
};
