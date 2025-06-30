import React, { useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useSnackbar } from "@/src/hooks/snackBarHooks";
import { Clip, Kakao, FaceBook } from "../icon-btn/IconBtn";
import { useTranslation } from "react-i18next";

// Kakao SDK 타입 선언
declare global {
  interface Window {
    Kakao: any;
  }
}
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

  // Kakao SDK 초기화
  useEffect(() => {
    const initKakao = () => {
      if (typeof window !== "undefined" && window.Kakao) {
        const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(kakaoAppKey);
        }
      }
    };

    // SDK가 로드되었는지 확인
    if (typeof window !== "undefined" && window.Kakao) {
      initKakao();
    } else {
      // SDK가 아직 로드되지 않았다면 잠시 후 다시 시도
      const timer = setTimeout(initKakao, 1000);
      return () => clearTimeout(timer);
    }
  }, []);
  const handleShare = async (platform: string) => {
    switch (platform) {
      case "링크복사":
        try {
          await navigator.clipboard.writeText(url);
          openSnackbar(t("링크가 클립보드에 복사되었습니다."), "success");
        } catch (err) {
          console.error("클립보드 복사 실패:", err);
        }
        break;

      case "카카오톡":
        try {
          if (typeof window !== "undefined" && window.Kakao) {
            window.Kakao.Share.sendDefault({
              objectType: "feed",
              content: {
                title: title || t("SNS 공유"),
                description: t("링크를 확인해보세요!"),
                imageUrl: "https://via.placeholder.com/300x200", // 기본 이미지 URL - 실제 이미지로 교체 필요
                link: {
                  mobileWebUrl: url,
                  webUrl: url,
                },
              },
              buttons: [
                {
                  title: t("웹에서 보기"),
                  link: {
                    mobileWebUrl: url,
                    webUrl: url,
                  },
                },
              ],
              installTalk: true,
            });
          } else {
            openSnackbar(
              t("카카오톡 공유 기능을 사용할 수 없습니다."),
              "error"
            );
          }
        } catch (error) {
          console.error("카카오톡 공유 실패:", error);
          openSnackbar(t("카카오톡 공유에 실패했습니다."), "error");
        }
        break;

      case "페이스북":
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
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
        {title || t("SNS 공유")}
      </Typography>
      <Box sx={{ display: "flex", gap: "16px" }}>
        <Clip onClick={() => handleShare("링크복사")} />
        <Kakao onClick={() => handleShare("카카오톡")} />
        <FaceBook onClick={() => handleShare("페이스북")} />
      </Box>
    </Box>
  );
};
