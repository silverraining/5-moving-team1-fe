"use client";
import { Box } from "@mui/material";
import { MyPageProfileSection } from "@/src/components/mover/mypage/MyPageProfileSection";
import { ReviewSection } from "@/src/components/mover/mypage/ReviewSection";
import { useMoverMypage } from "@/src/api/mover/hooks";

export default function MyPage() {
  const { data: moverProfileCardData, isPending } = useMoverMypage();

  if (isPending || !moverProfileCardData) return <div>로딩중입니다...</div>; //TODO: 스켈레톤 추가

  return (
    <Box
      sx={{
        maxWidth: "1600px",
        margin: "0 auto",
        padding: "24px 16px",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      {/* 프로필 섹션 */}
      <Box sx={{ paddingBottom: "40px", marginBottom: "40px" }}>
        <MyPageProfileSection data={moverProfileCardData} />
      </Box>

      {/* 리뷰 섹션 */}
      {moverProfileCardData.id && (
        <ReviewSection moverId={moverProfileCardData.id} />
      )}
    </Box>
  );
}
