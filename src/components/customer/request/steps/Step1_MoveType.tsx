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
  console.log("✅ Step1 - 현재 moveType:", moveType);
  return (
    <Stack spacing={isSmall ? "8px" : "24px"}>
      {/* 시스템 안내 메시지 */}
      <Chat
        variant="sent"
        content={`몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 :)`}
      />
      <Chat variant="sent" content={`이사 종류를 선택해 주세요.`} />
      {/* 선택 UI */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <CheckBoxList
          selected={moveType}
          onChange={setMoveType} // 선택 시 상태 업데이트
          onConfirm={handleConfirm} // 확인 시 상위로 전달
        />
      </Box>
    </Stack>
  );
}
