"use client";

import { useState } from "react";
import { Stack, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Calendar } from "@/src/components/shared/components/date-picker/Calendar";
import { Chat } from "@/src/components/shared/components/text-field/Chat";
import dayjs, { Dayjs } from "dayjs";
import { useEstimateStore } from "@/src/store/requestStore";
import { convertToLabel } from "@/src/utils/convertToLabel";

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

  return (
    <Calendar
      value={selectedDate}
      onChange={setSelectedDate}
      onAccept={handleAccept}
    />
  );
}
