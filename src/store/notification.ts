import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { notificationAllRes } from "../api/notification/api";

interface NotificationStore {
  notifications: notificationAllRes[] | undefined;
  markAsRead: boolean;
  setMarkAsRead: (state: boolean) => void;
  setNotifications: (newNotifications: notificationAllRes[]) => void;
  reset: () => void; // reset 추가
}

const initialState = {
  notifications: [],
  markAsRead: true,
};

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      ...initialState,
      setMarkAsRead: (state) => set({ markAsRead: state }),
      setNotifications: (newNotifications) =>
        set(() => ({
          notifications: newNotifications,
          markAsRead: false,
        })),
      reset: () => set(initialState), // reset 구현
    }),
    {
      name: "notification-store-session",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
