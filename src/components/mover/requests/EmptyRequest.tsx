import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";

export default function EmptyRequest() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("desktop")); // 모바일+태블릿일 때 포함

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={isSmall ? "24px" : "32px"}
      minHeight={isSmall ? "290px" : "560px"}
    >
      <Box
        sx={{
          position: "relative",
          width: isSmall ? "110px" : "184px",
          height: isSmall ? "82px" : "136px",
        }}
      >
        <Image
          src="/Images/empty/no_data.svg"
          alt="데이터 없음"
          fill
          className="mb-6"
        />
      </Box>
      <Typography
        variant={isSmall ? "R_14" : "R_20"}
        color={theme.palette.Grayscale[400]}
      >
        아직 받은 요청이 없어요!
      </Typography>
    </Box>
  );
}
