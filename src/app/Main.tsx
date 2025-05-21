"use client";
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { CardList } from "../components/shared/components/Card/CardList";
import { PATH } from "../hooks/constants";
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
        spacing={3}
        justifyContent="center"
        direction={isSmall ? "column" : "row"}
      >
        <Stack direction="column" spacing={3}>
          <CardList variant="home" />
          <CardList variant="office" />
        </Stack>
        <CardList variant="small" />
      </Stack>
      <Stack
        width={"100%"}
        direction={isSmall ? "column" : "row"}
        gap={["8px", "8px", "16px"]}
        justifyContent={"center"}
      >
        <Link href={PATH.login}>
          <Button
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
        </Link>
        <Link href={PATH.signup}>
          <Button
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
        </Link>
      </Stack>
    </Stack>
  );
};
