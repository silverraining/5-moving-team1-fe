import { create } from "zustand";
import { User } from "../types/auth";
import Cookies from "js-cookie";

interface LoginFunction {
  (accessToken: string, refreshToken: string, user: User): void;
}

interface LogoutFunction {
  (): void;
}

interface AuthStoreState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isLogin: boolean;
  login: LoginFunction;
  logout: LogoutFunction;
}

export const AuthStore = create<AuthStoreState>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isLogin: false,
  login: (accessToken: string, refreshToken: string, user: User) => {
    Cookies.set("AccessToken", accessToken, { expires: 1 });
    Cookies.set("RefreshToken", refreshToken, { expires: 1 });
    set({ refreshToken, accessToken, user, isLogin: true });
  },
  logout: () => {
    Cookies.remove("AccessToken");
    Cookies.remove("RefreshToken");
    set({ accessToken: null, refreshToken: null, user: null, isLogin: false });
  },
}));
