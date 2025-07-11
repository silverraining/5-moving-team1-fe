import {
  Box,
  Button,
  Divider,
  Typography,
  Tooltip,
  Stack,
  Skeleton,
} from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import { formatKoreanDate } from "@/src/lib/formatKoreanDate";
import dayjs from "@/src/lib/dayjsConfig";
import Image from "next/image";
import { ChipData } from "@/src/types/card";
import { EstimateRequestItem } from "@/src/api/mover/estimate/requested/api";
import { useTranslation } from "react-i18next";

interface CardProps {
  data: EstimateRequestItem;
  onConfirmClick?: () => void;
  onDetailClick?: () => void;
  isRejectDisabled?: boolean; // 지정견적요청이 아닌 건에 대한 반려하기 버튼 비활성화를 위해 추가
}

export const CardListRequest = ({
  data,
  onConfirmClick,
  onDetailClick,
  isRejectDisabled,
}: CardProps) => {
  // 카드 데이터
  const info = data;
  // Chip 데이터
  // moveType이 유효한 값이면 칩으로 추가
  const chips: ChipData[] = [
    {
      chipType: data.moveType,
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
      width="100%"
      height={[316, 228, 296]}
      bgcolor="#FFFFFF"
      borderRadius="16px"
      padding={[
        "20px 12px 14px 12px",
        "22px 12px 16px 12px",
        "28px 24px 22px 24px",
      ]}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
      boxSizing={"border-box"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
          {chips.map((chip, idx) => (
            <ChipCategory key={idx} data={chip} />
          ))}
        </Box>
        <Typography
          display={["inline-block"]}
          sx={(theme) => ({
            fontSize: [12, 12, 14],
            lineHeight: ["18px", "18px", "24px"],
            fontWeight: 400,
            color: theme.palette.Grayscale[500],
          })}
        >
          {dayjs(info.createdAt).fromNow()}
        </Typography>
      </Box>

      <Box
        display="flex"
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["10px", "12px", "24px"]}
        sx={(theme) => ({ borderColor: theme.palette.Line[100] })}
      >
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              sx={(theme) => ({
                fontSize: [16, 16, 20],
                lineHeight: ["26px", "26px", "32px"],
                fontWeight: 600,
                color: theme.palette.Black[300],
              })}
            >
              {info.customerName} 고객님
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={(theme) => ({
          display: ["none", "block", "block"],
          borderColor: theme.palette.Line[100],
        })}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={["20px", "16px", "24px"]}
      >
        <Box
          display={"flex"}
          flexDirection={["column", "row", "row"]}
          gap={["14px", "14px", "24px"]}
        >
          <Box display={"flex"} gap={["8px", "8px", "12px"]}>
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
                })}
              >
                이사일
              </Typography>
            </Box>
            <Typography
              sx={(theme) => ({
                fontSize: [14, 14, 18],
                lineHeight: ["24px", "24px", "26px"],
                fontWeight: 500,
                color: theme.palette.Black[300],
                display: "flex",
                alignItems: "center",
              })}
            >
              {formatKoreanDate(data.moveDate ?? "")}
            </Typography>
          </Box>
          <Divider
            sx={(theme) => ({
              display: ["block", "none", "none"],
              margin: ["10px 0px", "0px", "0px"],
              borderColor: theme.palette.Line[100],
            })}
          />
          <Box display={"flex"} gap={["4px"]}>
            <Box display={"flex"} gap={["8px", "8px", "12px"]}>
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
                  display: "flex",
                  alignItems: "center",
                })}
              >
                {data.fromAddressMinimal?.sido}{" "}
                {data.fromAddressMinimal?.sigungu}
              </Typography>
            </Box>
            <Box
              border={"1px solid ##E6E6E6"}
              height={["14px", "14px", "16px"]}
            ></Box>
            <Box display={"flex"} gap={["8px", "8px", "12px"]}>
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
                  display: "flex",
                  alignItems: "center",
                })}
              >
                {data.toAddressMinimal?.sido} {data.toAddressMinimal?.sigungu}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          gap={["8px", "8px", "11px"]}
          flexDirection={["column", "row", "row"]}
        >
          <Button
            onClick={onConfirmClick}
            variant="contained"
            endIcon={
              <Image
                src="/Images/button/writing.svg"
                alt="작성 아이콘"
                width={24}
                height={24}
              />
            }
            sx={(theme) => ({
              height: [48, 48, 64],
              bgcolor: theme.palette.PrimaryBlue[300],
              borderRadius: ["8px", "8px", "16px"],
              flex: 1,
            })}
          >
            <Typography
              sx={(theme) => ({
                fontSize: [16, 16, 20],
                lineHeight: ["26px", "26px", "32px"],
                fontWeight: 600,
                color: theme.palette.White[100],
              })}
            >
              {t("견적 보내기")}
            </Typography>
          </Button>
          <Tooltip
            title={
              isRejectDisabled
                ? "지정 견적 요청 건에 대해서만 반려가 가능합니다."
                : ""
            }
            arrow
            placement="top"
            disableHoverListener={!isRejectDisabled}
          >
            {/* 버튼은 span으로 감싸야 Tooltip이 disabled 상태에서도 동작함 */}
            <span style={{ flex: 1, width: "100%", display: "flex" }}>
              <Button
                onClick={onDetailClick}
                disabled={isRejectDisabled}
                variant="outlined"
                sx={(theme) => ({
                  height: [48, 48, 64],
                  borderRadius: ["8px", "8px", "16px"],
                  border: `1px solid ${
                    isRejectDisabled
                      ? theme.palette.Grayscale[200]
                      : theme.palette.PrimaryBlue[300]
                  }`,
                  flex: 1,
                })}
              >
                <Typography
                  sx={(theme) => ({
                    fontSize: [16, 16, 20],
                    lineHeight: ["26px", "26px", "32px"],
                    fontWeight: 600,
                    color: isRejectDisabled
                      ? theme.palette.Grayscale[500]
                      : theme.palette.PrimaryBlue[300],
                  })}
                >
                  {t("반려")}
                </Typography>
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export const CardListRequestSkeleton = () => (
  <Stack
    direction="column"
    border={"0.5px solid black"}
    padding={["22px 12px 16px 12px"]}
    boxShadow={"2px 2px 10px 0px #DCDCDC24,-2px -2px 10px 0px #DCDCDC24"}
    borderRadius={"16px"}
    width={["375px", "601px", "750px"]}
    justifyContent={"space-between"}
    height={["316px", "228px", "296px"]}
    boxSizing={"border-box"}
    sx={(theme) => ({
      borderColor: theme.palette.Line[100],
      backgroundColor: theme.palette.background.paper,
    })}
  >
    {/* 칩 + 만든 시간 */}
    <Stack direction="row" spacing={2} justifyContent="space-between">
      <Skeleton variant="rounded" width={106} height={34} />
      <Skeleton variant="text" width={54} height={24} />
    </Stack>

    {/* 고객 이름 */}
    <Stack direction="column" sx={{ alignItems: "flex-start" }}>
      <Skeleton variant="text" width={182} height={32} />
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        display={["flex", "none", "none"]}
      >
        <Skeleton variant="text" width={59} height={34} />
        <Skeleton variant="text" width={130} height={34} />
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
      spacing={2}
      display={["none", "flex", "flex"]}
    >
      <Skeleton variant="text" width={59} height={34} />
      <Skeleton variant="text" width={130} height={34} />
      <Skeleton variant="text" width={59} height={34} />
      <Skeleton variant="text" width={140} height={34} />
      <Skeleton variant="text" width={59} height={34} />
      <Skeleton variant="text" width={140} height={34} />
    </Stack>

    {/* 이사일 + 출발 + 도착 (모바일) */}
    <Stack
      direction="row"
      justifyContent={"flex-start"}
      spacing={2}
      alignItems="center"
      display={["flex", "none", "none"]}
    >
      <Skeleton variant="text" width={59} height={34} />
      <Skeleton variant="text" width={140} height={34} />
      <Skeleton variant="text" width={59} height={34} />
      <Skeleton variant="text" width={140} height={34} />
    </Stack>

    {/* 버튼 */}
    <Stack
      direction={["column", "row", "row"]}
      justifyContent={"flex-start"}
      spacing={2}
      gap={1}
    >
      <Skeleton
        variant="rounded"
        width={340}
        sx={{
          height: [48, 48, 64],
        }}
      />
      <Skeleton
        variant="rounded"
        width={340}
        sx={{
          height: [48, 48, 64],
        }}
      />
    </Stack>
  </Stack>
);
