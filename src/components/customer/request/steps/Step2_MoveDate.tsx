"use client";

import { useState } from "react";
import { Stack, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Calendar } from "@/src/components/shared/components/date-picker/Calendar";
import { Chat } from "@/src/components/shared/components/text-field/Chat";
import dayjs, { Dayjs } from "dayjs";
import { useEstimateStore } from "@/src/store/requestStore";

interface Step2Props {
  onSelect: (date: string) => void;
  onBack: () => void;
}

export default function Step2_MoveDate({ onSelect, onBack }: Step2Props) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const { moveType, moveDate, setMoveDate } = useEstimateStore();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    moveDate ? dayjs(moveDate) : null
  );

  const handleAccept = (value: Dayjs | null) => {
    if (value) {
      const formatted = value.format("YYYY년 M월 DD일");
      setMoveDate(formatted); // 전역 상태 업데이트
      onSelect(formatted); // 스텝 이동과 함께 날짜 전달
    }
  };

  console.log("✅ Step2 - 전역 moveType 값:", moveType);
  return (
    <Stack spacing={isSmall ? "8px" : "24px"}>
      <Chat
        variant="sent"
        content={`몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 :)`}
      />
      <Chat variant="sent" content={`이사 종류를 선택해주세요.`} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Stack
          spacing={isSmall ? "8px" : "24px"}
          width="100%"
          sx={{ alignItems: "flex-end" }}
        >
          {moveType && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: isSmall ? "4px" : "6px",
              }}
            >
              <Chat variant="received" content={moveType} />
              <Typography
                onClick={onBack}
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

          <Chat variant="sent" content={`이사 예정일을 선택해주세요.`} />

          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            onAccept={handleAccept}
          />
        </Stack>
      </Box>
    </Stack>
  );
}
