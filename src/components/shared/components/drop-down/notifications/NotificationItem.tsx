"use client";

import { Box, Stack, Typography } from "@mui/material";
import dayjs from "@/src/lib/dayjsConfig";
import { useRouter } from "next/navigation";
import { useNotificationRead } from "@/src/api/notification/hooks";
import { useCompleteEstimateRequest } from "@/src/api/customer/hook";
import { AuthStore } from "@/src/store/authStore";
import { PATH } from "@/src/lib/constants";
import { useNotificationStore } from "@/src/store/notification";
import { useSnackbar } from "@/src/hooks/snackBarHooks";

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
  const { mutate: completeRequest, isPending } = useCompleteEstimateRequest();
  const { openSnackbar } = useSnackbar();

  const timeAgo = dayjs(data.createdAt).fromNow();

  const getHighlight = () => {
    switch (data.type.trim()) {
      case "NEW_ESTIMATE_REQUEST":
        return "견적 요청";
      case "ESTIMATE_CONFIRMED":
        return "견적이 확정";
      case "MOVE_DAY_REMINDER":
        return "이사 일정";
      case "NEW_OFFER":
        return "견적";
      case "CREATE_REVIEW":
        return "신규 리뷰";
      case "COMPLETED_CHECK":
        return "완료";
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

    // COMPLETED_CHECK 타입은 이사 완료 처리 확인
    if (data.type.trim() === "COMPLETED_CHECK") {
      handleCompleteRequest();
    } else {
      // 다른 타입들은 페이지 이동
      navigateToPage();
    }
  };

  // 이사 완료 처리
  const handleCompleteRequest = () => {
    if (!data.targetId) {
      openSnackbar(
        "완료 처리할 견적 요청을 찾을 수 없습니다. 견적이 확정된 상태인지 확인해주세요.",
        "error",
        3000
      );
      return;
    }

    const isConfirmed = window.confirm(
      "이사가 완료되었나요?\n완료 처리하시겠습니까?"
    );

    if (isConfirmed) {
      completeRequest(data.targetId, {
        onSuccess: (response) => {
          openSnackbar(
            `${response.message} 🎉 저희 서비스를 이용해주셔서 감사합니다.`,
            "success",
            4000
          );
          // 스낵바 표시 후 새로고침
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        onError: (error) => {
          console.error("이사 완료 처리 실패:", error);
          openSnackbar(
            "이사 완료 처리에 실패했습니다. 다시 시도해주세요.",
            "error",
            3000
          );
        },
      });
    }
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
                onClick={isPending ? undefined : onHighlightClick} // 로딩 중 클릭 비활성화
                sx={(theme) => ({
                  color: data.isRead
                    ? theme.palette.Grayscale[300] // 읽은 상태: 회색
                    : theme.palette.PrimaryBlue[300], // 안 읽은 상태: 파란색
                  cursor: isPending ? "not-allowed" : "pointer", // 로딩 중 커서 변경
                  fontWeight: highlight ? "500" : "normal",
                  opacity: isPending ? 0.6 : 1, // 로딩 중일 때 투명도 적용
                  "&:hover": {
                    textDecoration: isPending ? "none" : "underline", // 로딩 중 호버 효과 제거
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
