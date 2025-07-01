import {
  Box,
  Button,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import { ChipData } from "@/src/types/card";
import dayjs from "@/src/lib/dayjsConfig";
import { formatKoreanDate } from "@/src/lib/formatKoreanDate";
import {
  EstimateOfferStatus,
  MinimalAddress,
  ServiceType,
} from "@/src/types/common";
import { EstimateRequest } from "@/src/types/estimate";
import { useTranslation } from "react-i18next";

// OfferEstimate.tsx에서 쓰는 card 데이터 타입
export interface OfferEstimateCardData {
  createdAt: string;
  customerName: string;
  estimateRequestId: string;
  fromAddressMinimal: MinimalAddress;
  isConfirmed: boolean;
  isTargeted: boolean;
  moveDate: string;
  moveType: ServiceType;
  offerId: string;
  price: number;
  status: EstimateOfferStatus;
  toAddressMinimal: MinimalAddress;
}
interface CardProps {
  data: EstimateRequest | OfferEstimateCardData;
  onclickDetails?: () => void;
}

export const CardListCompleteState = ({ data, onclickDetails }: CardProps) => {
  const { t } = useTranslation();
  // chip 데이터
  const chips: ChipData[] = [
    {
      chipType: data.moveType,
      status: data.status,
      isTargeted: data.isTargeted,
    },
  ];
  return (
    <Box
      position={"relative"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      maxWidth={"688px"}
      width={"100%"}
      minWidth={"327px"}
      borderRadius="16px"
      padding={[
        "16px 14px 13px 14px",
        "16px 14px 16px 14px",
        "20px 24px 12px 24px",
      ]}
      boxShadow="2px 2px 10px 0px rgba(220, 220, 220, 0.14), -2px -2px 10px 0px rgba(220, 220, 220, 0.14)"
      boxSizing={"border-box"}
      sx={(theme) => ({
        backgroundColor: theme.palette.White[100],
      })}
    >
      {data.isConfirmed && (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          position={"absolute"}
          border="1px solid"
          top={0}
          right={0}
          width={"100%"}
          height={"100%"}
          flexDirection={"column"}
          gap={"16px"}
          sx={(theme) => ({
            background: "rgba(4, 4, 4, 0.64)",
            zIndex: 0,
            borderRadius: "16px",
            borderColor: theme.palette.Line[100],
          })}
        >
          <Typography
            sx={(theme) => ({
              fontSize: [16, 16, 18],
              lineHeight: ["26px", "26px", "26px"],
              fontWeight: 600,
              color: theme.palette.White[100],
            })}
          >
            {t("이사 완료된 견적이에요")}
          </Typography>
          <Button
            onClick={onclickDetails}
            variant="contained"
            sx={(theme) => ({
              height: [48, 48, 64],
              bgcolor: theme.palette.PrimaryBlue[100],
              borderRadius: ["8px", "8px", "16px"],
              border: "1px solid",
              borderColor: theme.palette.PrimaryBlue[200],
            })}
          >
            <Typography
              sx={(theme) => ({
                fontSize: [14, 14, 16],
                lineHeight: ["24px", "24px", "26px"],
                fontWeight: 600,
                color: theme.palette.PrimaryBlue[300],
              })}
            >
              {t("견적 상세보기")}
            </Typography>
          </Button>
        </Box>
      )}
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
          {chips.map((type, index) => (
            <ChipCategory key={index} data={type} />
          ))}
        </Box>
        <Typography
          display={["none", "inline-block", "inline-block"]}
          sx={(theme) => ({
            fontSize: [12, 12, 14],
            lineHeight: ["18px", "18px", "24px"],
            fontWeight: 400,
            color: theme.palette.Grayscale[500],
          })}
        >
          {dayjs(data.createdAt).fromNow()}
        </Typography>
      </Box>

      <Box
        display="flex"
        padding={["16px", "10px", "16px 10px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
        sx={(theme) => ({
          backgroundColor: theme.palette.White[100],
        })}
      >
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          gap={["14px", "14px", "18px"]}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap="14px"
          >
            <Box
              display={"flex"}
              flexDirection="row"
              gap={"5px"}
              alignItems="center"
            >
              <Typography
                sx={(theme) => ({
                  fontSize: [14, 14, 18],
                  lineHeight: ["24px", "24px", "26px"],
                  fontWeight: 600,
                  color: theme.palette.Black[300],
                })}
              >
                {data.customerName} 고객님
              </Typography>
              <Typography
                display={["inline-block", "none", "none"]}
                sx={(theme) => ({
                  fontSize: [12, 12, 14],
                  lineHeight: ["18px", "18px", "24px"],
                  fontWeight: 400,
                  color: theme.palette.Grayscale[500],
                })}
              >
                {dayjs(data.createdAt).fromNow()}
              </Typography>
            </Box>
            <Box display={["flex", "none", "none"]} gap={1}>
              <Box
                borderRadius="4px"
                padding={["2px 6px", "2px 6px", "4px 6px"]}
                sx={(theme) => ({
                  backgroundColor: theme.palette.Background[400],
                })}
              >
                <Typography
                  sx={(theme) => ({
                    fontSize: [13, 13, 16],
                    lineHeight: ["22px", "22px", "26px"],
                    fontWeight: 500,
                    color: theme.palette.Grayscale[300],
                    whiteSpace: "nowrap",
                  })}
                >
                  {t("이사일")}
                </Typography>
              </Box>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {formatKoreanDate(data.moveDate)}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              border: "1px solid",
              borderColor: theme.palette.Line[200],
            })}
          ></Box>
          <Box
            display="flex"
            flexDirection="row"
            gap={"9.5px"}
            alignItems="center"
            flexGrow={1}
            justifyContent={"flex-start"}
          >
            <Box display={["none", "flex"]} alignItems="center" gap={"12px"}>
              <Box
                borderRadius="4px"
                padding={["2px 6px", "2px 6px", "4px 6px"]}
                sx={(theme) => ({
                  backgroundColor: theme.palette.Background[400],
                })}
              >
                <Typography
                  sx={(theme) => ({
                    fontSize: [13, 13, 16],
                    lineHeight: ["22px", "22px", "26px"],
                    fontWeight: 500,
                    color: theme.palette.Grayscale[300],
                    whiteSpace: "nowrap",
                  })}
                >
                  {t("이사일")}
                </Typography>
              </Box>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                  wordBreak: "break-all",
                })}
              >
                {formatKoreanDate(data.moveDate ?? "")}
              </Typography>
            </Box>
            <Box
              display={["none", "none", "block"]}
              height={14}
              border={"1px solid #E6E6E6"}
            ></Box>
            <Box display="flex" alignItems="center" gap={"12px"}>
              <Box
                borderRadius="4px"
                padding={["2px 6px", "2px 6px", "4px 6px"]}
                sx={(theme) => ({
                  backgroundColor: theme.palette.Background[400],
                })}
              >
                <Typography
                  sx={(theme) => ({
                    fontSize: [13, 13, 16],
                    lineHeight: ["22px", "22px", "26px"],
                    fontWeight: 500,
                    color: theme.palette.Grayscale[300],
                    whiteSpace: "nowrap",
                  })}
                >
                  {t("출발")}
                </Typography>
              </Box>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {data.fromAddressMinimal?.sido}{" "}
                {data.fromAddressMinimal?.sigungu}
              </Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            <Box display="flex" alignItems="center" gap={"12px"}>
              <Box
                borderRadius="4px"
                padding={["2px 6px", "2px 6px", "4px 6px"]}
                sx={(theme) => ({
                  backgroundColor: theme.palette.Background[400],
                })}
              >
                <Typography
                  sx={(theme) => ({
                    fontSize: [13, 13, 16],
                    lineHeight: ["22px", "22px", "26px"],
                    fontWeight: 500,
                    color: theme.palette.Grayscale[300],
                    whiteSpace: "nowrap",
                  })}
                >
                  {t("도착")}
                </Typography>
              </Box>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {data.toAddressMinimal?.sido} {data.toAddressMinimal?.sigungu}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
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
          {t("견적 금액")}
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

export const CardListCompleteStateSkeleton = () => (
  <Stack
    direction="column"
    border={"0.5px solid black"}
    padding={["22px 12px 16px 12px"]}
    boxShadow={"2px 2px 10px 0px #DCDCDC24,-2px -2px 10px 0px #DCDCDC24"}
    borderRadius={"16px"}
    maxWidth={"688px"}
    width={"100%"}
    minWidth={"327px"}
    justifyContent={"space-between"}
    height={["233px", "184px", "228px"]}
    boxSizing={"border-box"}
    sx={(theme) => ({
      borderColor: theme.palette.Line[100],
      backgroundColor: theme.palette.background.paper,
    })}
  >
    {/* 칩 + 만든 시간 */}
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <Stack direction={"row"} spacing={1}>
        <Skeleton variant="rounded" width={106} height={34} />
        <Skeleton variant="rounded" width={106} height={34} />
      </Stack>
      <Stack display={["none", "flex", "flex"]}>
        <Skeleton variant="text" width={50} height={34} />
      </Stack>
    </Stack>

    {/* 고객 이름 + 시간 */}
    <Stack direction="column" sx={{ alignItems: "flex-start" }}>
      {/* 고객 이름 */}
      <Stack display={["none", "flex", "flex"]}>
        <Skeleton variant="text" width={80} height={32} />
      </Stack>

      {/* 모바일 고객 이름 */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        display={["flex", "none", "none"]}
      >
        <Skeleton variant="text" width={90} height={32} />
        <Skeleton variant="text" width={50} height={34} />
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        display={["flex", "none", "none"]}
      >
        <Skeleton variant="text" width={50} height={34} />
        <Skeleton variant="text" width={100} height={34} />
      </Stack>
    </Stack>

    <Divider
      sx={(theme) => ({
        borderColor: theme.palette.Line[200],
      })}
    ></Divider>

    {/* 이사일 + 출발 + 도착 */}
    <Stack
      direction="row"
      justifyContent={"flex-start"}
      alignItems="center"
      spacing={1}
      display={["none", "flex", "flex"]}
    >
      <Skeleton variant="text" width={40} height={34} />
      <Skeleton variant="text" width={110} height={34} />
      <Skeleton variant="text" width={40} height={34} />
      <Skeleton variant="text" width={110} height={34} />
      <Skeleton variant="text" width={40} height={34} />
      <Skeleton variant="text" width={110} height={34} />
    </Stack>

    {/* 이사일 + 출발 + 도착 (모바일) */}
    <Stack
      direction="row"
      justifyContent={"flex-start"}
      spacing={1}
      alignItems="center"
      display={["flex", "none", "none"]}
    >
      <Skeleton variant="text" width={34} height={34} />
      <Skeleton variant="text" width={70} height={34} />
      <Divider
        orientation="vertical"
        sx={(theme) => ({
          borderColor: theme.palette.Line[200],
          height: 14,
        })}
      ></Divider>
      <Skeleton variant="text" width={34} height={34} />
      <Skeleton variant="text" width={70} height={34} />
    </Stack>

    {/* 견적 금액 */}
    <Stack direction={"row"} justifyContent={"flex-end"} spacing={1}>
      <Skeleton
        variant="text"
        width={60}
        sx={{
          height: [48, 48, 64],
        }}
      />
      <Skeleton
        variant="text"
        width={100}
        sx={{
          height: [48, 48, 64],
        }}
      />
    </Stack>
  </Stack>
);
