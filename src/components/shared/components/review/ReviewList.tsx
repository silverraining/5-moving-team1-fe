import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ReviewData } from "@/src/types/common";
import { StarRating } from "./StarRating";

interface ReviewListProps {
  reviews: ReviewData[];
}

export const ReviewList = ({ reviews }: ReviewListProps) => {
  const theme = useTheme();

  return (
    <Box>
      {reviews.map((review) => (
        <Box
          key={review.id}
          sx={{
            padding: "32px 0",
            borderBottom: `1px solid ${theme.palette.Line[100]}`,
          }}
        >
          <Box sx={{ display: "flex", gap: "12px", marginBottom: "8px" }}>
            <Typography
              sx={{
                fontSize: [14, 16],
                fontWeight: 600,
                color: theme.palette.Black[300],
              }}
            >
              {review.author}
            </Typography>
            <Typography
              sx={{
                fontSize: [12, 14],
                color: theme.palette.Grayscale[300],
              }}
            >
              {review.date}
            </Typography>
          </Box>

          <Box sx={{ marginBottom: "12px" }}>
            <StarRating rating={review.rating} />
          </Box>

          <Typography
            sx={{
              fontSize: [14, 16],
              lineHeight: ["22px", "24px"],
              color: theme.palette.Black[300],
            }}
          >
            {review.content}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
