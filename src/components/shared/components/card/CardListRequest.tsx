import { Box, Button, Typography } from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import { CardData } from "./CardListdd";
import { COLORS } from "@/public/theme/colors";
import { formatKoreanDate } from "@/src/lib/koreanDate";
import dayjs from "@/src/lib/dayjsConfig";

interface CardProps {
  data: CardData;
  onConfirmClick?: () => void;
  onDetailClick?: () => void;
}

export const CardListRequest = ({
  data,
  onConfirmClick,
  onDetailClick,
}: CardProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid #F2F2F2"
      width={[327, 600, 688]}
      height={[398, 362, 410]}
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
      <Box display={"flex"} alignItems={"center"}>
        <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
          {data.types.map((type, index) => (
            <ChipCategory key={index} type={type} />
          ))}
        </Box>
        <Typography display={["none", "inline-block"]}>
          {dayjs(data.date).fromNow()}
        </Typography>
      </Box>

      <Box
        display="flex"
        border="1px solid #F2F2F2"
        bgcolor="#FFFFFF"
        padding={["16px", "10px", "16px 10px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
        borderRadius={"6px"}
      >
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              sx={{
                fontSize: [14, 14, 18],
                lineHeight: ["24px", "24px", "26px"],
                fontWeight: 600,
                color: COLORS.Black[300],
              }}
            >
              {data.name} 고객님
            </Typography>
            <Typography display={["inline-block", "none"]}>
              {dayjs(data.date).fromNow()}
            </Typography>
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
          flexDirection={["column", "row", "row"]}
          gap={["14px", "14px", "24px"]}
        >
          <Box display={"flex"} gap={["8px", "8px", "12px"]}>
            <Box
              bgcolor="#F4F7FB"
              borderRadius="4px"
              display={"inline-block"}
              padding={["2px 6px", "2px 6px", "4px 6px"]}
            >
              <Typography
                sx={{
                  fontSize: [14, 14, 18],
                  lineHeight: ["24px", "24px", "26px"],
                  fontWeight: [500, 500, 400],
                  color: COLORS.Grayscale[400],
                }}
              >
                이사일
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: [14, 14, 18],
                lineHeight: ["24px", "24px", "26px"],
                fontWeight: 500,
                color: COLORS.Black[300],
              }}
            >
              {formatKoreanDate(data.MovingDay ?? "")}
            </Typography>
          </Box>
          <Box display={"flex"}>
            <Box display={"flex"} gap={["8px", "8px", "12px"]}>
              <Box
                bgcolor="#F4F7FB"
                borderRadius="4px"
                display={"inline-block"}
                padding={["2px 6px", "2px 6px", "4px 6px"]}
              >
                <Typography
                  sx={{
                    fontSize: [14, 14, 18],
                    lineHeight: ["24px", "24px", "26px"],
                    fontWeight: [500, 500, 400],
                    color: COLORS.Grayscale[400],
                  }}
                >
                  출발
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: [14, 14, 18],
                  lineHeight: ["24px", "24px", "26px"],
                  fontWeight: 500,
                  color: COLORS.Black[300],
                }}
              >
                {data.from}
              </Typography>
            </Box>
            <Box
              border={"1px solid ##E6E6E6"}
              height={["14px", "14px", "16px"]}
            ></Box>
            <Box display={"flex"} gap={["8px", "8px", "12px"]}>
              <Box
                bgcolor="#F4F7FB"
                borderRadius="4px"
                display={"inline-block"}
                padding={["2px 6px", "2px 6px", "4px 6px"]}
              >
                <Typography
                  sx={{
                    fontSize: [14, 14, 18],
                    lineHeight: ["24px", "24px", "26px"],
                    fontWeight: [500, 500, 400],
                    color: COLORS.Grayscale[400],
                  }}
                >
                  도착
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: [14, 14, 18],
                  lineHeight: ["24px", "24px", "26px"],
                  fontWeight: 500,
                  color: COLORS.Black[300],
                }}
              >
                {data.to}
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
            sx={{
              fontSize: [14, 14, 18],
              lineHeight: ["24px", "24px", "26px"],
              fontWeight: 500,
              color: COLORS.Black[400],
            }}
          >
            견적 금액
          </Typography>
          <Typography
            sx={{
              fontSize: [18, 18, 24],
              lineHeight: ["26px", "26px", "32px"],
              fontWeight: 700,
              color: COLORS.Black[400],
            }}
          >
            {(data.cost ?? 0).toLocaleString()}원
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
            sx={{
              height: [48, 48, 64],
              bgcolor: COLORS.PrimaryBlue[300],
              borderRadius: ["8px", "8px", "16px"],
            }}
          >
            <Typography
              sx={{
                fontSize: [16, 16, 20],
                lineHeight: ["26px", "26px", "32px"],
                fontWeight: 600,
                color: COLORS.White[100],
              }}
            >
              견적 보내기
            </Typography>
          </Button>
          <Button
            onClick={onDetailClick}
            variant="outlined"
            sx={{
              height: [48, 48, 64],
              borderRadius: ["8px", "8px", "16px"],
              border: `1px solid ${COLORS.PrimaryBlue[300]}`,
            }}
          >
            <Typography
              sx={{
                fontSize: [16, 16, 20],
                lineHeight: ["26px", "26px", "32px"],
                fontWeight: 600,
                color: COLORS.PrimaryBlue[300],
              }}
            >
              반려
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
