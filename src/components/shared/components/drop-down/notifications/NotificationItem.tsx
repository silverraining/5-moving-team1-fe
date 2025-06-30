"use client";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "@/src/lib/dayjsConfig";
import { useRouter } from "next/navigation";
import { useNotificationRead } from "@/src/api/notification/hooks";
import { AuthStore } from "@/src/store/authStore";
import { PATH } from "@/src/lib/constants";
import CloseIcon from "@mui/icons-material/Close";
import { useNotificationStore } from "@/src/store/notification";

/**
 * dayjs로 createdAt을 포맷팅하여 상대 시간(timeAgo)으로 변환
 * 예: "2시간 전", "3일 전", "1주일 전" 등
 */
interface NotificationItemProps {
  data: {
    id: string;
    message: string;
    targetId: string;
    type: string;
    createdAt: string;
  }; // ISO 형식 예: 2025-05-22T10:30:00
}

export default function NotificationItem({ data }: NotificationItemProps) {
  const router = useRouter();
  const { user } = AuthStore();
  const { removeNotification } = useNotificationStore();
  const { mutate } = useNotificationRead();
  const timeAgo = dayjs(data.createdAt).fromNow();

  const hendleNotificationDelete = () => {
    mutate(
      { id: data.id },
      {
        onSuccess: () => {
          removeNotification(data.id);
        },
      }
    );
  };
  const getHighlight = () => {
    switch (data.type.trim()) {
      case "NEW_ESTIMATE_REQUEST":
        return "견적 요청";
      case "ESTIMATE_CONFIRMED":
        return "견적이 확정";
      case "MOVE_DAY_REMINDER":
        return "이사 일정";
      case "NEW_OFFER":
        return "견적이";
      case "CREATE_REVIEW":
        return "신규 리뷰";
      case "COMPLETED_CHECK":
        return "완료하셨나요?";
      default:
        return "";
    }
  };
  const highlight = getHighlight();

  const onHighlightClick = () => {
    hendleNotificationDelete();
    switch (data.type.trim()) {
      case "NEW_ESTIMATE_REQUEST":
        return router.push(PATH.moverRequest);
      case "ESTIMATE_CONFIRMED":
        return router.push(PATH.moverEstimateConfirm);
      case "MOVE_DAY_REMINDER":
        if (user?.role === "CUSTOMER")
          return router.push(PATH.userEstimateHistory);
        if (user?.role === "MOVER")
          return router.push(PATH.moverEstimateConfirm);
      case "NEW_OFFER":
        return router.push(PATH.userEstimate);
      case "CREATE_REVIEW":
        return router.push(PATH.moverMypage);
      case "COMPLETED_CHECK":
        return router.push(PATH.userReviewPending);
      default:
        return "";
    }
  };
  // message에서 highlight가 존재하는지
  const parts = data.message.includes(highlight)
    ? data.message.split(highlight)
    : [data.message, ""];

  return (
    <Stack
      display={"flex"}
      flexDirection={"row"}
      sx={(theme) => ({
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: theme.palette.White[100],
        borderBottom: `1px solid ${theme.palette.Line[100]}`,
        boxSizing: "border-box",
        "&:hover > .close-button": {
          opacity: 1,
          pointerEvents: "auto",
        },
      })}
    >
      <Box
        sx={{
          justifyContent: "center",
          padding: "14px 12px 14px 24px",
          flexDirection: "column",
        }}
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
          {highlight && (
            <Box
              component="span"
              onClick={onHighlightClick}
              sx={(theme) => ({
                color: theme.palette.PrimaryBlue[300],
                cursor: "pointer",
                fontWeight: highlight ? "500" : "normal",
                "&:hover": highlight
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
      <IconButton
        onClick={() => hendleNotificationDelete()}
        className="close-button"
        sx={{
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          "&:hover": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}
