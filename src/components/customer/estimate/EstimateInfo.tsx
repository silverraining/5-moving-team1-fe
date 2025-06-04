import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { EstimateRequest } from "@/src/types/card";

interface EstimateInfoProps {
  info: EstimateRequest;
}

export function EstimateInfo({ info }: EstimateInfoProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));

  return (
    <Box
      width={"100%"}
      padding={"32px 40px"}
      borderRadius={"16px"}
      border={"1px solid"}
      sx={(theme) => ({
        backgroundColor: theme.palette.NeutralGray[100],
        color: theme.palette.Black[300],
        borderColor: theme.palette.Line[100],
      })}
    >
      <Box display={"flex"} flexDirection="column" gap={"16px"}>
        <Stack flexDirection={"row"} gap={["40px", "40px", "32px"]}>
          <Typography
            variant={isDesktop ? "R_20" : "R_14"}
            sx={(theme) => ({
              color: theme.palette.Grayscale[300],
              whiteSpace: "nowrap",
            })}
          >
            견적 요청일
          </Typography>
          <Typography
            variant={isDesktop ? "R_20" : "R_14"}
            sx={(theme) => ({
              color: theme.palette.Black[400],
            })}
          >
            {info.date}
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={["68px", "68px", "72px"]}>
          <Typography
            variant={isDesktop ? "R_20" : "R_14"}
            sx={(theme) => ({
              color: theme.palette.Grayscale[300],
              whiteSpace: "nowrap",
            })}
          >
            서비스
          </Typography>
          <Typography
            variant={isDesktop ? "R_20" : "R_14"}
            sx={(theme) => ({
              color: theme.palette.Black[400],
            })}
          >
            {info.types.join(", ")}
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={["68px", "68px", "72px"]}>
          <Typography
            variant={isDesktop ? "R_20" : "R_14"}
            sx={(theme) => ({
              color: theme.palette.Grayscale[300],
              whiteSpace: "nowrap",
            })}
          >
            이용일
          </Typography>
          <Typography
            variant={isDesktop ? "R_20" : "R_14"}
            sx={(theme) => ({
              color: theme.palette.Black[400],
            })}
          >
            {info.movingDay}
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={["68px", "68px", "72px"]}>
          <Typography
            variant={isDesktop ? "R_20" : "R_14"}
            sx={(theme) => ({
              color: theme.palette.Grayscale[300],
              whiteSpace: "nowrap",
            })}
          >
            출발지
          </Typography>
          <Typography
            variant={isDesktop ? "R_20" : "R_14"}
            sx={(theme) => ({
              color: theme.palette.Black[400],
            })}
          >
            {info.from}
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} gap={["68px", "68px", "72px"]}>
          <Typography
            variant={isDesktop ? "R_20" : "R_14"}
            sx={(theme) => ({
              color: theme.palette.Grayscale[300],
              whiteSpace: "nowrap",
            })}
          >
            도착지
          </Typography>
          <Typography
            variant={isDesktop ? "R_20" : "R_14"}
            sx={(theme) => ({
              color: theme.palette.Black[400],
            })}
          >
            {info.to}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
