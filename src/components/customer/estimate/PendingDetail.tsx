"use client";
import { Stack, Typography, Divider, Button, useTheme } from "@mui/material";
import { CardListMover } from "../../shared/components/card/CardListMover";
import { EstimateSection } from "./EstimateSection";
import { SnsShare } from "../../shared/components/sns-share/SnsShare";
import { EstimateInfo } from "./EstimateInfo";
import { useEstimateOfferPendingDetail } from "@/src/api/customer/hook";

export default function PendingDetail({
  requestId,
  moverId,
}: {
  requestId: string;
  moverId: string;
}) {
  const theme = useTheme();

  const handleLikeClick = () => {
    alert(`좋아요 버튼 누름`);
  };

  const handleConfirmEstimate = () => {
    alert(`확정하기 버튼`);
  };

  // 👉 실제 데이터 패칭
  const { data, isLoading, isError } = useEstimateOfferPendingDetail(
    requestId,
    moverId
  );

  if (isLoading) return <Typography>견적 데이터 로딩중...</Typography>;
  if (isError || !data)
    return <Typography>견적 데이터를 불러오는 데 실패했습니다.</Typography>;

  return (
    <Stack
      gap={"117px"}
      flexDirection={["column", "column", "row"]}
      justifyContent={"center"}
    >
      <Stack
        maxWidth={["1200px", "1200px", "955px"]}
        width={"100%"}
        gap={["24px", "24px", "40px"]}
      >
        {/* 견적 상세 */}
        <Stack gap={"24px"}>
          <EstimateSection title="견적 상세">
            <CardListMover data={data} onLikeClick={handleLikeClick} />
          </EstimateSection>
          <Divider sx={{ borderColor: theme.palette.Line[100] }} />

          {/* 태블릿 이하 SNS */}
          <Stack display={["flex", "flex", "none"]} gap={"24px"}>
            <SnsShare title="견적서 공유하기" />
            <Divider sx={{ borderColor: theme.palette.Line[100] }} />
          </Stack>
        </Stack>

        {/* 견적가 */}
        <EstimateSection title="견적가">
          <Typography variant="B_32">
            {(data.price ?? 0).toLocaleString()}원
          </Typography>
        </EstimateSection>
        <Divider sx={{ borderColor: theme.palette.Line[100] }} />

        {/* 견적 정보 */}
        <EstimateSection title="견적 정보">
          <EstimateInfo info={data} />
        </EstimateSection>
      </Stack>

      {/* 데스크탑 SNS */}
      <Stack
        display={["none", "none", "flex"]}
        marginTop={"72px"}
        gap={"40px"}
        width={"328px"}
      >
        {/* 견적 확정 버튼 */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleConfirmEstimate}
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

        <Divider />
        <SnsShare title="견적서 공유하기" />
      </Stack>
    </Stack>
  );
}
