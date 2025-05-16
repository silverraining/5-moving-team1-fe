"use client";
import { Box, Stack } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { DarkModeToggle } from "./colorModeToggle";
import { Header } from "./Header";

type LayOutProps = {
  children: ReactNode;
};

export const LayOut = ({ children }: LayOutProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return (
    <Stack minHeight={"100vh"} width={"100vw"}>
      <Header />
      <Box px={["26px", "72px", "260px"]}>{children}</Box>
      <DarkModeToggle />
    </Stack>
  );
};
