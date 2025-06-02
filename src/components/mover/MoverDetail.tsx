"use client";
import React, { useState } from "react";
import { Box, Typography, useTheme, Stack, Button } from "@mui/material";
import { CardListMover } from "../shared/components/card/CardListMover";
import { ChipArea } from "../shared/components/chip/ChipArea";
import { ReviewChart } from "../shared/components/review-chart/ReviewChart";
import { SnsShare } from "../shared/components/sns-share/SnsShare";
import { CardData } from "@/src/types/card";
import { ReviewData, ReviewStatistics } from "@/src/types/common";
import { ReviewList } from "../shared/components/review/ReviewList";
import Image from "next/image";

interface MoverDetailProps {
  moverId: string;
}

// 임시 데이터 - 실제로는 API에서 가져올 데이터
const mockMoverData: CardData = {
  types: ["small", "home"],
  message: "고객님의 물품을 안전하게 운송해드립니다.",
  imgSrc: "/Images/profile/maleProfile.svg",
  name: "김코드",
  isLiked: false,
  like: 136,
  rating: 5.0,
  count: 178,
  career: 7,
  confirm: 3341,
  address: ["서울", "경기"],
};

const mockReviewData: ReviewStatistics = {
  average: 5.0,
  score: { 1: 0, 2: 0, 3: 0, 4: 8, 5: 170 },
  max: 170,
};

const mockReviews: ReviewData[] = [
  {
    id: 1,
    author: "kjm****",
    date: "2024-07-01",
    rating: 5,
    content: "너무 좋은 서비스 감사합니다!",
  },
  {
    id: 2,
    author: "kjm****",
    date: "2024-07-01",
    rating: 5,
    content: "기사님 너무 좋아요!",
  },
  {
    id: 3,
    author: "kjm****",
    date: "2024-07-01",
    rating: 5,
    content: "지인들에게 추천하고 싶은 기사님!",
  },
  {
    id: 4,
    author: "kjm****",
    date: "2024-07-01",
    rating: 4,
    content: "친절하시고 신속하게 도와주셔서 감사합니다!",
  },
  {
    id: 5,
    author: "kjm****",
    date: "2024-07-01",
    rating: 3,
    content: "무난합니다.",
  },
];

export const MoverDetail = ({ moverId }: MoverDetailProps) => {
  const theme = useTheme();
  const [selectedAreas, setSelectedAreas] = useState<string[]>(["서울"]);
  const [isLiked, setIsLiked] = useState(false);

  const handleAreaClick = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area)
        ? prev.filter((item) => item !== area)
        : [...prev, area]
    );
  };

  const handleServiceClick = (service: string) => {
    // 서비스 선택 로직
    console.log(`${service} 서비스 선택`);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleQuoteRequest = () => {
    // 견적 요청 로직
    console.log("견적 요청하기");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, index) => (
      <Image
        key={index}
        src="/Images/star/star_active.svg"
        alt="별점"
        width={16}
        height={16}
      />
    ));
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
      {/* 메인 컨텐츠 영역 */}
      <Box
        sx={{
          display: "flex",
          gap: "64px",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {/* 왼쪽 메인 컨텐츠 */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* 최상단 기사 카드 섹션 */}
          <Box sx={{ paddingBottom: "40px", marginBottom: "40px" }}>
            <CardListMover data={mockMoverData} />
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
              안녕하세요. 이사업계 경력 7년으로 안전한 이사를 도와드리는
              김코드입니다. 고객님의 물품을 소중하고 안전하게 운송하여 드립니다.
              소형이사 및 가정이사 서비스를 제공하며 서비스 가능 지역은 서울과
              경기권입니다.
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
              <ChipArea
                label="소형이사"
                selected={true}
                onClick={() => handleServiceClick("소형이사")}
              />
              <ChipArea
                label="가정이사"
                selected={true}
                onClick={() => handleServiceClick("가정이사")}
              />
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
              <ChipArea
                label="서울"
                selected={selectedAreas.includes("서울")}
                onClick={() => handleAreaClick("서울")}
              />
              <ChipArea
                label="경기"
                selected={selectedAreas.includes("경기")}
                onClick={() => handleAreaClick("경기")}
              />
            </Box>
          </Box>

          {/* 리뷰 섹션 */}
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
              리뷰 (178)
            </Typography>
            <ReviewChart data={mockReviewData} />
          </Box>

          {/* 댓글 섹션 */}
          <ReviewList reviews={mockReviews} />
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
              김코드 기사님에게 지정 견적을 요청해보세요!
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
              onClick={handleQuoteRequest}
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
    </Box>
  );
};
