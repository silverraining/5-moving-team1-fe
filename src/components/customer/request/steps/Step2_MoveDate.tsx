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
      const formatted = value.format("YYYY-MM-DD");
      setMoveDate(formatted); // 전역 상태 업데이트
      onSelect(formatted); // 스텝 이동과 함께 날짜 전달
    }
  };

  console.log("✅ Step2 - 전역 moveType 값:", moveType);
  return (
    <Stack
      sx={{
        width: "100%",
        gap: isSmall ? "16px" : "24px",
      }}
      spacing={isSmall ? "8px" : "24px"}
    >
      <Chat variant="sent" content={`이사 종류를 선택해 주세요.`} />
      <Chat variant="sent" content={`이사 예정일을 선택해주세요.`} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
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
              variant={"R_16"}
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

        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          onAccept={handleAccept}
        />
      </Box>
    </Stack>
  );
}
