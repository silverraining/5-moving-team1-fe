import { Box, Button, Divider, Typography } from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import { formatKoreanDate } from "@/src/lib/formatKoreanDate";
import dayjs from "@/src/lib/dayjsConfig";
import Image from "next/image";
import { ChipData } from "@/src/types/card";
import { EstimateRequestItem } from "@/src/api/mover/estimate/requested/api";

interface CardProps {
  data: EstimateRequestItem;
  onConfirmClick?: () => void;
  onDetailClick?: () => void;
}

export const CardListRequest = ({
  data,
  onConfirmClick,
  onDetailClick,
}: CardProps) => {
  // 카드 데이터
  const info = data;
  // Chip 데이터
  // moveType이 유효한 값이면 칩으로 추가
  const chips: ChipData[] = [
    {
      chipType: data.moveType,
      status: data.requestStatus,
      isTargeted: data.isTargeted,
    },
  ];

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
          display={["none", "inline-block"]}
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
            <Typography
              display={["inline-block", "none"]}
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
                  출발
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
                  도착
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
              견적 보내기
            </Typography>
          </Button>
          <Button
            onClick={onDetailClick}
            variant="outlined"
            sx={(theme) => ({
              height: [48, 48, 64],
              borderRadius: ["8px", "8px", "16px"],
              border: `1px solid ${theme.palette.PrimaryBlue[300]}`,
              flex: 1,
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
              반려
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
