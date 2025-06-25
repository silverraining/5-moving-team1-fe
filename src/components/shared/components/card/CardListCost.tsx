import { Box, Typography } from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import { EstimateOffer } from "@/src/types/estimate";
import Image from "next/image";
import { COLORS } from "@/public/theme/colors";
import { ChipData } from "@/src/types/card";
import {
  EstimateOfferStatus,
  MinimalAddress,
  ServiceType,
} from "@/src/types/common";
import { MoverProfile } from "@/src/types/auth";

// HistoryEstimate.tsx에서 쓰는 card 데이터 타입
export interface HistoryEstimateCardData {
  estimateRequestId: string;
  fromAddressMinimal: MinimalAddress;
  isConfirmed: boolean;
  isTargeted: boolean;
  moveDate: Date;
  moveType: ServiceType;
  offerId: string;
  price: number;
  offerStatus: EstimateOfferStatus;
  toAddressMinimal: MinimalAddress;
  mover: MoverProfile;
}

interface CardProps {
  data: EstimateOffer | HistoryEstimateCardData;
  onLikeClick?: () => void;
}

export const CardListCost = ({ data, onLikeClick }: CardProps) => {
  const status =
    "offerStatus" in data
      ? data.offerStatus
      : "status" in data
        ? data.status
        : undefined;
  // 카드 데이터
  const info = data.mover;
  // Chip 데이터
  const chips: ChipData[] = [
    {
      chipType: data.moveType,
      status,
      isTargeted: data.isTargeted,
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid"
      borderColor={COLORS.Line[100]}
      maxWidth={"1320px"}
      minWidth={"327px"}
      width={"100%"}
      height={[222, 222, 280]}
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
        borderColor={COLORS.Line[100]}
        bgcolor="#FFFFFF"
        padding={["10px", "10px", "16px 18px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
        borderRadius={"6px"}
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
              {info.nickname} 기사님
            </Typography>
            <Box display="flex" alignItems="center">
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
            flexGrow={1}
            gap={"9.5px"}
            alignItems="center"
            justifyContent={["space-between", "flex-start"]}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                경력
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {info.experience}년
              </Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            <Box display="flex">
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {info.confirmedCount}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                })}
              >
                확정
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        gap={["8px", "16px"]}
      >
        <Typography
          sx={(theme) => ({
            fontSize: [14, 14, 18],
            lineHeight: ["24px", "24px", "26px"],
            fontWeight: 500,
            color: theme.palette.Black[400],
          })}
        >
          견적 금액
        </Typography>
        <Typography
          sx={(theme) => ({
            fontSize: [18, 18, 24],
            lineHeight: ["26px", "26px", "32px"],
            fontWeight: 700,
            color: theme.palette.PrimaryBlue[400],
          })}
        >
          {(data.price ?? 0).toLocaleString()}원
        </Typography>
      </Box>
    </Box>
  );
};
