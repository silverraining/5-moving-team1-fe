import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AuthStore } from "@/src/store/authStore";
import { login } from "./api";
import { Login, User } from "@/src/types/auth";

export const useLogin = (): UseMutationResult<
  { token: string; user: User },
  Error,
  Login
> => {
  const setAuth = AuthStore((state) => state.login); // 로그인 후 상태 저장 함수

  return useMutation({
    mutationFn: (data: Login) => login(data),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
    },
    onError: (error) => {
      console.error("로그인 실패", error);
    },
  });
};
