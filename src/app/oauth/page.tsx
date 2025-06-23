"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "@/src/hooks/snackBarHooks";
import { AuthStore } from "@/src/store/authStore";
import { Box, CircularProgress, Typography } from "@mui/material";
import { getCustomerProfile } from "@/src/api/customer/api";
import { fetchMoverProfileCard } from "@/src/api/mover/api";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openSnackbar } = useSnackbar();
  const login = AuthStore((state) => state.login);

  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");
    const userInfoParam = searchParams.get("userInfo");

    if (token && userInfoParam) {
      try {
        // 백엔드에서 전달받은 사용자 정보 파싱
        const userInfo = JSON.parse(decodeURIComponent(userInfoParam));

        // 백엔드에서 받은 역할 사용
        const role = userInfo.role as "CUSTOMER" | "MOVER";

        // 로그인 상태 저장
        login(token, refreshToken || "", userInfo);

        openSnackbar("소셜 로그인에 성공했습니다!", "success");

        // 프로필 존재 여부 확인 (API 호출 TODO: 불필요시 제거)
        const checkProfileAndRedirect = async () => {
          try {
            if (role === "MOVER") {
              // 기사님 프로필 조회
              await fetchMoverProfileCard();
              router.replace("/mover");
            } else {
              // 고객 프로필 조회
              await getCustomerProfile();
              router.replace("/");
            }
          } catch (error) {
            // 프로필 없을시 프로필 등록 페이지로 이동
            if (role === "MOVER") {
              router.replace("/mover/profile/register");
            } else {
              router.replace("/customer/profile/register");
            }
          }
        };

        checkProfileAndRedirect();
      } catch (error) {
        console.error("OAuth 콜백 처리 중 에러:", error);
        openSnackbar("로그인 처리 중 오류가 발생했습니다.", "error");
        router.replace("/auth/user/login");
      }
    } else {
      openSnackbar("로그인 토큰을 받지 못했습니다.", "error");
      router.replace("/auth/user/login");
    }
  }, [searchParams, login, openSnackbar, router]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
    >
      <CircularProgress size={40} />
    </Box>
  );
}
