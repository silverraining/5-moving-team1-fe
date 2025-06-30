import { Box, BoxProps, Skeleton, Typography } from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import Image from "next/image";
import { useResponsiveValue } from "@/src/hooks/useResponsiveValue";
import { EstimateOffer } from "@/src/types/estimate";
import { ChipData, CardData } from "@/src/types/card";
import { useTranslation } from "react-i18next";

interface CardProps extends BoxProps {
  data: EstimateOffer | CardData;
  onLikeClick?: () => void;
  forceMobileSize?: boolean;
  fontSize?: string;
}

export const CardListSave = ({
  data,
  onLikeClick,
  forceMobileSize = false,
  fontSize = "18px",
  ...props
}: CardProps) => {
  const responsive = useResponsiveValue(forceMobileSize);

  // EstimateOffer인지 CardData인지 확인
  const isEstimateOffer = (
    data: EstimateOffer | CardData
  ): data is EstimateOffer => {
    return "mover" in data;
  };

  // 카드 데이터
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

  // Chip 데이터
  const chips: ChipData[] = isEstimateOffer(data)
    ? [
        {
          chipType: data.moveType,
          isTargeted: data.isTargeted,
        },
      ]
    : data.chips ||
      data.types.map((type) => ({
        chipType: type,
      }));
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid #F2F2F2"
      width={responsive([327, 600, 688])}
      height="auto"
      borderRadius="16px"
      padding={responsive(["16px 14px", "16px 14px", "20px 24px"])}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
      boxSizing={"border-box"}
      sx={(theme) => ({
        bgcolor: theme.palette.White[100],
        transition:
          "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          boxShadow: theme.shadows[4],
          borderColor: theme.palette.grey[400],
        },
      })}
      {...props}
    >
      <Box>
        <Box
          display="flex"
          flexDirection="row"
          gap={responsive(["8px", "12px", "12px"])}
        >
          {chips.map((chip, idx) => (
            <ChipCategory key={idx} data={chip} fontSize={fontSize} />
          ))}
        </Box>
      </Box>
      <Typography
        sx={(theme) => ({
          fontSize: responsive([14, 14, 18]),
          lineHeight: responsive(["24px", "24px", "26px"]),
          fontWeight: 600,
          color: theme.palette.Black[300],
          paddingY: responsive(["10px", "10px", "16px"]),
        })}
      >
        {info.intro}
      </Typography>
      {/* 아래 */}
      <Box
        display="flex"
        border="1px solid #F2F2F2"
        bgcolor="#FFFFFF"
        padding={responsive(["10px", "10px", "16px 18px"])}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={responsive(["12px", "12px", "24px"])}
        borderRadius="6px"
        sx={(theme) => ({ bgcolor: theme.palette.White[100] })}
      >
        <Box
          width={responsive([46, 46, 56])}
          height={responsive([46, 46, 56])}
          position="relative"
        >
          <Image
            src={info.imageUrl || "/이미지/profile/maleProfile.svg"}
            alt={"프로필 이미지"}
            fill
            style={{
              overflow: "hidden",
              borderRadius: "50%",
              objectFit: "cover",
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
                fontSize: responsive([14, 14, 18]),
                lineHeight: responsive(["24px", "24px", "26px"]),
                fontWeight: 600,
                color: theme.palette.Black[300],
              })}
            >
              {info.nickname} 기사님
            </Typography>
            <Box display="flex" alignItems="center">
              <Image
                src={
                  info.isLiked
                    ? "/이미지/like/like.svg"
                    : "/이미지/like/unlike.svg"
                }
                alt="좋아요 버튼"
                width={24}
                height={24}
                onClick={onLikeClick}
                style={{ cursor: "pointer" }}
              />
              <Typography
                sx={(theme) => ({
                  fontSize: responsive([13, 13, 18]),
                  lineHeight: responsive(["22px", "22px", "26px"]),
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
            gap="9.5px"
            alignItems="center"
            flexGrow={1}
            justifyContent={responsive([
              "space-between",
              "flex-start",
              "flex-start",
            ])}
          >
            {/* 별점 */}
            <Box display="flex" alignItems="center" gap="4px">
              <Image
                src="/이미지/star/star_active.svg"
                alt="별점"
                width={20}
                height={20}
              />
              <Typography
                sx={(theme) => ({
                  fontSize: responsive([13, 13, 16]),
                  lineHeight: responsive(["22px", "22px", "26px"]),
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {info.rating}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: responsive([13, 13, 16]),
                  lineHeight: responsive(["22px", "22px", "26px"]),
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                })}
              >
                ({info.reviewCount})
              </Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            {/* 경력 */}
            <Box display="flex" gap="4px">
              <Typography
                sx={(theme) => ({
                  fontSize: responsive([13, 13, 16]),
                  lineHeight: responsive(["22px", "22px", "26px"]),
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                  whiteSpace: "nowrap",
                })}
              >
                {t("경력")}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: responsive([13, 13, 16]),
                  lineHeight: responsive(["22px", "22px", "26px"]),
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                  whiteSpace: "nowrap",
                })}
              >
                {info.experience} {t("년")}
              </Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            {/* 확정 */}
            <Box display="flex" gap="4px">
              <Typography
                sx={(theme) => ({
                  fontSize: responsive([13, 13, 16]),
                  lineHeight: responsive(["22px", "22px", "26px"]),
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                  whiteSpace: "nowrap",
                })}
              >
                {info.confirmedCount} {t("건")}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: responsive([13, 13, 16]),
                  lineHeight: responsive(["22px", "22px", "26px"]),
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                  whiteSpace: "nowrap",
                })}
              >
                {t("확정")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export const CardListSaveSkeleton = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid #F2F2F2"
      width={[327, 600, 688]}
      height={[150, 150, 202]}
      bgcolor="#FFFFFF"
      borderRadius="16px"
      padding={["16px 14px", "16px 14px", "20px 24px"]}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
      boxSizing="border-box"
    >
      {/* 상단 카테고리 */}
      <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
        {[...Array(2)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width={60}
            height={28}
            sx={{ borderRadius: "16px" }}
          />
        ))}
      </Box>

      {/* 하단 카드 본문 */}
      <Box
        display="flex"
        border="1px solid #F2F2F2"
        bgcolor="#FFFFFF"
        padding={["10px", "10px", "16px 18px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
        borderRadius={"6px"}
      >
        {/* 프로필 이미지 */}
        <Box width={[46, 46, 56]} height={[46, 46, 56]}>
          <Skeleton variant="circular" width="100%" height="100%" />
        </Box>

        {/* 텍스트 영역 */}
        <Box display="flex" flexDirection="column" flexGrow={1} gap={1}>
          <Box display="flex" justifyContent="space-between">
            <Skeleton width={120} height={24} />
            <Box display="flex" gap="4px">
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton width={20} height={24} />
            </Box>
          </Box>

          <Skeleton width="100%" height={20} />
        </Box>
      </Box>
    </Box>
  );
};
