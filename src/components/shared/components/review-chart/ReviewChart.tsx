"use client";
import {
  Stack,
  StackProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Progress } from "./components/progress";
import { Stars } from "./components/stars";
import { COLORS } from "@/public/theme/colors";
interface ReviewChartProps {
  data: {
    average: number;
    score: { 1: number; 2: number; 3: number; 4: number; 5: number };
    max: number;
  };
}

export const ReviewChart = ({ data }: ReviewChartProps) => {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down("tablet"));
  const isSmall = useMediaQuery(theme.breakpoints.down("mobile"));

  const BoxStyle: StackProps = {
    bgcolor: isMedium ? "" : "#F7F7F7",
    borderRadius: "32px",
    px: ["21.5px", "21.5px", "60px"],
    py: ["16px", "16px", "40px"],
    justifyContent: "space-between",
  };
  const ProgressBoxStyle: StackProps = {
    display: "flex",
    bgcolor: !isMedium ? "" : "#F7F7F7",
    borderRadius: "32px",
    px: ["21.5px", "21.5px", "60px"],
    py: ["16px", "16px", "40px"],

    alignSelf: "center",
  };

  return (
    <Stack direction={isSmall ? "column" : "row"} {...BoxStyle}>
      <Stack
        width={"100%"}
        justifyContent={"center"}
        alignContent={"center"}
        pb={isSmall ? "40px" : ""}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={1}
        >
          <Typography fontSize={isMedium ? "40px" : "64px"} fontWeight={700}>
            {data.average}
          </Typography>
          <Typography
            fontSize={isMedium ? "24px" : "38px"}
            fontWeight={700}
            color={COLORS.Grayscale[100]}
          >
            / 5
          </Typography>
        </Stack>
        <Stars score={data.average} isMedium={isMedium} />
      </Stack>
      <Stack spacing={"1px"} width={"100%"} {...ProgressBoxStyle}>
        <Progress
          max={data.max}
          value={data.score[5]}
          label="5점"
          isSmall={isSmall}
        />
        <Progress
          max={data.max}
          value={data.score[4]}
          label="4점"
          isSmall={isSmall}
        />
        <Progress
          max={data.max}
          value={data.score[3]}
          label="3점"
          isSmall={isSmall}
        />
        <Progress
          max={data.max}
          value={data.score[2]}
          label="2점"
          isSmall={isSmall}
        />
        <Progress
          max={data.max}
          value={data.score[1]}
          label="1점"
          isSmall={isSmall}
        />
      </Stack>
    </Stack>
  );
};
