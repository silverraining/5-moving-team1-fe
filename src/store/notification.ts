import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { notificationAllRes } from "../api/notification/api";

interface NotificationStore {
  notifications: notificationAllRes[] | undefined;
  markAsRead: boolean;
  setMarkAsRead: (state: boolean) => void;
  setNotifications: (newNotifications: notificationAllRes[]) => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      notifications: [],
      markAsRead: false,
      setMarkAsRead: (state) => set({ markAsRead: state }),
      setNotifications: (newNotifications) =>
        set(() => ({
          notifications: newNotifications,
        })),
    }),
    {
      name: "notification-store-session", // 세션 스토리지 key 이름
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
