// request/new/page.tsx에 렌더링되는 흐름을 정리한 파일
"use client";

import { useState, useEffect } from "react";
import { Box, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import Step1_MoveType from "./steps/Step1_MoveType";
import Step2_MoveDate from "./steps/Step2_MoveDate";
import Step3_AddressSelect from "./steps/Step3_AddressSelect";
import { useEstimateStore } from "@/src/store/requestStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchMyActiveEstimateRequest } from "@/src/api/customer/request/api";
import { ParsedAddress } from "@/src/utils/parseAddress";
import { AuthStore } from "@/src/store/authStore";
import { useSnackbarStore } from "@/src/store/snackBarStore";

export default function EstimateRequestFlow() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();
  const [isLoading, setIsLoading] = useState(true);

  // 0. zustand 상태 가져오기
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

  //  1. 로그인 유저 정보
  const isLogin = AuthStore((state) => state.isLogin);
  const user = AuthStore((state) => state.user);
  const userIdOrToken = user?.id || "";

  useEffect(() => {
    if (!userIdOrToken) return;

    // 2. 새 유저 로그인 시 기존 localStorage 초기화
    const prevUser = localStorage.getItem("prevUserId");
    if (prevUser !== userIdOrToken && userIdOrToken) {
      localStorage.setItem("prevUserId", userIdOrToken);
      useEstimateStore.persist.clearStorage();
      useEstimateStore.setState({
        moveType: "",
        moveDate: "",
        fromAddress: null,
        toAddress: null,
        step: null,
      });
    }
  }, [userIdOrToken]);

  const isReady = typeof window !== "undefined" && isLogin;

  // 3. 진행중인 견적 요청 있는지 조회
  const { data: activeEstimateRequests, isLoading: isLoadingActive } = useQuery(
    {
      queryKey: ["activeEstimateRequests", userIdOrToken],
      queryFn: fetchMyActiveEstimateRequest,
      staleTime: 0,
      enabled: isReady,
    }
  );

  // 수정된 조건: 활성화된 견적 요청이 존재하면 바로 moverlist 페이지로
  const hasActiveEstimateRequest =
    Array.isArray(activeEstimateRequests) && activeEstimateRequests.length > 0;

  // 초기 진입 시 localStorage에서 상태 복구
  useEffect(() => {
    if (isLoadingActive) return;

    if (hasActiveEstimateRequest) {
      openSnackbar(
        "진행 중인 이사 견적이 있어 새 견적은 받을 수 없습니다.",
        "error"
      );
      router.replace("/customer/moverlist");
      return;
    }

    const safeJSONParse = <T,>(value: string | null): T | null => {
      try {
        return value ? JSON.parse(value) : null;
      } catch (e) {
        console.warn("❗ JSON parse error:", value, e);
        return null;
      }
    };

    // 최초 진입 시 localStorage에서 복구 및 step 설정
    const localMoveType = localStorage.getItem("moveType") || "";
    const localMoveDate = localStorage.getItem("moveDate") || "";
    const localFromAddress = safeJSONParse<ParsedAddress>(
      localStorage.getItem("fromAddress")
    );
    const localToAddress = safeJSONParse<ParsedAddress>(
      localStorage.getItem("toAddress")
    );

    // store가 비어 있으면 localStorage 값으로 복구
    if (!moveType) setMoveType(localMoveType);
    if (!moveDate) setMoveDate(localMoveDate);
    if (!fromAddress && localFromAddress) setFromAddress(localFromAddress);
    if (!toAddress && localToAddress) setToAddress(localToAddress);

    // 실제로 모두 유효한 값일 때만 step을 -1로 세팅
    const isNonEmptyString = (value: string | null): boolean =>
      typeof value === "string" && value.trim().length > 0;

    const hasInProgress =
      isNonEmptyString(localMoveType) &&
      isNonEmptyString(localMoveDate) &&
      localFromAddress !== null &&
      localToAddress !== null;

    const nextStep = hasInProgress ? 4 : 1;
    setStep(nextStep);
    setIsLoading(false);
  }, [isLoadingActive, hasActiveEstimateRequest]);

  // 4. 주소가 모두 입력되면 자동으로 step 4로 전환 (검토 단계)
  useEffect(() => {
    const showConfirm = !!fromAddress && !!toAddress;

    // 진행 중 제안이 있으면 step 전환 금지
    if (hasActiveEstimateRequest) return;

    if (showConfirm && step !== 4) {
      setStep(4);
    }
  }, [fromAddress, toAddress, hasActiveEstimateRequest]);

  // 5. 통합 로딩 처리
  if (isLoading || isLoadingActive) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  //  6. 단계별 핸들러 정의
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

  const handleSelectFromAddress = (from: ParsedAddress) => {
    setFromAddress(from);
    localStorage.setItem("fromAddress", JSON.stringify(from));
  };

  const handleSelectToAddress = (to: ParsedAddress) => {
    setToAddress(to);
    localStorage.setItem("toAddress", JSON.stringify(to));
  };

  // 7. 실제 화면 렌더링
  return (
    <>
      <Box sx={{ paddingTop: isSmall ? "24px" : "40px" }}>
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
          />
        )}
      </Box>
    </>
  );
}
