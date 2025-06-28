import { Box, Button, Typography } from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import { ChipData } from "@/src/types/card";
import Image from "next/image";
import { formatKoreanDate } from "@/src/lib/formatKoreanDate";
import { reviewableOffers } from "@/src/api/review/api";
import { useTranslation } from "react-i18next";

interface CardProps {
  data: reviewableOffers;
  isReviewed?: boolean;
  onReviewClick?: () => void;
}

export const CardListWriteReview = ({
  data,
  isReviewed = false,
  onReviewClick,
}: CardProps) => {
  // 카드 데이터
  const info = data.mover;
  // Chip 데이터
  const chips: ChipData[] = [
    {
      chipType: data.moveType,
      isTargeted: data?.isTargeted,
    },
  ];
  // 리뷰가 있는지 확인
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid #F2F2F2"
      width={[327, 600, 688]}
      height={[208, 208, 346]}
      bgcolor="#FFFFFF"
      borderRadius="16px"
      padding={[
        "16px 14px 10px 14px",
        "16px 14px 10px 14px",
        "20px 24px 14px 24px",
      ]}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
      boxSizing={"border-box"}
    >
      <Box display="flex" flexDirection="column" gap={["14px", "16px"]}>
        <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
          {chips.map((chip, idx) => (
            <ChipCategory key={idx} data={chip} />
          ))}
        </Box>
      </Box>

      {/* 아래 */}
      <Box
        display="flex"
        border={["0px", "0px", "1px solid #F2F2F2"]}
        bgcolor="#FFFFFF"
        padding={["10px", "10px", "16px 18px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
        borderRadius={"1px"}
      >
        <Box width={[46, 46, 56]} height={[46, 46, 56]} position="relative">
          <Image
            src={info.imageUrl || "/Images/profile/maleProfile.svg"}
            alt={"프로필 이미지"}
            fill
            style={{
              overflow: "hidden",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #242945",
            }}
          />
        </Box>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              sx={(theme) => ({
                fontSize: [14, 14, 18],
                lineHeight: ["24px", "24px", "26px"],
                fontWeight: 600,
                color: theme.palette.Black[300],
              })}
            >
              {info.nickname} {t("기사님")}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            flexGrow={1}
            gap={"9.5px"}
            alignItems="center"
            justifyContent={["space-between", "flex-start"]}
          >
            <Box display="flex">
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                })}
              >
                {t("이사일")}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {formatKoreanDate(data.moveDate, false)}
              </Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            <Box display="flex">
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                })}
              >
                {t("견적가")}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {(data.price ?? 0).toLocaleString()}원
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Button
        disabled={isReviewed}
        onClick={onReviewClick}
        variant="contained"
        sx={(theme) => ({
          bgcolor: isReviewed
            ? theme.palette.Grayscale[100]
            : theme.palette.PrimaryBlue[300],
          height: [48, 48, 64],
        })}
      >
        {!isReviewed ? t("리뷰 작성하기") : t("리뷰 작성 완료")}
      </Button>
    </Box>
  );
};
