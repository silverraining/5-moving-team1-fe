import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { notificationAllRes } from "../api/notification/api";

interface NotificationStore {
  notifications: notificationAllRes[] | undefined;
  markAsRead: boolean;
  setMarkAsRead: (state: boolean) => void;
  setNotifications: (newNotifications: notificationAllRes[]) => void;
  removeNotification: (id: string) => void;
  reset: () => void;
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
      removeNotification: (id) =>
        set((state) => {
          const updated = (state.notifications ?? []).filter(
            (n) => n.id !== id
          );
          return { notifications: updated };
        }),

      reset: () => set(initialState), // reset 구현
    }),
    {
      name: "notification-store-session",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
