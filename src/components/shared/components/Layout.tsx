"use client";

import { Box, Stack } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Header } from "./header/Header";
import { DarkModeToggle } from "./ColorModeToggle";
import { usePathname } from "next/navigation";

type LayOutProps = {
  children: ReactNode;
};

export const LayOut = ({ children }: LayOutProps) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return (
    <Stack
      minHeight={"100vh"}
      width={"100vw"}
      bgcolor={isMainPage ? "#F5F5F5" : "transparent"}
    >
      <Header />
      <Box px={["26px", "72px", "260px"]}>{children}</Box>
      <DarkModeToggle />
    </Stack>
  );
};
