"use client";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";
import CustomScrollY from "@/src/lib/customScrollY";
import { useNotificationStore } from "@/src/store/notification";

interface NotificationDropDownProps {
  onHighlightClick?: (highlight: string) => void;
  onClose?: () => void;
}

export default function NotificationDropDown({
  onClose,
}: NotificationDropDownProps) {
  const { notifications } = useNotificationStore();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));

  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        top: "20px",
        left: "20px",
        width: isTablet ? "312px" : "359px",
        height: isTablet ? "314px" : "352px",
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
        <NotificationHeader onClose={onClose} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {notifications?.map((item) => (
            <NotificationItem
              key={item.id}
              targetId={item.targetId}
              type={item.type}
              message={item.message}
              createdAt={item.createdAt}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
