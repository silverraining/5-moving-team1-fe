import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  notificationAll,
  notificationAllRes,
  notificationRead,
  notificationReadReq,
} from "./api";

export const useNotificationAll = (enabled: boolean) => {
  return useQuery<notificationAllRes[], Error>({
    queryKey: ["notifications"],
    queryFn: notificationAll,
    enabled,
  });
};

export const useNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, notificationReadReq>({
    mutationFn: notificationRead,
  });
};
