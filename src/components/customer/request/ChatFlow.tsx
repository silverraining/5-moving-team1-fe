"use client";

import {
  Stack,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Slide,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Chat } from "@/src/components/shared/components/text-field/Chat";
import { convertToLabel } from "@/src/utils/convertToLabel";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

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

  // 수정하기 버튼들의 애니메이션 상태
  const [isEditStep1Visible, setIsEditStep1Visible] = useState(false);
  const [isEditStep2Visible, setIsEditStep2Visible] = useState(false);
  const { t } = useTranslation();
  // step 2일 때 첫 번째 수정하기 버튼 애니메이션
  useEffect(() => {
    if (step >= 2) {
      const timer = setTimeout(
        () => {
          setIsEditStep1Visible(true);
        },
        step === 2 ? 800 : 0
      ); // Chat 메시지 후 300ms 추가 지연

      return () => clearTimeout(timer);
    } else {
      setIsEditStep1Visible(false);
    }
  }, [step]);

  // step 3일 때 두 번째 수정하기 버튼 애니메이션
  useEffect(() => {
    if (step >= 3) {
      const timer = setTimeout(
        () => {
          setIsEditStep2Visible(true);
        },
        step === 3 ? 800 : 0
      ); // Chat 메시지 후 300ms 추가 지연

      return () => clearTimeout(timer);
    } else {
      setIsEditStep2Visible(false);
    }
  }, [step]);

  return (
    <Stack spacing={isSmall ? "8px" : "24px"}>
      {/* 첫 번째 인사 메시지 - 모든 스텝에서 표시 */}
      <Chat
        variant="sent"
        content={t(
          "몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 :)"
        )}
        delay={step === 1 ? 500 : 0}
      />

      {/* 이사 종류 질문 - 모든 스텝에서 표시 */}
      <Chat
        variant="sent"
        content={t("이사 종류를 선택해 주세요.")}
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
            content={convertToLabel(moveType, t)}
            delay={step === 2 ? 500 : 0}
          />
          <Slide
            direction="left"
            in={isEditStep1Visible}
            timeout={800}
            style={{ transitionDelay: isEditStep1Visible ? "0ms" : "200ms" }}
          >
            <Typography
              onClick={onBackStep1}
              variant={isSmall ? "M_12" : "R_16"}
              sx={{
                cursor: "pointer",
                color: theme.palette.Grayscale[500],
                fontWeight: 600,
                textDecoration: "underline",
                transform: isEditStep1Visible ? "scale(1)" : "scale(0.8)",
                transition: "transform 0.3s ease-out",
              }}
            >
              {t("수정하기")}
            </Typography>
          </Slide>
        </Box>
      )}

      {/* 이사 예정일 질문 - step 2 이상에서 표시 */}
      {step >= 2 && (
        <Chat
          variant="sent"
          content={t("이사 예정일을 선택해주세요.")}
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
          <Slide
            direction="left"
            in={isEditStep2Visible}
            timeout={800}
            style={{ transitionDelay: isEditStep2Visible ? "0ms" : "200ms" }}
          >
            <Typography
              onClick={onBackStep2}
              variant={isSmall ? "M_12" : "R_16"}
              sx={{
                cursor: "pointer",
                color: theme.palette.Grayscale[500],
                fontWeight: 600,
                textDecoration: "underline",
                transform: isEditStep2Visible ? "scale(1)" : "scale(0.8)",
                transition: "transform 0.3s ease-out",
              }}
            >
              수정하기
            </Typography>
          </Slide>
        </Box>
      )}

      {/* 이사 지역 질문 - step 3 이상에서 표시 */}
      {step >= 3 && (
        <Chat
          variant="sent"
          content={t("이사 지역을 선택해주세요.")}
          delay={step === 3 ? 1200 : 0}
        />
      )}
    </Stack>
  );
}
