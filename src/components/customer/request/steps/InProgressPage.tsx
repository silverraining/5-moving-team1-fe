"use client";

import Image from "next/image";
import {
  Box,
  Stack,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Progress } from "@/src/components/shared/components/progress/progress";

export default function InProgressPage() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const router = useRouter();

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          minHeight: "100vh", // 화면 높이 기준 세로 중앙 정렬
          alignItems: "center", // 가로 정렬
          justifyContent: "center", // 세로 정렬
          gap: "32px",
          textAlign: "center",
        }}
      >
        <Image
          src={"/Images/in-progress/inProgressCar.svg"}
          alt="견적 진행 중"
          width={isSmall ? 228 : 378}
          height={isSmall ? 96 : 140}
        />
        <Typography
          variant={isSmall ? "R_14" : "R_20"}
          color={theme.palette.Grayscale[400]}
        >
          현재 진행 중인 이사 견적이 있어요!
          <br />
          진행 중인 이사 완료 후 새로운 견적을 받아보세요.
        </Typography>
        <Button
          onClick={() => router.push("/customer/estimate/pending")}
          sx={{
            height: isSmall ? "54px" : "64px",
            backgroundColor: theme.palette.PrimaryBlue[300],
            cursor: "pointer",
            padding: 0,
          }}
        >
          <Typography
            variant={isSmall ? "SB_16" : "SB_20"}
            sx={{
              color: theme.palette.White[100],
              px: "24px",
              py: "16px",
            }}
          >
            받은 견적 보러가기
          </Typography>
        </Button>
      </Stack>
    </>
  );
}
