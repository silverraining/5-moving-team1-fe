"use client";

import { Stack, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Chat } from "@/src/components/shared/components/text-field/Chat";
import { convertToLabel } from "@/src/utils/convertToLabel";
import dayjs from "dayjs";

interface ChatHistoryProps {
  step: number;
  moveType?: string;
  moveDate?: string;
  onBackStep1?: () => void;
  onBackStep2?: () => void;
}

export default function ChatHistory({
  step,
  moveType,
  moveDate,
  onBackStep1,
  onBackStep2,
}: ChatHistoryProps) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  return (
    <Stack spacing={isSmall ? "8px" : "24px"}>
      {/* 첫 번째 인사 메시지 - 모든 스텝에서 표시 */}
      <Chat
        variant="sent"
        content={`몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 :)`}
        delay={step === 1 ? 500 : 0}
      />

      {/* 이사 종류 질문 - 모든 스텝에서 표시 */}
      <Chat
        variant="sent"
        content={`이사 종류를 선택해 주세요.`}
        delay={step === 1 ? 1200 : 0}
      />

      {/* 이사 종류 답변 - step 2 이상에서 표시 */}
      {step >= 2 && moveType && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: isSmall ? "4px" : "6px",
          }}
        >
          <Chat
            variant="received"
            content={convertToLabel(moveType)}
            delay={step === 2 ? 500 : 0}
          />
          <Typography
            onClick={onBackStep1}
            variant={isSmall ? "M_12" : "R_16"}
            sx={{
              cursor: "pointer",
              color: theme.palette.Grayscale[500],
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            수정하기
          </Typography>
        </Box>
      )}

      {/* 이사 예정일 질문 - step 2 이상에서 표시 */}
      {step >= 2 && (
        <Chat
          variant="sent"
          content={`이사 예정일을 선택해주세요.`}
          delay={step === 2 ? 1200 : 0}
        />
      )}

      {/* 이사 예정일 답변 - step 3 이상에서 표시 */}
      {step >= 3 && moveDate && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: isSmall ? "4px" : "6px",
          }}
        >
          <Chat
            variant="received"
            content={dayjs(moveDate).format("YYYY년 M월 D일")}
            delay={step === 3 ? 500 : 0}
          />
          <Typography
            onClick={onBackStep2}
            variant={isSmall ? "M_12" : "R_16"}
            sx={{
              cursor: "pointer",
              color: theme.palette.Grayscale[500],
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            수정하기
          </Typography>
        </Box>
      )}

      {/* 이사 지역 질문 - step 3 이상에서 표시 */}
      {step >= 3 && (
        <Chat
          variant="sent"
          content={`이사 지역을 선택해주세요.`}
          delay={step === 3 ? 1200 : 0}
        />
      )}
    </Stack>
  );
}
