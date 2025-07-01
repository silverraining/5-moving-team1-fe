import { create } from "zustand";
import { User } from "../types/auth";
import Cookies from "js-cookie";
import { persist } from "zustand/middleware";
import { CustomerProfileResponse } from "../api/customer/api";
import { MoverProfileRequest } from "../api/mover/api";

interface LoginFunction {
  (accessToken: string, refreshToken: string, user: User): void;
}

interface LogoutFunction {
  (): void;
}
interface SetProfileFunction {
  (profile: CustomerProfileResponse | MoverProfileRequest): void;
}
interface AuthStoreState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isLogin: boolean;
  login: LoginFunction;
  logout: LogoutFunction;
  profile: CustomerProfileResponse | MoverProfileRequest | null;
  setProfile: SetProfileFunction;
}

// 쿠키에서 초기 상태를 가져오는 함수
const getInitialState = () => {
  const accessToken = Cookies.get("accessToken") || null;
  const refreshToken = Cookies.get("refreshToken") || null;
  return {
    accessToken,
    refreshToken,
    user: null,
    isLogin: !!accessToken,
    profile: null as CustomerProfileResponse | MoverProfileRequest | null,
  };
};

export const AuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      ...getInitialState(),
      login: (accessToken: string, refreshToken: string, user: User) => {
        Cookies.set("accessToken", accessToken, { expires: 1 });
        Cookies.set("refreshToken", refreshToken, { expires: 1 });
        set({
          refreshToken,
          accessToken,
          user,
          isLogin: true,
          profile: null as CustomerProfileResponse | MoverProfileRequest | null,
        });
      },
      logout: () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isLogin: false,
        });
      },
      setProfile: (profile) => {
        set({ profile });
      },
    }),
    {
      name: "auth-storage", // 로컬 스토리지에 저장될 키 이름
      partialize: (state) => ({
        // partialize: user와 isLogin 상태만 localStorage에 저장 (토큰은 쿠키에서 관리)
        user: state.user,
        isLogin: state.isLogin,
      }),
    }
  )
);
