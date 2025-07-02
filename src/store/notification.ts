import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { notificationAllRes } from "../api/notification/api";

interface NotificationStore {
  notifications: notificationAllRes[];
  markAsRead: boolean;
  setMarkAsRead: (state: boolean) => void;
  setNotifications: (newNotifications: notificationAllRes[]) => void;
  addNotification: (notification: notificationAllRes) => void;
  markAsReadById: (id: string) => void;
  reset: () => void;
}

const initialState = {
  notifications: [] as notificationAllRes[],
  markAsRead: true,
};

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setMarkAsRead: (state) => set({ markAsRead: state }),
      setNotifications: (newNotifications) => {
        if (!newNotifications) return;

        set({
          notifications: Array.isArray(newNotifications)
            ? newNotifications
            : [newNotifications],
          markAsRead: false,
        });
      },
      addNotification: (notification) => {
        const currentNotifications = get().notifications;
        set({
          notifications: [notification, ...currentNotifications],
          markAsRead: false,
        });
      },
      markAsReadById: (id: string) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          ),
        }));
      },
      reset: () => set(initialState),
    }),
    {
      name: "notification-store-session",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
