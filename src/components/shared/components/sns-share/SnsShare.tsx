import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { useSnackbar } from "@/src/hooks/snackBarHooks";

interface SnsShareProps {
  title?: string;
  url?: string;
}

export const SnsShare = ({
  title,
  url = typeof window !== "undefined" ? window.location.href : "",
}: SnsShareProps) => {
  const theme = useTheme();
  const { openSnackbar } = useSnackbar();

  const handleShare = async (platform: string) => {
    switch (platform) {
      case "링크복사":
        try {
          await navigator.clipboard.writeText(url);
          openSnackbar("링크가 클립보드에 복사되었습니다.", "success");
        } catch (err) {
          console.error("클립보드 복사 실패:", err);
        }
        break;

      case "카카오톡":
        // TODO: 카카오톡 공유 기능 구현
        console.log("카카오톡 공유 기능 구현 예정");
        break;

      case "페이스북":
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookShareUrl, "_blank", "width=600,height=400");
        break;

      default:
        console.log(`${platform}으로 공유하기`);
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 600,
          color: theme.palette.Black[300],
          marginBottom: "16px",
          lineHeight: "28px",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: "flex", gap: "16px" }}>
        <Box
          onClick={() => handleShare("링크복사")}
          sx={{
            width: 64,
            height: 64,
            borderRadius: "16px",
            backgroundColor: theme.palette.White[100],
            border: `1px solid ${theme.palette.Line[200]}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.Grayscale[100],
            },
          }}
        >
          <Image
            src="/Images/icon-btn/clip.svg"
            alt="링크 복사"
            width={32}
            height={32}
          />
        </Box>
        <Box
          onClick={() => handleShare("카카오톡")}
          sx={{
            width: 64,
            height: 64,
            borderRadius: "16px",
            backgroundColor: "#FEE500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#FFD600",
            },
          }}
        >
          <Image
            src="/Images/icon-btn/kakao.svg"
            alt="카카오톡 공유"
            width={28}
            height={28}
          />
        </Box>
        <Box
          onClick={() => handleShare("페이스북")}
          sx={{
            width: 64,
            height: 64,
            borderRadius: "16px",
            backgroundColor: "#1877F2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#166FE5",
            },
          }}
        >
          <Image
            src="/Images/icon-btn/facebook.svg"
            alt="페이스북 공유"
            width={28}
            height={28}
          />
        </Box>
      </Box>
    </Box>
  );
};
