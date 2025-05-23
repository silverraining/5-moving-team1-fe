"use client";

import { LogoSection } from "@/src/components/auth/LogoSection";
import { PATH } from "@/src/hooks/constants";

import { Stack, useMediaQuery, useTheme } from "@mui/material";

const Login = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  const description = "기사님이신가요?";
  const link = { content: "기사님 전용 페이지", href: PATH.moverlogin };

  return (
    <Stack justifyContent={"center"}>
      <LogoSection description={description} isSmall={isSmall} link={link} />
    </Stack>
  );
};
export default Login;
