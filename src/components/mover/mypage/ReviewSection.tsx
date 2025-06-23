"use client";
import { Box } from "@mui/material";
import { ReviewList } from "@/src/components/shared/components/review/ReviewList";
import { useMoverReviews } from "@/src/api/review/hooks";
import { ReviewData, ReviewStatistics } from "@/src/types/common";
import { useState } from "react";

interface ReviewSectionProps {
  moverId: string;
}

export const ReviewSection = ({ moverId }: ReviewSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: reviewData } = useMoverReviews(moverId, currentPage, 5);

  const reviewStatistics: ReviewStatistics = {
    average: reviewData?.rating?.average || 0,
    score: reviewData?.rating?.count || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    max: Math.max(
      ...Object.values(
        reviewData?.rating.count || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      )
    ),
  };

  const reviews: ReviewData[] =
    reviewData?.reviews.map((review) => ({
      id: Math.random(), // 임시 ID 생성
      author: review.customerName,
      date: review.createdAt,
      rating: review.rating,
      content: review.comment,
    })) || [];

  if (!reviewData) return null;

  return (
    <Box
      sx={{
        paddingBottom: "40px",
        marginBottom: "40px",
      }}
    >
      <ReviewList
        reviews={reviews}
        onPageChange={setCurrentPage}
        totalPages={Math.ceil((reviewData?.total || 0) / 5)}
        currentPage={currentPage}
        total={reviewData?.total || 0}
        reviewStatistics={reviewStatistics}
      />
    </Box>
  );
};
