"use client";

import { Box, Stack } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Header } from "./header/Header";
import { DarkModeToggle } from "./ColorModeToggle";
import { usePathname } from "next/navigation";
import { useSnackbar } from "@/src/hooks/snackBarHooks";
import { PATH } from "@/src/lib/constants";
import { SubHeader } from "./header/SubHeader";

type CustomLayoutProps = {
  children: ReactNode;
};

export const CustomLayout = ({ children }: CustomLayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
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

  const { SnackbarComponent } = useSnackbar();

  useEffect(() => {
    setMounted(true);
  }, []);

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
