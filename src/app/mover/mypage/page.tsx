"use client";
import { Box, Divider, Typography } from "@mui/material";
import { ReviewChart } from "@/src/components/shared/components/review-chart/ReviewChart";
import { ReviewList } from "@/src/components/shared/components/review/ReviewList";
//moverDetail 파일에서 더미데이터 import -> API연결 후 제거
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
    <Box display="flex" justifyContent="center" pt="32px">
      <Box width="100%" maxWidth="1400px" px="24px">
        <Box mb="32px">
          <Typography variant="SB_24">마이페이지</Typography>
        </Box>
        {/* 프로필 섹션 */}
        <MyPageProfileSection data={mockMoverData} />

        {/* Divider */}
        <Divider
          sx={{
            width: "100%",
            maxWidth: "1400px",
            borderColor: `${theme.palette.Line[100]}`,
            borderWidth: "1px",
            mb: "32px",
          }}
        />

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
        <ReviewList reviews={mockReviews} itemsPerPage={5} />
      </Box>
    </Box>
  );
}
