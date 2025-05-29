// request/new/page.tsx에 렌더링되는 흐름을 정리한 파일
"use client";

import { useState, useEffect } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Progress } from "../../shared/components/progress/progress";
import Step1_MoveType from "./steps/Step1_MoveType";
import Step2_MoveDate from "./steps/Step2_MoveDate";
import Step3_AddressSelect from "./steps/Step3_AddressSelect";
import { useEstimateStore } from "@/src/store/requestStore";
import InProgressPage from "./steps/InProgressPage";

export default function RequestNewPageClient() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const [isLoading, setIsLoading] = useState(true);

  const {
    moveType,
    moveDate,
    fromAddress,
    toAddress,
    step,
    setMoveType,
    setMoveDate,
    setFromAddress,
    setToAddress,
    setStep,
  } = useEstimateStore();

  const handleSelectStep1 = (value: string) => {
    setMoveType(value);
    localStorage.setItem("moveType", value);
    setStep(2);
  };

  const handleSelectStep2 = (formattedDate: string) => {
    setMoveDate(formattedDate);
    localStorage.setItem("moveDate", formattedDate);
    setStep(3);
  };

  useEffect(() => {
    const showConfirm = !!fromAddress && !!toAddress;

    if (showConfirm && step !== 4) {
      setStep(4);
    }
  }, [fromAddress, toAddress]);

  const handleSelectStep3 = (from: string, to: string) => {
    setFromAddress(from);
    setToAddress(to);
    setStep(-1); // 모두 완료 시, InProgressPage로 이동
  };

  const handleSelectFromAddress = (from: string) => {
    setFromAddress(from);
    localStorage.setItem("fromAddress", from); // [TEST용: 로컬에 저장 / 추후 백엔드에 저장된걸로 수정]
  };

  const handleSelectToAddress = (to: string) => {
    setToAddress(to);
    localStorage.setItem("toAddress", to); // [TEST용: 로컬에 저장 / 추후 백엔드에 저장된걸로 수정]
  };

  // [TEST용: 나중에 여기를 API 호출 후, 데이터확인하고 페이지 이동시키기]
  // 새로고침 시에도 localStorage에서 상태 복구
  useEffect(() => {
    // 최초 진입 시 localStorage에서 복구 및 step 설정
    const localMoveType = localStorage.getItem("moveType") || "";
    const localMoveDate = localStorage.getItem("moveDate") || "";
    const localFromAddress = localStorage.getItem("fromAddress") || "";
    const localToAddress = localStorage.getItem("toAddress") || "";

    // store가 비어 있으면 localStorage 값으로 복구
    if (!moveType) setMoveType(localMoveType);
    if (!moveDate) setMoveDate(localMoveDate);
    if (!fromAddress) setFromAddress(localFromAddress);
    if (!toAddress) setToAddress(localToAddress);

    const hasInProgress =
      localMoveType && localMoveDate && localFromAddress && localToAddress;

    if (hasInProgress) {
      setStep(-1);
    } else {
      setStep(1);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <div className="p-10">로딩 중...</div>;

  if (step === -1) return <InProgressPage />;

  return (
    <>
      {step !== null &&
        step > 0 &&
        step <= 4 && ( // step이 null일 경우, Progress 렌더링 X
          <Box sx={{ py: isSmall ? "24px" : "32px" }}>
            <Progress value={step as 1 | 2 | 3 | 4} />
          </Box>
        )}

      <Box
        sx={{
          padding: "8px",
        }}
      >
        {step === 1 && <Step1_MoveType onSelect={handleSelectStep1} />}
        {step === 2 && (
          <Step2_MoveDate
            onSelect={handleSelectStep2}
            onBack={() => setStep(1)}
          />
        )}
        {(step === 3 || step === 4) && (
          <Step3_AddressSelect
            onSelectFrom={handleSelectFromAddress}
            onSelectTo={handleSelectToAddress}
            onBackStep1={() => setStep(1)}
            onBackStep2={() => setStep(2)}
            onSelect={handleSelectStep3}
          />
        )}
      </Box>
    </>
  );
}
