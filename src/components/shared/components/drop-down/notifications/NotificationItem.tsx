"use client";

import { Box, Typography } from "@mui/material";
import dayjs from "@/src/lib/dayjsConfig";
/**
 * dayjs로 createdAt을 포맷팅하여 상대 시간(timeAgo)으로 변환
 * 예: "2시간 전", "3일 전", "1주일 전" 등
 */
interface NotificationItemProps {
  message: string;
  highlight: string;
  createdAt: string; // ISO 형식 예: 2025-05-22T10:30:00
  onHighlightClick?: () => void;
}

export default function NotificationItem({
  message,
  highlight,
  createdAt,
  onHighlightClick,
}: NotificationItemProps) {
  const timeAgo = dayjs(createdAt).fromNow();

  // message에서 highlight가 존재하는지
  const parts = message.includes(highlight)
    ? message.split(highlight)
    : [message, ""];

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "14px 12px 14px 24px",
        backgroundColor: theme.palette.White[100],
        borderBottom: `1px solid ${theme.palette.Line[100]}`,
        boxSizing: "border-box",
      })}
    >
      <Typography
        variant="R_14"
        sx={(theme) => ({
          color: theme.palette.Black[300],
          lineHeight: "20px",
          wordBreak: "keep-all",
          marginBottom: "4px",
        })}
      >
        {parts[0]}
        {highlight && message.includes(highlight) && (
          <Box
            component="span"
            onClick={onHighlightClick}
            sx={(theme) => ({
              color: theme.palette.PrimaryBlue[300],
              cursor: onHighlightClick ? "pointer" : "default",
              fontWeight: onHighlightClick ? "500" : "normal",
              "&:hover": onHighlightClick
                ? { textDecoration: "underline" }
                : undefined,
            })}
          >
            {highlight}
          </Box>
        )}
        {parts[1]}
      </Typography>

      {/* createdAt을 포맷팅한 상대 시간 */}
      <Typography
        variant="R_12"
        sx={(theme) => ({
          color: theme.palette.Grayscale[400],
        })}
      >
        {timeAgo}
      </Typography>
    </Box>
  );
}
