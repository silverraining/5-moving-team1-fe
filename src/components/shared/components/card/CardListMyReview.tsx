import { Box, Skeleton, Typography } from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import { ChipData } from "@/src/types/card";
import Image from "next/image";
import { formatKoreanDate } from "@/src/lib/formatKoreanDate";
import { COLORS } from "@/public/theme/colors";

import { ServiceType } from "@/src/types/common";
import { useTranslation } from "react-i18next";
import { maskNickname } from "@/src/lib/maskNickname";

interface CardProps {
  data: {
    moveType: ServiceType;
    isTargeted: boolean;
    createdAt: string;
    moveDate: string;
    price: number;
    rating: number;
    comment: string;
    mover: {
      nickname: string;
      imageUrl: string;
    };
  };
  isReviewed?: boolean;
}

export const CardListMyReview = ({ data, isReviewed }: CardProps) => {
  const { t } = useTranslation();
  const info = data.mover;
  const chips: ChipData[] = [
    {
      chipType: data.moveType,
      isTargeted: data?.isTargeted,
    },
  ];
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid"
      borderColor={COLORS.Line[100]}
      width={[327, 600, 688]}
      height={[208, 208, 346]}
      bgcolor="#FFFFFF"
      borderRadius="16px"
      padding={["16px 14px 10px 14px", "16px 14px 10px 14px", "32px 24px"]}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
      boxSizing={"border-box"}
    >
      <Box
        display="flex"
        flexDirection="row"
        gap={["14px", "16px"]}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
          {chips.map((chip, idx) => (
            <ChipCategory key={idx} data={chip} />
          ))}
        </Box>
        <Box display="flex">
          <Typography
            sx={(theme) => ({
              fontSize: [12, 12, 18],
              lineHeight: ["18px", "18px", "26px"],
              fontWeight: 400,
              color: theme.palette.Grayscale[300],
              display: ["none", "none", "block"],
            })}
          >
            {t("작성일")} {formatKoreanDate(data.moveDate ?? "", false)}
          </Typography>
        </Box>
      </Box>

      {/* 아래 */}
      <Box
        display="flex"
        border={["0px", "0px", "1px solid #f2f2f2"]}
        padding={["10px", "10px", "16px 18px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
        borderRadius={"1px"}
        sx={(theme) => ({
          backgroundColor: theme.palette.White[100],
        })}
      >
        <Box width={[46, 46, 96]} height={[46, 46, 96]} position="relative">
          <Image
            src={info.imageUrl || "/Images/profile/maleProfile.svg"}
            alt={"프로필 Images"}
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
            justifyContent="flex-start"
            alignItems="center"
            gap={"6px"}
          >
            <Typography
              sx={(theme) => ({
                fontSize: [14, 14, 18],
                lineHeight: ["24px", "24px", "26px"],
                fontWeight: 600,
                color: theme.palette.Black[300],
              })}
            >
              {maskNickname(info.nickname)} {t("기사님")}
            </Typography>
            <Box display={["flex", "flex", "none"]} gap="4px">
              {Array.from({ length: data?.rating ?? 0 }).map((_, i) => (
                <Box
                  key={i}
                  position="relative"
                  width={[20, 20, 24]}
                  height={[20, 20, 24]}
                >
                  <Image
                    src="/Images/star/star_active.svg"
                    alt="별점 사진"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              ))}
            </Box>
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
                {formatKoreanDate(data.moveDate ?? "", false)}
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
          <Box display={["none", "none", "flex"]} gap="4px">
            {Array.from({ length: data?.rating ?? 0 }).map((_, i) => (
              <Box
                key={i}
                position="relative"
                width={[20, 20, 24]}
                height={[20, 20, 24]}
              >
                <Image
                  src="/Images/star/star_active.svg"
                  alt="별점 사진"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" flexDirection="column">
        <Typography
          sx={(theme) => ({
            fontSize: [14, 14, 20],
            lineHeight: ["24px", "24px", "32px"],
            fontWeight: 400,
            color: theme.palette.Grayscale[500],
          })}
        >
          {data.comment}
        </Typography>
        <Typography
          display={["flex", "flex", "none"]}
          justifyContent="flex-end"
          sx={(theme) => ({
            fontSize: [12, 12, 18],
            lineHeight: ["18px", "18px", "26px"],
            fontWeight: 400,
            color: theme.palette.Grayscale[300],
          })}
        >
          {t("작성일")} {formatKoreanDate(data.moveDate ?? "", false)}
        </Typography>
      </Box>
    </Box>
  );
};
export const CardListMyReviewSkeleton = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid"
      borderColor="#E6E6E6"
      width={[327, 600, 688]}
      height={[208, 208, 346]}
      borderRadius="16px"
      padding={["16px 14px 10px 14px", "16px 14px 10px 14px", "32px 24px"]}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
      boxSizing={"border-box"}
      sx={(theme) => ({ bgColor: theme.palette.White[100] })}
    >
      {/* Top Row (chips + 작성일) */}
      <Box
        display="flex"
        flexDirection="row"
        gap={["14px", "16px"]}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Chips skeleton */}
        <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
          <Skeleton variant="rounded" width={60} height={28} />
          <Skeleton variant="rounded" width={60} height={28} />
        </Box>
        {/* 작성일 skeleton */}
        <Skeleton
          variant="text"
          width={100}
          height={20}
          sx={{ display: ["none", "none", "block"] }}
        />
      </Box>

      {/* 프로필 & 정보 박스 */}
      <Box
        display="flex"
        border={["0px", "0px", "1px solid #f2f2f2"]}
        padding={["10px", "10px", "16px 18px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
        borderRadius={"1px"}
        sx={(theme) => ({ bgColor: theme.palette.White[100] })}
      >
        {/* 프로필 이미지 */}
        <Box width={[46, 46, 96]} height={[46, 46, 96]} position="relative">
          <Skeleton variant="circular" width="100%" height="100%" />
        </Box>
        {/* 텍스트 정보 */}
        <Box display="flex" flexDirection="column" flexGrow={1} gap={1}>
          <Skeleton variant="text" width="40%" height={28} />
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="80%" height={20} />
        </Box>
      </Box>

      {/* 후기 내용 */}
      <Box display="flex" flexDirection="column" gap={1}>
        <Skeleton variant="text" width="100%" height={50} />
      </Box>

      {/* 작성일 (모바일) */}
      <Skeleton
        variant="text"
        width={80}
        height={20}
        sx={{ display: ["flex", "flex", "none"], mt: 1 }}
      />
    </Box>
  );
};
