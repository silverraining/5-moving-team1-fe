import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ChipCategory, ChipProps } from "../chip/ChipCategory";
import Image from "next/image";
import { COLORS } from "@/public/theme/colors";

export interface CardData {
  types: ChipProps["type"][];
  message?: string;
  imgSrc: string;
  name: string;
  like: number;
  rating: number;
  count: number;
  career: number;
  confirm: number;
  isLiked: boolean;
}

interface CardProps {
  data: CardData;
  onLikeClick?: () => void;
}

export const CardListDriver = ({ data, onLikeClick }: CardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const size = isMobile ? "sm" : isDesktop ? "lg" : "md";

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid #F2F2F2"
      width={[327, 600, 955]}
      height={[188, 188, 230]}
      bgcolor="#FFFFFF"
      borderRadius="16px"
      padding={["14px 16px", "14px 16px", "20px 24px"]}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
    >
      <Box display="flex" flexDirection="column" gap={["14px", "16px"]}>
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
          }}
        >
          {data.message}
        </Typography>
      </Box>

      {/* 아래 */}
      <Box
        display="flex"
        border="1px solid #F2F2F2"
        bgcolor="#FFFFFF"
        padding={["10px", "10px", "16px 18px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
      >
        <Box width={size === "lg" ? 56 : 46} height={size === "lg" ? 56 : 46}>
          <Image
            src={data.imgSrc}
            alt={"프로필 이미지"}
            width={size === "lg" ? 56 : 46}
            height={size === "lg" ? 56 : 46}
            style={{
              overflow: "hidden",
              borderRadius: "50%",
            }}
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              sx={{
                fontSize: [14, 14, 84],
                lineHeight: ["24px", "24px", "26px"],
                fontWeight: 600,
                color: COLORS.Black[300],
              }}
            >
              {data.name} 기사님
            </Typography>
            <Box display="flex" alignItems="center">
              <Image
                src={
                  data.isLiked
                    ? "/images/like/like.svg"
                    : "/images/like/unlike.svg"
                }
                alt="좋아요 버튼"
                width={24}
                height={24}
                onClick={onLikeClick}
                style={{ cursor: "pointer" }}
              />
              <Typography
                sx={{
                  fontSize: [13, 13, 18],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: COLORS.PrimaryBlue[400],
                }}
              >
                {data.like}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            flexGrow={1}
            gap={"9.5px"}
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Image
                src="/images/star/star_active.svg"
                alt="별점 사진"
                width={20}
                height={20}
              />
              <Typography>{data.rating}</Typography>
              <Typography>({data.count})</Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            <Box display="flex">
              <Typography>경력</Typography>
              <Typography>{data.career}년</Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            <Box display="flex">
              <Typography
                sx={{
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: COLORS.Black[300],
                }}
              >
                {data.confirm}
              </Typography>
              <Typography
                sx={{
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: COLORS.Grayscale[300],
                }}
              >
                확정
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
