"use client";

import { Stack, Box, useTheme, useMediaQuery } from "@mui/material";
import { Chat } from "@/src/components/shared/components/text-field/Chat";
import { CheckBoxList } from "@/src/components/shared/components/check-box/CheckBoxList";
import { useEstimateStore } from "@/src/store/requestStore";
import { convertToEnum, convertToLabel } from "@/src/utils/convertToLabel";
import { useTranslation } from "react-i18next";

interface Step1Props {
  onSelect: (value: string) => void;
}

export default function Step1_MoveType({ onSelect }: Step1Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

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
        selected={convertToLabel(moveType, t)}
        onChange={(label) => {
          const enumValue = convertToEnum(label); // ❗️라벨 → ENUM
          setMoveType(enumValue);
        }}
        onConfirm={handleConfirm}
      />
    </Box>
  );
}
