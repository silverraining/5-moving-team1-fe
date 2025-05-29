"use client";

import { Stack, Box, useTheme, useMediaQuery } from "@mui/material";
import { Chat } from "@/src/components/shared/components/text-field/Chat";
import { CheckBoxList } from "@/src/components/shared/components/check-box/CheckBoxList";
import { useEstimateStore } from "@/src/store/requestStore";

interface Step1Props {
  onSelect: (value: string) => void;
}

export default function Step1_MoveType({ onSelect }: Step1Props) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const { moveType, setMoveType } = useEstimateStore();

  const handleConfirm = () => {
    if (moveType) {
      onSelect(moveType);
    }
  };

  return (
    <Stack spacing={isSmall ? "8px" : "24px"}>
      <Chat
        variant="sent"
        content={`몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 :)`}
      />
      <Chat variant="sent" content={`이사 종류를 선택해 주세요.`} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <CheckBoxList
          selected={moveType}
          onChange={setMoveType}
          onConfirm={handleConfirm}
        />
      </Box>
    </Stack>
  );
}
