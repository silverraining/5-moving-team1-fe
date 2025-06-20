import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ReviewData } from "@/src/types/common";
import { StarRating } from "./StarRating";
import Pagination from "../../pagination/Pagination";

interface ReviewListProps {
  reviews: ReviewData[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ReviewList = ({
  reviews,
  currentPage,
  totalPages,
  onPageChange,
}: ReviewListProps) => {
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

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
            paddingTop: "24px",
          }}
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </Box>
      )}
    </Box>
  );
};
