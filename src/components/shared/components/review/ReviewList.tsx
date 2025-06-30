import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ReviewData } from "@/src/types/common";
import { StarRating } from "./StarRating";
import Pagination from "../../pagination/Pagination";
import Image from "next/image";
import { ReviewChart } from "./review-chart/ReviewChart";
import { useTranslation } from "react-i18next";

interface ReviewListProps {
  reviews: ReviewData[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  total?: number;
  reviewStatistics?: any;
}

export const ReviewList = ({
  reviews,
  currentPage,
  totalPages,
  onPageChange,
  total = 0,
  reviewStatistics,
}: ReviewListProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  if (reviews.length === 0) {
    return (
      <Box>
        <Typography
          sx={{
            fontSize: [18, 20, 24],
            fontWeight: 700,
            color: theme.palette.Black[300],
            marginBottom: "32px",
          }}
        >
          {t("리뷰")} ({total})
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "64px 0",
          }}
        >
          <Image
            src="/Images/empty/no_data.svg"
            alt="데이터 없음"
            width={110}
            height={82}
          />
          <Typography
            sx={{
              fontSize: [14, 16],
              color: theme.palette.Grayscale[300],
              marginTop: "24px",
            }}
          >
            {t("아직 등록된 리뷰가 없어요 !")}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          marginBottom: "40px",
        }}
      >
        <Typography
          sx={{
            fontSize: [18, 20, 24],
            fontWeight: 700,
            color: theme.palette.Black[300],
            marginBottom: "32px",
          }}
        >
          {t("리뷰")} ({total})
        </Typography>
        {reviewStatistics && <ReviewChart data={reviewStatistics} />}
      </Box>

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
