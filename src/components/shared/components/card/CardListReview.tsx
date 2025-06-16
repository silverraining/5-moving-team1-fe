import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { formatKoreanDate } from "@/src/lib/formatKoreanDate";
import { maskNickname } from "@/src/lib/maskNickname";
import { EstimateOffer } from "@/src/types/estimate";
import { StarRating } from "../review/StarRating";

interface CardProps {
  data: EstimateOffer;
}

export const CardListReview = ({ data }: CardProps) => {
  const info = data.mover;
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
            {maskNickname(info.nickname ?? "")}
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
            {formatKoreanDate(data.createdAt ?? "", false)}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" gap="4px">
        <StarRating rating={info.rating} />
      </Box>
      <Box>
        {info.reviews?.map((review, idx) => (
          <Typography key={idx}>{review.comment}</Typography>
        ))}
      </Box>
    </Box>
  );
};
