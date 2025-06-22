"use client";

import { Box, Stack } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Header } from "./header/Header";
import { DarkModeToggle } from "./ColorModeToggle";
import { usePathname, useRouter } from "next/navigation";
import { useSnackbar } from "@/src/hooks/snackBarHooks";
import { PATH } from "@/src/lib/constants";
import { SubHeader } from "./header/SubHeader";
import { AuthStore } from "@/src/store/authStore";

type CustomLayoutProps = {
  children: ReactNode;
};

export const CustomLayout = ({ children }: CustomLayoutProps) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { SnackbarComponent } = useSnackbar();
  const { user } = AuthStore();
  // 페이지 중 bgColor 가 들어가는 페이지
  const colorPages = [
    PATH.main,
    PATH.userRequest,
    PATH.userEstimateHistory,
    PATH.userWishlist,
    PATH.moverEstimateConfirm,
    PATH.moverEstimateReject,
  ];
  const noPaddingPages = [PATH.userEstimateHistory];
  const subHeaderPages = [
    PATH.userRequest,
    PATH.userEstimate,
    PATH.userEstimateHistory,
    PATH.moverEstimateConfirm,
    PATH.moverEstimateReject,
    PATH.userWishlist,
    PATH.userReviewPending,
    PATH.userReviewCompleted,
  ];

  const isColorPage = colorPages.includes(pathname);
  const isPadding = noPaddingPages.includes(pathname);
  const isSubHeader = subHeaderPages.includes(pathname);

  useEffect(() => {
    setMounted(true);
    if (user?.role === "CUSTOMER") return;

    if (!user?.phone) {
      router.push(PATH.moverProfileRegister);
    }
  }, [user]);

  if (!mounted) {
    return <></>;
  }

  return (
    <Stack
      minHeight={"100vh"}
      width={"100%"}
      sx={(theme) => ({
        bgcolor: isColorPage ? theme.palette.NeutralGray[50] : "transparent",
        alignContent: "center",
      })}
    >
      <Header />
      {isSubHeader && <SubHeader />}
      <Box px={isPadding ? 0 : ["26px", "72px", "260px"]}>
        {children}
        {SnackbarComponent}
      </Box>
      <DarkModeToggle />
    </Stack>
  );
};
