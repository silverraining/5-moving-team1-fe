"use client";

import React, { useState } from "react";
import { useLikeList } from "@/src/api/like/hooks";
import {
  CardListSave,
  CardListSaveSkeleton,
} from "@/src/components/shared/components/card/CardListSave";
import { likeMoverListResItem } from "@/src/types/card";
import {
  EstimateOfferStatus,
  EstimateRequestStatus,
  ServiceType,
} from "@/src/types/common";
import { EstimateOffer } from "@/src/types/estimate";
import { Stack, Box, Typography, useTheme } from "@mui/material";
import { ReviewChart } from "@/src/components/shared/components/review-chart/ReviewChart";
import { ReviewList } from "@/src/components/shared/components/review/ReviewList";
import { ReviewData, ReviewStatistics } from "@/src/types/common";
import { useMoverReviews } from "@/src/api/review/hooks";

const Wishlist = () => {
  const theme = useTheme();
  const { data, isLoading } = useLikeList();
  const [selectedMoverId, setSelectedMoverId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 선택된 기사님의 리뷰 데이터 가져오기
  const { data: reviewData } = useMoverReviews(
    selectedMoverId || "",
    currentPage,
    5
  );

  const transformLikeMoverToEstimateOffer = (
    item: likeMoverListResItem
  ): EstimateOffer => {
    return {
      estimateRequestId: "",
      moverId: item.id,
      price: 0,
      comment: "",
      status: EstimateOfferStatus.REQUESTED,
      requestStatus: EstimateRequestStatus.PENDING,
      confirmedCount: item.confirmed_estimate_count,
      isTargeted: false,
      isConfirmed: false,
      confirmedAt: undefined,
      completedAt: undefined,
      createdAt: new Date(),
      moveDate: new Date(),
      updatedAt: new Date(),
      moveType: "HOME",
      estimateRequest: undefined as any,
      mover: {
        id: item.id,
        nickname: item.nickname,
        imageUrl: item.imageUrl,
        experience: item.experience,
        serviceType: Object.keys(item.serviceType).filter(
          (key) => item.serviceType[key as keyof typeof item.serviceType]
        ) as ServiceType[],
        reviewCount: item.review_count,
        averageRating: item.average_rating,
        likeCount: item.likeCount,
        userId: "",
        intro: "",
        rating: 0,
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        confirmedCount: 0,
        serviceRegion: [],
        isLiked: true,
      },
      review: undefined as any,
      fromAddress: undefined as any,
      toAddress: undefined as any,
      fromAddressMinimal: undefined as any,
      toAddressMinimal: undefined as any,
    };
  };

  const transformedData = data
    ? data.map((item) => transformLikeMoverToEstimateOffer(item))
    : [];

  // 리뷰 통계 데이터 생성
  const reviewStatistics: ReviewStatistics = {
    average: reviewData?.rating.average || 0,
    score: reviewData?.rating.count || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    max: Math.max(
      ...Object.values(
        reviewData?.rating.count || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      )
    ),
  };

  // 리뷰 데이터 변환
  const reviews: ReviewData[] =
    reviewData?.reviews.map((review) => ({
      id: Math.random(), // 임시 ID 생성
      author: review.customerName,
      date: review.createdAt,
      rating: review.rating,
      content: review.comment,
    })) || [];

  // 기사님 카드 클릭 핸들러
  const handleMoverCardClick = (moverId: string) => {
    setSelectedMoverId(moverId);
    setCurrentPage(1); // 페이지 초기화
  };

  return (
    <Box sx={{ maxWidth: "1400px", margin: "0 auto", padding: "24px 16px" }}>
      {/* 메인 컨텐츠 영역 */}
      <Box
        sx={{
          display: "flex",
          gap: "96px",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {/* 왼쪽 메인 컨텐츠 */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* 찜한 기사님 목록 섹션 */}
          <Box sx={{ paddingBottom: "40px", marginBottom: "40px" }}>
            <Typography
              sx={{
                fontSize: [18, 20, 24],
                fontWeight: 700,
                color: theme.palette.Black[300],
                marginBottom: "24px",
              }}
            >
              찜한 기사님 목록
            </Typography>

            <Stack
              direction="row"
              flexWrap="wrap"
              sx={{
                rowGap: ["24px", "32px", "48px"],
                columnGap: "24px",
              }}
              justifyContent="center"
            >
              {isLoading
                ? Array.from({ length: 20 }).map((_, idx) => (
                    <Stack key={idx}>
                      <CardListSaveSkeleton />
                    </Stack>
                  ))
                : transformedData?.map((mover, idx: number) => (
                    <Stack key={idx}>
                      <CardListSave
                        data={mover}
                        onClick={() => handleMoverCardClick(mover.moverId)}
                      />
                    </Stack>
                  ))}
            </Stack>
          </Box>

          {/* 선택된 기사님의 리뷰 섹션 */}
          {selectedMoverId && (
            <Box
              sx={{
                paddingTop: "40px",
                borderTop: `1px solid ${theme.palette.Line[100]}`,
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
                리뷰 ({reviewData?.total || 0})
              </Typography>

              {/* 리뷰 차트 */}
              <Box sx={{ marginBottom: "40px" }}>
                <ReviewChart data={reviewStatistics} />
              </Box>

              {/* 리뷰 목록 */}
              <ReviewList
                reviews={reviews}
                onPageChange={setCurrentPage}
                totalPages={Math.ceil((reviewData?.total || 0) / 5)}
                currentPage={currentPage}
              />
            </Box>
          )}
        </Box>

        {/* 오른쪽 사이드바 */}
        <Box
          sx={{
            width: "320px",
            position: "sticky",
            top: "24px",
          }}
        >
          {/* 안내 메시지 */}
          <Box
            sx={{
              padding: "24px",
              backgroundColor: theme.palette.Grayscale[50],
              borderRadius: "12px",
              border: `1px solid ${theme.palette.Line[100]}`,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: theme.palette.Black[300],
                marginBottom: "12px",
              }}
            >
              💡 팁
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: theme.palette.Grayscale[300],
              }}
            >
              기사님 카드를 클릭하면 해당 기사님의 리뷰를 확인할 수 있습니다.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Wishlist;
