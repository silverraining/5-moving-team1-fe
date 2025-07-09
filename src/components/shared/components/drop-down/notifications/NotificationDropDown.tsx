"use client";
import { Box, useTheme, useMediaQuery, Stack, Typography } from "@mui/material";
import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";
import CustomScrollY from "@/src/lib/customScrollY";
import { useNotificationStore } from "@/src/store/notification";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import { useNotificationRead } from "@/src/api/notification/hooks";
import { useQueryClient } from "@tanstack/react-query";
interface NotificationDropDownProps {
  onHighlightClick?: (highlight: string) => void;
  onClose?: () => void;
}

export default function NotificationDropDown({
  onClose,
}: NotificationDropDownProps) {
  const { notifications, markAsReadById } = useNotificationStore();
  const { mutate } = useNotificationRead();
  const queryClient = useQueryClient();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const ids = notifications?.map((item) => item.id);

  const allRead = () => {
    mutate(
      { ids: ids },
      {
        onSuccess: () => {
          // 각 알림을 개별적으로 읽음 처리
          notifications?.forEach((notification) => {
            if (!notification.isRead) {
              markAsReadById(notification.id);
            }
          });
          // 알림 목록 강제 refetch
          queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
      }
    );
  };

  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        top: "20px",
        left: "20px",
        width: isTablet ? "312px" : "359px",
        maxHeight: "352px",
        backgroundColor: theme.palette.White[100],
        border: `1px solid ${theme.palette.Line[200]}`,
        boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.06)",
        borderRadius: "24px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      })}
    >
      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          pr: "2px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: isTablet ? "8px 12px" : "10px 16px",
          ...CustomScrollY,
        }}
      >
        <NotificationHeader
          hasNotifications={!!notifications && notifications.length > 0}
          onMarkAllAsRead={allRead}
          onClose={onClose}
        />

        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {notifications?.length === 0 && <EmptyNotifyCation />}
          {notifications?.map((item) => (
            <NotificationItem data={item} key={item.id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
const EmptyNotifyCation = () => {
  return (
    <Stack width={"100%"} height={"100%"} alignItems={"center"} pb={3}>
      <NotificationsOffIcon sx={{ width: 80, height: 80, color: "grey.300" }} />
      <Typography color="grey.400">도착한 알림이 없습니다.</Typography>
    </Stack>
  );
};
