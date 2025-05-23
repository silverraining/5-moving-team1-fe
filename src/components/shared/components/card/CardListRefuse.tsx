import { Box, Typography } from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import { CardData } from "./CardListdd";
import { COLORS } from "@/public/theme/colors";
import dayjs from "@/src/lib/dayjsConfig";

interface CardProps {
  data: CardData;
}

export const CardListRefuse = ({ data }: CardProps) => {
  return (
    <Box
      position={"relative"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width={[328, 600, 688]}
      height={[192, 164, 216]}
      borderRadius="16px"
      padding={[
        "20px 12px 14px 12px",
        "22px 12px 16px 12px",
        "28px 24px 22px 24px",
      ]}
      boxShadow="2px 2px 10px 0px rgba(220, 220, 220, 0.14), -2px -2px 10px 0px rgba(220, 220, 220, 0.14)"
      boxSizing={"border-box"}
    >
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
        sx={{
          background: "rgba(4, 4, 4, 0.64)",
          zIndex: 0,
          borderRadius: "16px",
          borderColor: COLORS.Line[100],
        }}
      >
        <Typography
          sx={{
            fontSize: [16, 16, 18],
            lineHeight: ["26px", "26px", "26px"],
            fontWeight: 600,
            color: COLORS.White[100],
          }}
        >
          반려된 요청이에요
        </Typography>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
          {data.types.map((type, index) => (
            <ChipCategory key={index} type={type} />
          ))}
        </Box>
        <Typography display={["none", "inline-block", "inline-block"]}>
          {dayjs(data.date).fromNow()}
        </Typography>
      </Box>

      <Box
        display="flex"
        border="1px solid #F2F2F2"
        bgcolor={COLORS.White[100]}
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
            <Typography display={["inline-block", "none", "none"]}>
              {dayjs(data.date).fromNow()}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap={"9.5px"}
            alignItems="center"
            flexGrow={1}
            justifyContent={["space-between", "flex-start"]}
          >
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            <Box display="flex">
              <Typography
                sx={{
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: COLORS.Grayscale[300],
                }}
              >
                이사일
              </Typography>
              <Typography
                sx={{
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: COLORS.Black[300],
                }}
              >
                {data.MovingDay}
              </Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            <Box display="flex">
              <Typography
                sx={{
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: COLORS.Grayscale[300],
                }}
              >
                출발
              </Typography>
              <Typography
                sx={{
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: COLORS.Black[300],
                }}
              >
                {data.from}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography
                sx={{
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: COLORS.Grayscale[300],
                }}
              >
                도착
              </Typography>
              <Typography
                sx={{
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: COLORS.Black[300],
                }}
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
