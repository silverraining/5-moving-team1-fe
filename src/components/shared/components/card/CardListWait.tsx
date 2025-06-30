import { Box, Button, Skeleton, Typography } from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import Image from "next/image";
import { formatKoreanDate } from "@/src/lib/formatKoreanDate";
import { EstimateOffer } from "@/src/types/estimate";
import { ChipData } from "@/src/types/card";
import {
  EstimateOfferStatus,
  MinimalAddress,
  ServiceType,
} from "@/src/types/common";
import { MoverProfile } from "@/src/types/auth";
import { useTranslation } from "react-i18next";
// PendingEstimate.tsx에서 쓰는 card 데이터 타입
export interface PendingEstimateCardData {
  estimateRequestId: string;
  toAddressMinimal: MinimalAddress;
  fromAddressMinimal: MinimalAddress;
  isConfirmed: boolean;
  isTargeted: boolean;
  moveDate: Date;
  moveType: ServiceType;
  price: number;
  offerStatus: EstimateOfferStatus;
  mover: MoverProfile;
}

interface CardProps {
  data: EstimateOffer | PendingEstimateCardData;
  onLikeClick?: () => void;
  onConfirmClick?: () => void;
  onDetailClick?: () => void;
}

export const CardListWait = ({
  data,
  onLikeClick,
  onConfirmClick,
  onDetailClick,
}: CardProps) => {
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
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid #F2F2F2"
      maxWidth={"688px"}
      minWidth={"327px"}
      width={"100%"}
      gap={["0px", "0px", "14px"]}
      maxHeight={"480px"}
      minHeight={"362px"}
      height={"100%"}
      borderRadius="16px"
      padding={[
        "20px 12px 14px 12px",
        "22px 12px 16px 12px",
        "28px 24px 22px 24px",
      ]}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
      boxSizing={"border-box"}
      sx={(theme) => ({ bgcolor: theme.palette.White[100] })}
    >
      <Box>
        <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
          {chips.map((chip, index) => (
            <ChipCategory key={index} data={chip} />
          ))}
        </Box>
      </Box>

      <Box
        display="flex"
        border="1px solid #F2F2F2"
        padding={["16px", "10px", "16px 10px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
        borderRadius={"6px"}
        sx={(theme) => ({ bgcolor: theme.palette.White[100] })}
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
            gap={"9.5px"}
            alignItems="center"
            flexGrow={1}
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
                {t("경력")}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {info.experience} {t("년")}
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
                {t("확정")}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={["8px", "16px", "24px"]}
      >
        <Box
          display={"flex"}
          flexDirection={["column", "column", "row"]}
          gap={["14px", "14px", "24px"]}
          alignItems={["flex-start", "flex-start", "center"]}
          flexWrap={"nowrap"}
        >
          <Box
            display={"flex"}
            gap={["8px", "8px", "12px"]}
            alignItems={"center"}
          >
            <Box
              borderRadius="4px"
              display={"inline-block"}
              padding={["2px 6px", "2px 6px", "4px 6px"]}
              sx={(theme) => ({
                backgroundColor: theme.palette.Background[400],
              })}
            >
              <Typography
                sx={(theme) => ({
                  fontSize: [14, 14, 18],
                  lineHeight: ["24px", "24px", "26px"],
                  fontWeight: [500, 500, 400],
                  color: theme.palette.Grayscale[400],
                  whiteSpace: "nowrap",
                })}
              >
                {t("이사일")}
              </Typography>
            </Box>
            <Typography
              sx={(theme) => ({
                fontSize: [14, 14, 18],
                lineHeight: ["24px", "24px", "26px"],
                fontWeight: 500,
                color: theme.palette.Black[300],
                wordBreak: "break-all",
              })}
            >
              {formatKoreanDate(data.moveDate ?? "")}
            </Typography>
          </Box>
          <Box
            display={["none", "none", "inline-block"]}
            height={14}
            border={"1px solid #E6E6E6"}
          ></Box>
          <Box
            display={"flex"}
            gap={["8px", "8px", "12px"]}
            alignItems={"center"}
          >
            <Box
              display={"flex"}
              gap={["8px", "8px", "12px"]}
              alignItems={"center"}
            >
              <Box
                borderRadius="4px"
                display={"inline-block"}
                padding={["2px 6px", "2px 6px", "4px 6px"]}
                sx={(theme) => ({
                  backgroundColor: theme.palette.Background[400],
                })}
              >
                <Typography
                  sx={(theme) => ({
                    fontSize: [14, 14, 18],
                    lineHeight: ["24px", "24px", "26px"],
                    fontWeight: [500, 500, 400],
                    color: theme.palette.Grayscale[400],
                    whiteSpace: "nowrap",
                  })}
                >
                  {t("출발")}
                </Typography>
              </Box>
              <Typography
                sx={(theme) => ({
                  fontSize: [14, 14, 18],
                  lineHeight: ["24px", "24px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                  wordBreak: "keep-all",
                })}
              >
                {[
                  data.fromAddressMinimal.sido,
                  data.fromAddressMinimal.sigungu,
                ].join(" ")}
              </Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            <Box
              border={"1px solid ##E6E6E6"}
              height={["14px", "14px", "16px"]}
            ></Box>
            <Box
              display={"flex"}
              gap={["8px", "8px", "12px"]}
              alignItems={"center"}
            >
              <Box
                borderRadius="4px"
                display={"inline-block"}
                padding={["2px 6px", "2px 6px", "4px 6px"]}
                sx={(theme) => ({
                  backgroundColor: theme.palette.Background[400],
                })}
              >
                <Typography
                  sx={(theme) => ({
                    fontSize: [14, 14, 18],
                    lineHeight: ["24px", "24px", "26px"],
                    fontWeight: [500, 500, 400],
                    color: theme.palette.Grayscale[400],
                    whiteSpace: "nowrap",
                  })}
                >
                  {t("도착")}
                </Typography>
              </Box>
              <Typography
                sx={(theme) => ({
                  fontSize: [14, 14, 18],
                  lineHeight: ["24px", "24px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                  wordBreak: "keep-all",
                })}
              >
                {[
                  data.toAddressMinimal.sido,
                  data.toAddressMinimal.sigungu,
                ].join(" ")}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          gap={["8px", "8px", "16px"]}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Typography
            sx={(theme) => ({
              fontSize: [14, 14, 18],
              lineHeight: ["24px", "24px", "26px"],
              fontWeight: 500,
              color: theme.palette.Black[400],
            })}
          >
            {t("견적 금액")}
          </Typography>
          <Typography
            sx={(theme) => ({
              fontSize: [18, 18, 24],
              lineHeight: ["26px", "26px", "32px"],
              fontWeight: 700,
              color: theme.palette.Black[400],
            })}
          >
            {(data.price ?? 0).toLocaleString()}원
          </Typography>
        </Box>
        <Box
          display={"flex"}
          gap={["8px", "8px", "11px"]}
          flexDirection={["column", "row", "row"]}
        >
          <Button
            onClick={onConfirmClick}
            variant="contained"
            sx={(theme) => ({
              height: [48, 48, 64],
              bgcolor: theme.palette.PrimaryBlue[300],
              borderRadius: ["8px", "8px", "16px"],
              flex: "1",
            })}
          >
            <Typography
              sx={(theme) => ({
                fontSize: [16, 16, 20],
                lineHeight: ["26px", "26px", "32px"],
                fontWeight: 600,
                color: theme.palette.White[100],
                wordBreak: "keep-all",
              })}
            >
              {t("견적 확정하기")}
            </Typography>
          </Button>
          <Button
            onClick={onDetailClick}
            variant="outlined"
            sx={(theme) => ({
              height: [48, 48, 64],
              borderRadius: ["8px", "8px", "16px"],
              border: `1px solid ${theme.palette.PrimaryBlue[300]}`,
              flex: "1",
            })}
          >
            <Typography
              sx={(theme) => ({
                fontSize: [16, 16, 20],
                lineHeight: ["26px", "26px", "32px"],
                fontWeight: 600,
                color: theme.palette.PrimaryBlue[300],
              })}
            >
              {t("상세보기")}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export const CardListWaitSkeleton = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      maxWidth={"688px"}
      minWidth={"327px"}
      width={"100%"}
      gap={["0px", "0px", "14px"]}
      maxHeight={"480px"}
      minHeight={"362px"}
      height={"100%"}
      borderRadius="16px"
      padding={[
        "20px 12px 14px 12px",
        "22px 12px 16px 12px",
        "28px 24px 22px 24px",
      ]}
      boxSizing="border-box"
      sx={(theme) => ({
        bgcolor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1],
      })}
    >
      {/* Chip 영역 */}
      <Box display="flex" gap="12px">
        <Skeleton
          variant="rounded"
          width={80}
          height={28}
          sx={(theme) => ({
            bgcolor: theme.palette.action.hover,
            borderRadius: "8px",
          })}
        />
      </Box>

      {/* 프로필 영역 */}
      <Box
        display="flex"
        padding={["16px", "10px", "16px 10px"]}
        gap={["12px", "12px", "24px"]}
        borderRadius={"6px"}
        sx={(theme) => ({
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[1],
        })}
      >
        <Skeleton variant="circular" width={56} height={56} />
        <Box flexGrow={1} display="flex" flexDirection="column" gap="8px">
          <Skeleton variant="text" width="40%" height={24} />
          <Box display="flex" gap="16px">
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="text" width={60} height={20} />
            <Skeleton variant="text" width={60} height={20} />
          </Box>
        </Box>
      </Box>

      {/* 이사 정보 + 금액 */}
      <Box display="flex" flexDirection="column" gap="24px">
        <Box display="flex" flexWrap="wrap" gap="16px">
          <Skeleton variant="text" width="30%" height={24} />
          <Skeleton variant="text" width="30%" height={24} />
          <Skeleton variant="text" width="30%" height={24} />
        </Box>
        <Box display="flex" justifyContent="flex-end" gap="16px">
          <Skeleton variant="text" width="20%" height={28} />
          <Skeleton variant="text" width="30%" height={28} />
        </Box>

        {/* 버튼 */}
        <Box display="flex" gap="11px" flexDirection={["column", "row", "row"]}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={64}
            sx={(theme) => ({
              bgcolor: theme.palette.action.hover,
              borderRadius: "16px",
            })}
          />
          <Skeleton
            variant="rounded"
            width="100%"
            height={64}
            sx={(theme) => ({
              bgcolor: theme.palette.action.hover,
              borderRadius: "16px",
            })}
          />
        </Box>
      </Box>
    </Box>
  );
};
