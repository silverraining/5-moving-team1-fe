"use client";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { CardList } from "../components/shared/components/card/CardList";
import { PATH } from "../lib/constants";

export const Main = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  return (
    <Stack alignItems={"center"} justifyItems={"center"} pt={10} gap={6}>
      <Stack alignItems={"center"}>
        <Typography variant="B_36">원하는 이사 서비스를 요청하고</Typography>
        <Typography variant="B_36">견적을 받아보세요 </Typography>
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
      <Stack
        direction={isSmall ? "column" : "row"}
        gap={["8px", "8px", "16px"]}
        justifyContent={"center"}
      >
        <Button
          component={Link}
          href={PATH.userLogin}
          fullWidth
          variant="contained"
          sx={{
            maxWidth: "340px",
            minWidth: "327px",
            height: ["54px", "54px", "64px"],
            borderRadius: 50,
          }}
        >
          로그인
        </Button>

        <Button
          component={Link}
          href={PATH.userSignup}
          fullWidth
          variant="outlined"
          sx={{
            maxWidth: "340px",
            minWidth: "327px",
            height: ["54px", "54px", "64px"],
            borderRadius: 50,
            bgcolor: "white",
          }}
        >
          회원가입
        </Button>
      </Stack>
    </Stack>
  );
};
