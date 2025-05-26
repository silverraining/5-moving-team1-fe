"use client";

import { Box, Stack } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Header } from "./header/Header";
import { DarkModeToggle } from "./ColorModeToggle";
import { usePathname } from "next/navigation";
import { useSnackbar } from "@/src/hooks/snackBarHooks";

type CustomLayoutProps = {
  children: ReactNode;
};

export const CustomLayout = ({ children }: CustomLayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isMainPage = pathname === "/";
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
        bgcolor: isMainPage ? theme.palette.NeutralGray[50] : "transparent",
        alignContent: "center",
      })}
    >
      <Header />
      <Box px={["26px", "72px", "260px"]}>
        {children}
        {SnackbarComponent}
      </Box>
      <DarkModeToggle />
    </Stack>
  );
};
