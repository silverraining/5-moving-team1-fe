"use client";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "@/src/lib/dayjsConfig";
import { useRouter } from "next/navigation";
import { useNotificationRead } from "@/src/api/notification/hooks";
import { AuthStore } from "@/src/store/authStore";
import { PATH } from "@/src/lib/constants";
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
    isRead: boolean;
  }; // ISO 형식 예: 2025-05-22T10:30:00
}

export default function NotificationItem({ data }: NotificationItemProps) {
  const router = useRouter();
  const { user } = AuthStore();
  const { markAsReadById } = useNotificationStore();
  const { mutate } = useNotificationRead();
  const timeAgo = dayjs(data.createdAt).add(9, "hour").fromNow();
  // console.log("서버에서 내려온 createdAt:", data.createdAt);

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
    if (!data.isRead) {
      mutate(
        { id: data.id },
        {
          onSuccess: () => {
            markAsReadById(data.id);
          },
        }
      );
    }

    // 페이지 이동
    navigateToPage();
  };

  // 페이지 이동 (읽음 여부와 관계없이)
  const navigateToPage = () => {
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
        backgroundColor: data.isRead
          ? theme.palette.White[100] // 읽은 상태
          : theme.palette.PrimaryBlue[50], // 안 읽은 상태
        borderBottom: `1px solid ${theme.palette.Line[100]}`,
        boxSizing: "border-box",
      })}
    >
      <Box
        sx={{
          justifyContent: "center",
          padding: "14px 12px 14px 24px",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Box>
          <Typography
            variant="R_14"
            sx={(theme) => ({
              color: theme.palette.Black[300],
              lineHeight: "20px",
              wordBreak: "keep-all",
            })}
          >
            {parts[0]}
            {highlight && (
              <Box
                component="span"
                onClick={onHighlightClick} // isRead 체크 제거하여 항상 클릭 가능
                sx={(theme) => ({
                  color: data.isRead
                    ? theme.palette.Grayscale[300] // 읽은 상태: 회색
                    : theme.palette.PrimaryBlue[300], // 안 읽은 상태: 파란색
                  cursor: "pointer", // 항상 포인터 커서
                  fontWeight: highlight ? "500" : "normal",
                  "&:hover": {
                    textDecoration: "underline", // 항상 호버 효과
                  },
                })}
              >
                {highlight}
              </Box>
            )}
            {parts[1]}
          </Typography>
        </Box>
        <Typography
          variant="R_12"
          sx={(theme) => ({
            color: theme.palette.Grayscale[400],
            marginTop: "4px",
          })}
        >
          {timeAgo}
        </Typography>
      </Box>
    </Stack>
  );
}
