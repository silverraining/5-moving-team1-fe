import { Box, Typography } from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import { CardData } from "@/src/types/card";

import dayjs from "@/src/lib/dayjsConfig";
import { formatKoreanDate } from "@/src/lib/formatKoreanDate";
import { COLORS } from "@/public/theme/colors";

interface CardProps {
  data: CardData;
}

export const CardListReject = ({ data }: CardProps) => {
  return (
    <Box
      position={"relative"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      maxWidth={1200}
      minWidth={[400, 580, 680]}
      width={"100%"}
      height={[194, 194, 216]}
      borderRadius="16px"
      padding={[
        "16px 14px 13px 14px",
        "16px 14px 16px 14px",
        "20px 24px 12px 24px",
      ]}
      boxShadow="2px 2px 10px 0px rgba(220, 220, 220, 0.14), -2px -2px 10px 0px rgba(220, 220, 220, 0.14)"
      boxSizing={"border-box"}
    >
      {data.reject && (
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
            반려된 요청이에요
          </Typography>
        </Box>
      )}

      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
          {data.types.map((type, index) => (
            <ChipCategory key={index} type={type} />
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
          {dayjs(data.date).fromNow()}
        </Typography>
      </Box>

      <Box
        display="flex"
        bgcolor={COLORS.White[100]}
        padding={["16px", "10px", "16px 10px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
      >
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          gap={["10px", "14px", "18px"]}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            gap={"14px"}
          >
            <Box
              display={"flex"}
              flexDirection="row"
              gap={"5px"}
              alignItems={"center"}
            >
              <Typography
                sx={(theme) => ({
                  fontSize: [14, 14, 18],
                  lineHeight: ["24px", "24px", "26px"],
                  fontWeight: 600,
                  color: theme.palette.Black[300],
                })}
              >
                {data.name} 고객님
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
                {dayjs(data.date).fromNow()}
              </Typography>
            </Box>
            <Box display={["flex", "none", "none"]}>
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
                  })}
                >
                  이사일
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
                {formatKoreanDate(data.movingDay ?? "")}
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
            justifyContent={["space-between", "flex-start"]}
          >
            <Box display={["none", "flex"]} gap={"12px"} alignItems="center">
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
                  이사일
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
                {formatKoreanDate(data.movingDay ?? "")}
              </Typography>
            </Box>
            <Box
              display={["none", "inline-block", "inline-block"]}
              height={14}
              border={"1px solid #E6E6E6"}
            ></Box>
            <Box display="flex" gap={"12px"} alignItems="center">
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
                  출발
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
                {data.from}
              </Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            <Box display="flex" gap={"12px"} alignItems="center">
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
                  도착
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
                {data.to}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
