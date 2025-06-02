"use client";

import { Box, Stack } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Header } from "./header/Header";
import { DarkModeToggle } from "./ColorModeToggle";
import { usePathname } from "next/navigation";
import { useSnackbar } from "@/src/hooks/snackBarHooks";
import { PATH } from "@/src/lib/constants";

type CustomLayoutProps = {
  children: ReactNode;
};

export const CustomLayout = ({ children }: CustomLayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  // 페이지 중 bgColor 가 들어가는 페이지
  const colorPage =
    PATH.main ||
    PATH.customerRequest ||
    PATH.userEstimateReceive ||
    PATH.moverEstimateComfirm ||
    PATH.moverEstimateReject;
  // 페이지중 여백을 빼야 할 페이지
  const disablePadingPage = PATH.userEstimateReceive;

  const isColorPage = pathname === colorPage;
  const isPadding = pathname === disablePadingPage;

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
      <Box px={isPadding ? 0 : ["26px", "72px", "260px"]}>
        {children}
        {SnackbarComponent}
      </Box>
      <DarkModeToggle />
    </Stack>
  );
};
