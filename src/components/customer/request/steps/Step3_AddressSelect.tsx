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
import { parseAddress, ModalAddress } from "@/src/utils/parseAddress";
import { PATH } from "@/src/lib/constants";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";

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
};

export default function Step3_AddressSelect({
  onSelectFrom,
  onSelectTo,
  onBackStep1,
  onBackStep2,
}: Step3Props) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  const router = useRouter();
  const { t } = useTranslation();
  const { moveType, moveDate, toAddress, fromAddress } = useEstimateStore();

  const [openFromModal, setOpenFromModal] = useState(false);
  const [openToModal, setOpenToModal] = useState(false);
  const { openSnackbar, SnackbarComponent } = useSnackbar();

  const setFromAddress = useEstimateStore((state) => state.setFromAddress);
  const setToAddress = useEstimateStore((state) => state.setToAddress);

  // 견적입력정보 개별 유효성 검사
  const validateFields = (): boolean => {
    if (!moveType) {
      openSnackbar(t("이사 종류를 선택해주세요."), "error");
      return false;
    }
    if (!moveDate) {
      openSnackbar(t("이사 예정일을 선택해주세요."), "error");
      return false;
    }
    if (!fromAddress) {
      openSnackbar(t("출발지를 선택해주세요."), "error");
      return false;
    }
    if (!toAddress) {
      openSnackbar(t("도착지를 선택해주세요."), "error");
      return false;
    }
    return true;
  };

  const handleConfirmClick = async () => {
    if (!validateFields()) return; // ✅ 유효성 검사 추가

    try {
      await postEstimateRequest({
        moveType,
        moveDate,
        fromAddress: fromAddress!,
        toAddress: toAddress!,
      });

      openSnackbar(t("견적 확정 완료"), "success", 5000);
      router.replace(PATH.moverList);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          openSnackbar(
            t("견적 요청을 위해 먼저 프로필을 생성해주세요!"),
            "error"
          );
          router.replace(PATH.userProfileRegister);
        } else {
          openSnackbar(
            t("견적 확정에 실패했습니다. 다시 시도해주세요."),
            "error"
          );
        }
      }
      console.error(error);
    }
  };

  const handleSelectFrom = (address: ModalAddress) => {
    const parsed = parseAddress(address);
    onSelectFrom(parsed);
    setFromAddress(parsed);
    setOpenFromModal(false);
  };

  const handleSelectTo = (address: ModalAddress) => {
    const parsed = parseAddress(address);
    onSelectTo(parsed);
    setToAddress(parsed);
    setOpenToModal(false);
  };

  return (
    <>
      <EditableBox
        fromLabel={fromAddress?.fullAddress || ""}
        toLabel={toAddress?.fullAddress || ""}
        onFromClick={() => setOpenFromModal(true)}
        onToClick={() => setOpenToModal(true)}
        onConfirmClick={handleConfirmClick}
      />

      {/* 출발지 모달 */}
      <AddressModal
        open={openFromModal}
        onClose={() => setOpenFromModal(false)}
        title={t("출발지를 선택해주세요")}
        onSelect={handleSelectFrom}
      />

      {/* 도착지 모달 */}
      <AddressModal
        open={openToModal}
        onClose={() => setOpenToModal(false)}
        title={t("도착지를 선택해주세요")}
        onSelect={handleSelectTo}
      />

      {SnackbarComponent}
    </>
  );
}
