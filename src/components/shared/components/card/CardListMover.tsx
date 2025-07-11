import { Box, Skeleton, Typography } from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import { ChipData, CardData } from "@/src/types/card";
import Image from "next/image";
import { EstimateOffer } from "@/src/types/estimate";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

interface CardProps {
  data: EstimateOffer | CardData;
  onLikeClick?: () => void;
}

export const CardListMover = ({ data, onLikeClick }: CardProps) => {
  const isEstimateOffer = (
    data: EstimateOffer | CardData
  ): data is EstimateOffer => {
    return "mover" in data;
  };

  const info = isEstimateOffer(data)
    ? data.mover
    : {
        nickname: data.name,
        intro: data.message,
        imageUrl: data.imgSrc,
        isLiked: data.isLiked,
        likeCount: data.like,
        rating: data.rating,
        reviewCount: data.count,
        experience: data.career,
        confirmedCount: data.confirm,
      };

  const chips: ChipData[] = isEstimateOffer(data)
    ? [
        {
          chipType: data.moveType,
          status: data.status,
          isTargeted: data.isTargeted,
        },
      ]
    : data.chips ||
      data.types.map((type) => ({
        chipType: type,
      }));
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid"
      maxWidth={1200}
      minWidth={[400, 580, 680]}
      height="auto"
      bgcolor="#FFFFFF"
      borderRadius="16px"
      padding={["14px 16px", "14px 16px", "20px 24px"]}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
      boxSizing={"border-box"}
      width="100%"
      sx={(theme) => ({
        borderColor: theme.palette.Line[100],
        bgcolor: theme.palette.White[100],
      })}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={["14px", "16px"]}
        marginBottom="16px"
      >
        <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
          {chips.map((chip, idx) => (
            <ChipCategory key={idx} data={chip} />
          ))}
        </Box>
        <Typography
          sx={(theme) => ({
            fontSize: [14, 14, 24],
            lineHeight: ["24px", "24px", "32px"],
            fontWeight: 600,
            color: theme.palette.Black[300],
          })}
        >
          {info.intro}
        </Typography>
      </Box>

      {/* 아래 */}
      <Box
        display="flex"
        border="1px solid"
        padding={["10px", "10px", "16px 18px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
        borderRadius={"6px"}
        sx={(theme) => ({
          bgcolor: theme.palette.White[100],
          borderColor: theme.palette.Line[100],
        })}
      >
        <Box width={[46, 46, 56]} height={[46, 46, 56]} position="relative">
          <Image
            src={info.imageUrl || "/Images/profile/maleProfile.svg"}
            alt={"프로필 Images"}
            fill
            style={{
              overflow: "hidden",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          alignItems="flex-start"
        >
          <Box display="flex" alignItems="center" width="100%">
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
            <Box display="flex" alignItems="center" ml="auto">
              <Image
                src={
                  info.isLiked
                    ? "/Images/like/like.svg"
                    : "/Images/like/unlike.svg"
                }
                alt="좋아요 버튼"
                width={24}
                height={24}
                onClick={onLikeClick}
                style={{ cursor: "pointer" }}
              />
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 18],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.PrimaryBlue[400],
                })}
              >
                {info.likeCount}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap={"16px"}
            alignItems="center"
            justifyContent={["space-between", "flex-start"]}
          >
            {/* 평점 */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap="4px"
            >
              <Image
                src="/Images/star/star_active.svg"
                alt="별점 사진"
                width={20}
                height={20}
              />
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {Number(info.rating).toFixed(1)}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                })}
              >
                ({info.reviewCount})
              </Typography>
            </Box>
            {/* Divider */}
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            {/* 경력 */}
            <Box display="flex" gap="4px">
              <Typography
                sx={{
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: theme.palette.Grayscale[300] }}>
                  {t("경력")}&nbsp;
                </span>
                <span style={{ color: theme.palette.Black[300] }}>
                  {info.experience}
                  {t("년")}
                </span>
              </Typography>
            </Box>
            {/* Divider */}
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            {/* 확정 */}
            <Box display="flex" gap="4px">
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                  whiteSpace: "nowrap",
                  span: {
                    color: theme.palette.Grayscale[300],
                  },
                })}
              >
                {info.confirmedCount}
                {t("건")} <span>{t("확정")}</span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export const CardListMoverSkeleton = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid"
      maxWidth={1200}
      minWidth={[400, 580, 680]}
      borderRadius="16px"
      padding={["14px 16px", "14px 16px", "20px 24px"]}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
      width="100%"
      boxSizing="border-box"
      sx={(theme) => ({
        borderColor: theme.palette.Line[100],
        bgcolor: theme.palette.White[100],
      })}
    >
      {/* 상단: 카테고리 + 소개글 */}
      <Box
        display="flex"
        flexDirection="column"
        gap={["14px", "16px"]}
        marginBottom="16px"
      >
        <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
          <Skeleton
            variant="rounded"
            width={60}
            height={28}
            sx={{ borderRadius: "16px" }}
          />
        </Box>

        <Skeleton variant="text" height={30} width="100%" />
      </Box>

      {/* 하단: 프로필 정보 카드 */}
      <Box
        display="flex"
        border="1px solid"
        padding={["10px", "10px", "16px 18px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
        borderRadius="6px"
        sx={(theme) => ({
          bgcolor: theme.palette.White[100],
          borderColor: theme.palette.Line[100],
        })}
      >
        {/* 프로필 Images */}
        <Box width={[46, 46, 56]} height={[46, 46, 56]} position="relative">
          <Skeleton variant="circular" width="100%" height="100%" />
        </Box>

        {/* 텍스트 박스 */}
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          alignItems="flex-start"
          gap={1}
        >
          {/* 닉네임 + 좋아요 */}
          <Box display="flex" alignItems="center" width="100%">
            <Skeleton variant="text" width={120} height={24} />
            <Box display="flex" alignItems="center" ml="auto" gap={1}>
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton variant="text" width={20} height={24} />
            </Box>
          </Box>

          {/* 평점 / 경력 / 확정 */}
          <Box
            display="flex"
            flexDirection="row"
            gap={"16px"}
            alignItems="center"
            flexWrap="wrap"
            justifyContent={{ xs: "space-between", sm: "flex-start" }}
          >
            {/* 평점 */}
            <Box display="flex" gap="4px" alignItems="center">
              <Skeleton variant="rectangular" width={20} height={20} />
              <Skeleton variant="text" width={30} height={20} />
              <Skeleton variant="text" width={40} height={20} />
            </Box>

            <Box height={14} border="1px solid #E6E6E6"></Box>

            {/* 경력 */}
            <Box display="flex" gap="4px" alignItems="center">
              <Skeleton variant="text" width={30} height={20} />
              <Skeleton variant="text" width={40} height={20} />
            </Box>

            <Box height={14} border="1px solid #E6E6E6"></Box>

            {/* 확정 */}
            <Box display="flex" gap="4px" alignItems="center">
              <Skeleton variant="text" width={40} height={20} />
              <Skeleton variant="text" width={30} height={20} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
