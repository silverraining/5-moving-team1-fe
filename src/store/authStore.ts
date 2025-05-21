import { create } from "zustand";

interface User {
  id: string;
  name: string;
  role: "customer" | "mover" | null;
  token: string | null;
}

interface UserState {
  user: User | null;
  login: (user: User) => void;
  isLogin: boolean;
  logout: () => void;
}

export const authStore = create<UserState>((set) => ({
  user: null,
  isLogin: false,
  login: (user) => set({ user, isLogin: true }),
  logout: () => set({ user: null, isLogin: false }),
}));
