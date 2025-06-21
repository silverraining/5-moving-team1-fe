"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { CardListMover } from "../shared/components/card/CardListMover";
import { ChipArea } from "../shared/components/chip/ChipArea";
import { ReviewChart } from "../shared/components/review/review-chart/ReviewChart";
import { SnsShare } from "../shared/components/sns-share/SnsShare";
import { CardData } from "@/src/types/card";
import { ReviewData, ReviewStatistics } from "@/src/types/common";
import { ReviewList } from "../shared/components/review/ReviewList";
import Image from "next/image";
import { useMoverDetail } from "@/src/api/mover/hooks";
import {
  convertToServiceTypeArray,
  convertToServiceRegionArray,
} from "@/src/utils/util";
import { convertEnglishToSido } from "@/src/utils/parseAddress";
import { useMoverReviews } from "@/src/api/review/hooks";
import { useRequestTargetedEstimate } from "@/src/api/mover/hooks";
import { NoEstimateModal } from "./NoEstimateModal";
import { useSnackbarStore } from "@/src/store/snackBarStore";
import { useCreateLike, useDeleteLike } from "../../api/like/hooks";

interface MoverDetailProps {
  moverId: string;
}

export const MoverDetail = ({ moverId }: MoverDetailProps) => {
  const theme = useTheme();
  const { data: moverData, isLoading } = useMoverDetail(moverId);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: reviewData } = useMoverReviews(moverId, currentPage, 5);
  const [isNoEstimateModalOpen, setIsNoEstimateModalOpen] = useState(false);
  const requestTargetedEstimate = useRequestTargetedEstimate();
  const { openSnackbar } = useSnackbarStore();
  const createLikeMutation = useCreateLike();
  const deleteLikeMutation = useDeleteLike();

  // 찜하기 버튼 클릭 핸들러
  const handleLikeClick = async () => {
    if (!moverData) return;

    try {
      if (isLiked) {
        await deleteLikeMutation.mutate({ moverId: moverData.id });
        setLikeCount((prev) => prev - 1); // 찜하기 취소 시 좋아요 수 감소
      } else {
        await createLikeMutation.mutate({ moverId: moverData.id });
        setLikeCount((prev) => prev + 1); // 찜하기 시 좋아요 수 증가
      }
      setIsLiked(!isLiked); // 찜하기 상태 업데이트
    } catch (error) {
      console.error("찜하기 처리 중 오류가 발생했습니다:", error);
    }
  };

  // 찜하기 상태 업데이트 훅
  useEffect(() => {
    if (moverData) {
      setIsLiked(moverData.isLiked);
      setLikeCount(moverData.likeCount);
    }
  }, [moverData]);

  // 지정 견적 요청 버튼 클릭 핸들러
  const handleEstimateRequest = () => {
    const authStorage = localStorage.getItem("auth-storage");
    const state = authStorage ? JSON.parse(authStorage).state : null;
    const pendingEstimateRequestId = state?.user?.pendingEstimateRequestId;

    if (!pendingEstimateRequestId) {
      setIsNoEstimateModalOpen(true);
      return;
    }

    requestTargetedEstimate.mutate(
      {
        requestId: pendingEstimateRequestId,
        moverProfileId: moverId,
      },
      {
        onSuccess: (response) => {
          openSnackbar(
            response.message || "지정 견적 요청이 완료되었습니다.",
            "success"
          );
        },
        onError: (error: any) => {
          openSnackbar(
            error.response?.data?.message || "지정 견적 요청에 실패했습니다.",
            "error"
          );
          console.error("Failed to request targeted estimate:", error);
        },
      }
    );
  };

  if (isLoading || !moverData) {
    return <div>Loading...</div>;
  }

  const reviewStatistics: ReviewStatistics = {
    average: reviewData?.rating.average || 0,
    score: reviewData?.rating.count || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
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

  const cardData: CardData = {
    types: convertToServiceTypeArray(moverData.serviceType),
    message: moverData.intro,
    imgSrc: moverData.imageUrl,
    name: moverData.nickname,
    isLiked: moverData.isLiked,
    like: likeCount,
    rating: moverData.averageRating,
    count: moverData.reviewCount,
    career: moverData.experience,
    confirm: moverData.confirmedEstimateCount,
    address: convertToServiceRegionArray(moverData.serviceRegion),
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
          {/* 최상단 기사 카드 섹션 */}
          <Box sx={{ paddingBottom: "40px", marginBottom: "40px" }}>
            <CardListMover
              data={{
                ...cardData,
                isLiked: isLiked,
              }}
              onLikeClick={handleLikeClick}
            />
          </Box>

          {/* 상세설명 섹션 */}
          <Box
            sx={{
              paddingBottom: "40px",
              marginBottom: "40px",
              borderBottom: `1px solid ${theme.palette.Line[100]}`,
            }}
          >
            <Typography
              sx={{
                fontSize: [18, 20, 24],
                fontWeight: 700,
                color: theme.palette.Black[300],
                marginBottom: "16px",
              }}
            >
              상세설명
            </Typography>
            <Typography
              sx={{
                fontSize: [14, 16, 18],
                lineHeight: ["22px", "24px", "26px"],
                color: theme.palette.Black[300],
                backgroundColor: "transparent",
                padding: 0,
              }}
            >
              {moverData.description}
            </Typography>
          </Box>

          {/* 제공 서비스 섹션 */}
          <Box
            sx={{
              paddingBottom: "40px",
              marginBottom: "40px",
              borderBottom: `1px solid ${theme.palette.Line[100]}`,
            }}
          >
            <Typography
              sx={{
                fontSize: [18, 20, 24],
                fontWeight: 700,
                color: theme.palette.Black[300],
                marginBottom: "16px",
              }}
            >
              제공 서비스
            </Typography>
            <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {convertToServiceTypeArray(moverData.serviceType).map((type) => (
                <ChipArea
                  key={type}
                  label={
                    type === "SMALL"
                      ? "소형이사"
                      : type === "HOME"
                        ? "가정이사"
                        : "사무실이사"
                  }
                  selected={true}
                  onClick={() => {}}
                />
              ))}
            </Box>
          </Box>

          {/* 서비스 가능 지역 섹션 */}
          <Box
            sx={{
              paddingBottom: "40px",
              marginBottom: "40px",
              borderBottom: `1px solid ${theme.palette.Line[100]}`,
            }}
          >
            <Typography
              sx={{
                fontSize: [18, 20, 24],
                fontWeight: 700,
                color: theme.palette.Black[300],
                marginBottom: "16px",
              }}
            >
              서비스 가능 지역
            </Typography>
            <Box sx={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {convertToServiceRegionArray(moverData.serviceRegion).map(
                (region) => (
                  <ChipArea
                    key={region}
                    label={convertEnglishToSido(region)}
                    selected={false}
                    onClick={() => {}}
                  />
                )
              )}
            </Box>
          </Box>

          {/* 리뷰 섹션 */}
          <ReviewList
            reviews={reviews}
            onPageChange={setCurrentPage}
            totalPages={Math.ceil((reviewData?.total || 0) / 5)}
            currentPage={currentPage}
            total={reviewData?.total || 0}
            reviewStatistics={reviewStatistics}
          />
        </Box>

        {/* 오른쪽 사이드바 */}
        <Box
          sx={{
            width: "320px",
            position: "sticky",
            top: "24px",
          }}
        >
          {/* 견적 요청 섹션 */}
          <Box
            sx={{
              paddingBottom: "32px",
              marginBottom: "32px",
              borderBottom: `1px solid ${theme.palette.Line[100]}`,
            }}
          >
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 600,
                color: theme.palette.Black[300],
                marginBottom: "20px",
                lineHeight: "28px",
              }}
            >
              {moverData.nickname} 기사님에게 지정 견적을 요청해보세요!
            </Typography>

            {/* 찜하기 버튼 */}
            <Button
              variant="outlined"
              fullWidth
              onClick={handleLikeClick}
              sx={{
                height: "48px",
                fontSize: 16,
                fontWeight: 600,
                backgroundColor: theme.palette.White[100],
                border: `1px solid ${theme.palette.Line[200]}`,
                color: theme.palette.Black[300],
                marginBottom: "24px",
                gap: "8px",
                "&:hover": {
                  backgroundColor: theme.palette.PrimaryBlue[100],
                  border: `1px solid ${theme.palette.Line[200]}`,
                },
              }}
            >
              <Image
                src={
                  isLiked ? "/Images/like/like.svg" : "/Images/like/unlike.svg"
                }
                alt="찜하기"
                width={20}
                height={20}
              />
              기사님 찜하기
            </Button>

            {/* 견적 요청 버튼 */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleEstimateRequest}
              sx={{
                height: "56px",
                fontSize: 16,
                fontWeight: 600,
                backgroundColor: theme.palette.PrimaryBlue[300],
                "&:hover": {
                  backgroundColor: theme.palette.PrimaryBlue[500],
                },
              }}
            >
              지정 견적 요청하기
            </Button>
          </Box>

          {/* SNS 공유 섹션 */}
          <SnsShare title="나만 알기엔 아까운 기사님인가요?" />
        </Box>
      </Box>
      <NoEstimateModal
        open={isNoEstimateModalOpen}
        onClose={() => setIsNoEstimateModalOpen(false)}
      />
    </Box>
  );
};
