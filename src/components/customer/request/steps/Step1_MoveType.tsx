"use client";

import { Box, useTheme } from "@mui/material";
import { CheckBoxList } from "@/src/components/shared/components/check-box/CheckBoxList";
import { useEstimateStore } from "@/src/store/requestStore";

interface Step1Props {
  onSelect: (value: string) => void;
}

export default function Step1_MoveType({ onSelect }: Step1Props) {
  const { moveType, setMoveType } = useEstimateStore();

  const handleConfirm = () => {
    if (moveType) {
      onSelect(moveType);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <CheckBoxList
        selected={moveType}
        onChange={(value) => {
          setMoveType(value);
        }}
        onConfirm={handleConfirm}
      />
    </Box>
  );
}
