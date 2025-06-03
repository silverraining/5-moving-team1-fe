import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ReviewData } from "@/src/types/common";
import { StarRating } from "./StarRating";
import Pagination from "../../pagination/Pagination";

interface ReviewListProps {
  reviews: ReviewData[];
  itemsPerPage?: number; // 페이지당 표시할 리뷰 수
}

export const ReviewList = ({ reviews, itemsPerPage = 5 }: ReviewListProps) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  // 현재 페이지에 표시할 리뷰 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReviews = reviews.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box>
      {currentReviews.map((review) => (
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
            onPageChange={handlePageChange}
          />
        </Box>
      )}
    </Box>
  );
};
