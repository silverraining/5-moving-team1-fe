import { Box, Typography } from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import { CardData } from "./CardListdd";
import Image from "next/image";
import { COLORS } from "@/public/theme/colors";

interface CardProps {
  data: CardData;
}

export const CardListMyReview = ({ data }: CardProps) => {
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
      padding={[
        "16px 14px 10px 14px",
        "16px 14px 10px 14px",
        "20px 24px 14px 24px",
      ]}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
      boxSizing={"border-box"}
    >
      <Box display="flex" flexDirection="row" gap={["14px", "16px"]}>
        <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
          {data.types.map((type, index) => (
            <ChipCategory key={index} type={type} />
          ))}
        </Box>
        <Typography
          sx={{
            fontSize: [14, 14, 24],
            lineHeight: ["24px", "24px", "32px"],
            fontWeight: 600,
            color: COLORS.Black[300],
            display: ["none", "block", "block"],
          }}
        >
          {data.date}
        </Typography>
      </Box>

      {/* 아래 */}
      <Box
        display="flex"
        border={["0px", "0px", "1px solid"]}
        borderColor={COLORS.Line[100]}
        bgcolor="#FFFFFF"
        padding={["10px", "10px", "16px 18px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
        borderRadius={"1px"}
      >
        <Box width={[46, 46, 56]} height={[46, 46, 56]} position="relative">
          <Image
            src={data.imgSrc}
            alt={"프로필 이미지"}
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
              {data.name} 기사님
            </Typography>
            <Box display="flex" gap="4px">
              {Array.from({ length: data.review ?? 0 }).map((_, i) => (
                <Box
                  key={i}
                  position="relative"
                  width={[20, 20, 24]}
                  height={[20, 20, 24]}
                >
                  <Image
                    src="/images/star/star_active.svg"
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
                {data.career}년
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
                견적가
              </Typography>
              <Typography
                sx={{
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: COLORS.Black[300],
                }}
              >
                {(data.cost ?? 0).toLocaleString()}원
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography>{data.writeReview}</Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Typography
          sx={{
            fontSize: [14, 14, 24],
            lineHeight: ["24px", "24px", "32px"],
            fontWeight: 600,
            color: COLORS.Black[300],
            display: ["block", "none", "none"],
          }}
        >
          {data.date}
        </Typography>
      </Box>
    </Box>
  );
};
