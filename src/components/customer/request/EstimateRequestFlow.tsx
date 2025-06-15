// request/new/page.tsx에 렌더링되는 흐름을 정리한 파일
"use client";

import { useState, useEffect } from "react";
import { Box, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import Step1_MoveType from "./steps/Step1_MoveType";
import Step2_MoveDate from "./steps/Step2_MoveDate";
import Step3_AddressSelect from "./steps/Step3_AddressSelect";
import { useEstimateStore } from "@/src/store/requestStore";
import { useQuery, useQueries } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  fetchMyActiveEstimateRequest,
  fetchPendingOffersByRequestId,
  EstimateOffer,
} from "@/src/api/customer/request/api";
import { ParsedAddress } from "@/src/utils/parseAddress";
import { AuthStore } from "@/src/store/authStore";
import apiClient from "@/src/api/axiosclient";

export default function EstimateRequestFlow() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  const router = useRouter();

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

  //  2. 로그인 유저 정보
  const accessToken = AuthStore((state) => state.accessToken);
  const user = AuthStore((state) => state.user);
  const userIdOrToken = user?.id || accessToken || ""; // 로그인 여부 판단

  useEffect(() => {
    if (!userIdOrToken) return;

    // 새 유저 로그인 시 기존 localStorage 초기화
    const prevUser = localStorage.getItem("prevUserId");
    if (prevUser !== userIdOrToken) {
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

  console.log(
    "🎈현재 Authorization 헤더",
    apiClient.defaults.headers.common["Authorization"]
  );

  // 3. 활성화된 견적 요청 ID 조회
  const { data: activeEstimateRequests, isLoading: isLoadingActive } = useQuery(
    {
      queryKey: ["activeEstimateRequests", userIdOrToken],
      queryFn: fetchMyActiveEstimateRequest,
      staleTime: 0,
      enabled: !!userIdOrToken,
    }
  );
  console.log("유저 로그인 여부 판단", userIdOrToken);

  // 4. 요청 ID로 제안 상태(PENDING, CONFIRMED 등) 조회
  const estimateOfferQueries = useQueries({
    queries:
      activeEstimateRequests?.map((request) => ({
        queryKey: ["pendingEstimateOffer", request.estimateRequestId],
        queryFn: () => fetchPendingOffersByRequestId(request.estimateRequestId),
        enabled: !!request.estimateRequestId,
      })) ?? [],
  }) as {
    data?: EstimateOffer[];
    isLoading: boolean;
  }[];

  const isPendingOffersLoading = estimateOfferQueries.some((q) => q.isLoading);

  // 5. 진행 중인 제안(PENDING, CONFIRMED)이 있는지 확인
  const hasActivePendingOrConfirmedOffer =
    !isPendingOffersLoading &&
    estimateOfferQueries.some((query) =>
      query.data?.some(
        (offer) =>
          offer.requestStatus === "PENDING" ||
          offer.requestStatus === "CONFIRMED"
      )
    );

  // 1. 초기 진입 시 localStorage에서 상태 복구
  useEffect(() => {
    if (isLoadingActive || isPendingOffersLoading) return;

    if (hasActivePendingOrConfirmedOffer) {
      router.replace("/customer/request/inprogress");
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

    const nextStep = hasActivePendingOrConfirmedOffer
      ? -1
      : hasInProgress
        ? 4
        : 1;

    setStep(nextStep);

    setIsLoading(false);
  }, [
    isLoadingActive,
    isPendingOffersLoading,
    hasActivePendingOrConfirmedOffer,
  ]);

  // 6. 주소가 모두 입력되면 자동으로 step 4로 전환 (검토 단계)
  useEffect(() => {
    const showConfirm = !!fromAddress && !!toAddress;

    // 진행 중 제안이 있으면 step 전환 금지
    if (hasActivePendingOrConfirmedOffer) return;

    if (showConfirm && step !== 4) {
      setStep(4);
    }
  }, [fromAddress, toAddress, hasActivePendingOrConfirmedOffer]);

  // 7. 통합 로딩 처리
  if (isLoading || isLoadingActive || isPendingOffersLoading) {
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

  // // 8. 견적 제안이 있거나, 저장된 상태가 step=-1일 때 InProgressPage 페이지로
  // if (hasActivePendingOrConfirmedOffer || step === -1) {
  //   return <InProgressPage />;
  // }

  //  9. 단계별 핸들러 정의
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

  // 10. 실제 화면 렌더링
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
