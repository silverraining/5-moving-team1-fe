"use client";
import { Box, Divider, Typography } from "@mui/material";
import { ReviewChart } from "@/src/components/shared/components/review/review-chart/ReviewChart";
import { ReviewList } from "@/src/components/shared/components/review/ReviewList";
//TODO: moverDetail 파일에서 더미데이터 import -> API연결 후 제거
import {
  mockReviewData,
  mockReviews,
  mockMoverData,
} from "@/src/components/mover/MoverDetail";
import { useTheme } from "@mui/material/styles";
import { MyPageProfileSection } from "@/src/components/mover/mypage/MyPageProfileSection";

export default function MyPage() {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" pt="32px">
      {/* 프로필 섹션 */}
      <MyPageProfileSection data={mockMoverData} />

      {/* 리뷰 섹션 */}
      <Box mb="40px" width="100%" maxWidth="1400px" px="24px">
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
      <Box width="100%" maxWidth="1400px" px="24px">
        <ReviewList reviews={mockReviews} itemsPerPage={5} />
      </Box>
    </Box>
  );
}
