"use client";
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { CardList } from "../../components/shared/components/card/CardList";
import { PATH } from "../../lib/constants";
import { AuthStore } from "../../store/authStore";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const Main = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  const { isLogin } = AuthStore();
  const { t } = useTranslation("common");

  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isNavigating) {
      e.preventDefault(); // 중복 클릭 방지
      return;
    }
    setIsNavigating(true);
  };
  return (
    <Stack
      width={"100%"}
      alignItems={"center"}
      justifyItems={"center"}
      py={10}
      gap={6}
    >
      <Stack alignItems={"center"}>
        <Typography
          variant={isSmall ? "B_20" : "B_36"}
          sx={{
            fontSize: {
              xs: "1.5rem", // 모바일
              sm: "2rem", // 태블릿
              md: "2.25rem", // 데스크탑
            },
            textAlign: "center",
          }}
        >
          {t("원하는 이사 서비스를 요청하고")}
        </Typography>
        <Typography variant="B_36">{t("견적을 받아보세요")} </Typography>
      </Stack>
      <Stack
        width={"100%"}
        height={"100%"}
        spacing={3}
        alignItems={"center"}
        direction={isSmall ? "column" : "row"}
        justifyContent={"center"}
      >
        <CardList variant="small" />
        <Stack
          height={"100%"}
          alignItems={"center"}
          flex={isSmall ? "unset" : "1"}
          spacing={3}
          width="100%"
          maxWidth={isSmall ? "100%" : "764px"}
        >
          <CardList variant="home" />
          <CardList variant="office" />
        </Stack>
      </Stack>
      {!isLogin && (
        <Stack
          width={"100%"}
          direction={isSmall ? "column" : "row"}
          gap={["8px", "8px", "16px"]}
          justifyContent={"center"}
        >
          <Button
            component={Link}
            href={PATH.userLogin}
            fullWidth
            variant="contained"
            disabled={isNavigating}
            onClick={handleClick}
            sx={{
              maxWidth: "340px",
              minWidth: "327px",
              height: ["54px", "54px", "64px"],
              borderRadius: 50,
            }}
          >
            {t("로그인")}
          </Button>

          <Button
            component={Link}
            href={PATH.userSignup}
            fullWidth
            variant="outlined"
            disabled={isNavigating}
            onClick={handleClick}
            sx={{
              maxWidth: "340px",
              minWidth: "327px",
              height: ["54px", "54px", "64px"],
              borderRadius: 50,
              bgcolor: "white",
            }}
          >
            {t("회원가입")}
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
