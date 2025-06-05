import { Box, Typography } from "@mui/material";
import { CardData } from "@/src/types/card";
import Image from "next/image";
import { formatKoreanDate } from "@/src/lib/formatKoreanDate";
import { maskNickname } from "@/src/lib/maskNickname";

interface CardProps {
  data: CardData;
}

export const CardListReview = ({ data }: CardProps) => {
  return (
    <Box
      border={"1px solid"}
      padding={["15px", "15px", "24px"]}
      sx={(theme) => ({
        borderColor: theme.palette.Line[100],
        backgroundColor: theme.palette.White[100],
      })}
    >
      <Box display={"flex"} gap={"6px"} alignItems={"center"}>
        <Box>
          <Typography
            sx={(theme) => ({
              fontSize: [14, 14, 18],
              lineHeight: ["24px", "24px", "26px"],
              fontWeight: 400,
              color: theme.palette.Black[400],
            })}
          >
            {maskNickname(data.nickname ?? "")}
          </Typography>
        </Box>
        <Box
          border={"1px solid"}
          height={[12, 12, 14]}
          sx={(theme) => ({ BorderColor: theme.palette.Line[200] })}
        ></Box>
        <Box>
          <Typography
            sx={(theme) => ({
              fontSize: [14, 14, 18],
              lineHeight: ["24px", "24px", "26px"],
              fontWeight: 400,
              color: theme.palette.Grayscale[300],
            })}
          >
            {formatKoreanDate(data.date ?? "", false)}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" gap="4px">
        {Array.from({ length: data.review ?? 1 }).map((_, i) => (
          <Box
            key={i}
            position="relative"
            width={[20, 20, 24]}
            height={[20, 20, 24]}
          >
            <Image
              src="/Images/star/star_active.svg"
              alt="별점 사진"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
        ))}
      </Box>
      <Box>
        <Typography>{data.writeReview}</Typography>
      </Box>
    </Box>
  );
};
