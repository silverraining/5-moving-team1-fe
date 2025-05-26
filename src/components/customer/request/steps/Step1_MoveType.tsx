"use client";

import { useState } from "react";
import { Stack, Box, useTheme, useMediaQuery } from "@mui/material";
import { Chat } from "@/src/components/shared/components/text-field/Chat";
import { CheckBoxList } from "@/src/components/shared/components/check-box/CheckBoxList";

interface Step1Props {
  onSelect: (value: string) => void;
}

export default function Step1_MoveType({ onSelect }: Step1Props) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const [selected, setSelected] = useState<string>(""); // 선택된 값 하나 저장

  const handleConfirm = () => {
    if (selected) {
      onSelect(selected);
    }
  };

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
          selected={selected}
          onChange={setSelected} // 선택 시 상태 업데이트
          onConfirm={handleConfirm} // 확인 시 상위로 전달
        />
      </Box>
    </Stack>
  );
}
