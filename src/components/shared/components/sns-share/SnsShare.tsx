import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useSnackbar } from "@/src/hooks/snackBarHooks";
import { Clip, Kakao, FaceBook } from "../icon-btn/IconBtn";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const handleShare = async (platform: string) => {
    switch (platform) {
      case "링크복사":
        try {
          await navigator.clipboard.writeText(url);
          openSnackbar(t("링크가 클립보드에 복사되었습니다."), "success");
        } catch (err) {
          console.error(t("클립보드 복사 실패:"), err);
        }
        break;

      case "카카오톡":
        // TODO: 카카오톡 공유 기능 구현
        console.log("카카오톡 공유 기능 구현 예정");
        break;

      case "페이스북":
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        window.open(facebookShareUrl, "_blank", "width=600,height=400");
        break;

      default:
        console.log(`${t(platform)}으로 공유하기`);
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
        <Clip onClick={() => handleShare(t("링크복사"))} />
        <Kakao onClick={() => handleShare(t("카카오톡"))} />
        <FaceBook onClick={() => handleShare(t("페이스북"))} />
      </Box>
    </Box>
  );
};
