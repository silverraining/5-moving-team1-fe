"use client";

import { Stack, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/src/hooks/snackBarHooks";
import { EditableBox } from "@/src/components/shared/components/input/InputAddress";
import { useState } from "react";
import { useEstimateStore } from "@/src/store/requestStore";
import { Chat } from "@/src/components/shared/components/text-field/Chat";
import AddressModal from "@/src/components/shared/components/address-card/AddressModal";
import dayjs from "dayjs";
import { convertToLabel } from "@/src/utils/convertToLabel";
import { postEstimateRequest } from "@/src/api/customer/request/api";
import { parseAddress } from "@/src/utils/parseAddress";
import { AddressPayload } from "@/src/api/customer/request/api";

type ParsedAddress = {
  sido: string; // 시도
  sidoEnglish: string; // 시도 영어 (filter에 사용)
  sigungu: string; // 시군구
  roadAddress: string; // 도로명 주소
  fullAddress: string; // 전체 주소
};

type Step3Props = {
  onSelectFrom: (from: ParsedAddress) => void;
  onSelectTo: (to: ParsedAddress) => void;
  onBackStep1: () => void;
  onBackStep2: () => void;
  onSelect: (from: ParsedAddress, to: ParsedAddress) => void;
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

  const handleConfirm = async () => {
    if (fromAddress && toAddress && moveType && moveDate) {
      try {
        // POST 요청 보내기
        await postEstimateRequest({
          fromAddress: fromAddress as AddressPayload,
          toAddress: toAddress as AddressPayload,
          moveType,
          moveDate,
        });

        openSnackbar("견적 확정 완료", "success", 5000);
        router.push("/customer/request");
      } catch (error) {
        openSnackbar("견적 확정에 실패했습니다. 다시 시도해주세요.", "error");
        console.error(error);
      }
    } else {
      openSnackbar("모든 정보를 입력해주세요.", "warning");
    }
  };

  console.log("출발지 확인", fromAddress);
  console.log("도착지 확인", toAddress);
  return (
    <>
      <Stack spacing={isSmall ? "8px" : "24px"}>
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
                <Chat variant="received" content={convertToLabel(moveType)} />
                <Typography
                  onClick={onBackStep1}
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
            {moveDate && (
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
                />
                <Typography
                  onClick={onBackStep2}
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
            <Chat variant="sent" content={`이사 지역을 선택해주세요.`} />
            <EditableBox
              fromLabel={fromAddress?.fullAddress || ""}
              toLabel={toAddress?.fullAddress || ""}
              onFromClick={() => setOpenFromModal(true)}
              onToClick={() => setOpenToModal(true)}
              onConfirmClick={handleConfirm}
            />
          </Stack>
        </Box>
        {/* 출발지 모달 */}
        <AddressModal
          open={openFromModal}
          onClose={() => setOpenFromModal(false)}
          title="출발지를 선택해주세요"
          onSelect={(address) => {
            const parsed = parseAddress(address);
            onSelectFrom(parsed);
            setOpenFromModal(false);
          }}
        />

        {/* 도착지 모달 */}
        <AddressModal
          open={openToModal}
          onClose={() => setOpenToModal(false)}
          title="도착지를 선택해주세요"
          onSelect={(address) => {
            const parsed = parseAddress(address);
            onSelectTo(parsed);
            setOpenToModal(false);
          }}
        />
      </Stack>
      {SnackbarComponent}
    </>
  );
}
