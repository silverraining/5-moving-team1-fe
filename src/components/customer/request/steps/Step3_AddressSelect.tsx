"use client";

import { Stack, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/src/hooks/snackBarHooks";
import { EditableBox } from "@/src/components/shared/components/input/InputAddress";
import { useState } from "react";
import { useEstimateStore } from "@/src/store/requestStore";
import { Chat } from "@/src/components/shared/components/text-field/Chat";
import AddressModal from "@/src/components/shared/components/address-card/AddressModal";

type Step3Props = {
  onSelectFrom: (from: string) => void;
  onSelectTo: (to: string) => void;
  onBackStep1: () => void;
  onBackStep2: () => void;
  onSelect: (from: string, to: string) => void;
};

export default function Step3_AddressSelect({
  onSelectFrom,
  onSelectTo,
  onBackStep1,
  onBackStep2,
  onSelect,
}: Step3Props) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  const router = useRouter();

  const { moveType, moveDate, toAddress, fromAddress } = useEstimateStore();

  const [openFromModal, setOpenFromModal] = useState(false);
  const [openToModal, setOpenToModal] = useState(false);
  const { openSnackbar, SnackbarComponent } = useSnackbar();

  const handleConfirm = () => {
    if (fromAddress && toAddress) {
      // 1. 부모에게 알림
      onSelect(fromAddress, toAddress);
      // [TEST용: 견적확정 후 스낵바 띄우고 랜딩페이지로 이동 / 견적확정 후처리를 어떻게 하면 좋을까요?]
      // 2. 스낵바 메시지 띄우기
      openSnackbar("견적 확정 완료", "success", 5000);
      // 3. 랜딩페이지로 이동
      router.push("/");
    }
  };

  console.log(
    "✅ Step3 - 전역 선택값:",
    "moveType:",
    moveType,
    "moveDate:",
    moveDate
  );

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          gap: isSmall ? "16px" : "24px",
        }}
        spacing={isSmall ? "8px" : "24px"}
      >
        <Chat
          variant="sent"
          content={`몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 :)`}
        />
        <Chat variant="sent" content={`이사 종류를 선택해 주세요.`} />
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
                onClick={onBackStep1}
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
          <Chat variant="sent" content={`이사 예정일을 선택해주세요.`} />
          {moveDate && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: isSmall ? "4px" : "6px",
              }}
            >
              <Chat variant="received" content={moveDate} />
              <Typography
                onClick={onBackStep2}
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
          <Chat variant="sent" content={`이사 지역을 선택해주세요.`} />
          <EditableBox
            fromLabel={fromAddress}
            toLabel={toAddress}
            onFromClick={() => setOpenFromModal(true)}
            onToClick={() => setOpenToModal(true)}
            onConfirmClick={handleConfirm}
          />
        </Box>
        {/* 출발지 모달 */}
        <AddressModal
          open={openFromModal}
          onClose={() => setOpenFromModal(false)}
          title="출발지를 선택해주세요"
          onSelect={(address) => {
            onSelectFrom(address.roadAddress);
            setOpenFromModal(false);
          }}
        />

        {/* 도착지 모달 */}
        <AddressModal
          open={openToModal}
          onClose={() => setOpenToModal(false)}
          title="도착지를 선택해주세요"
          onSelect={(address) => {
            onSelectTo(address.roadAddress);
            setOpenToModal(false);
          }}
        />
      </Stack>
      {SnackbarComponent}
    </>
  );
}
