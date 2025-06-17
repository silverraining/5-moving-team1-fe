"use client";
import { Grid, Typography } from "@mui/material";
import { CardListWait } from "@/src/components/shared/components/card/CardListWait";
import {
  useEstimateOfferPending,
  useEstimateRequestActive,
} from "@/src/api/customer/hook";
import { EstimateOffer } from "@/src/types/estimate";

export default function PendingEstimate() {
  // 1. ID 배열 받아오기
  const {
    data: requestIds,
    isLoading: isLoadingIds,
    error: errorIds,
  } = useEstimateRequestActive();

  // 2. 첫 번째 ID만 사용(여러 개라면 map 돌려도 됨)
  const requestId = requestIds?.[0]?.estimateRequestId;

  // 3. 해당 ID로 견적서 리스트 받아오기
  const { data, isLoading, error } = useEstimateOfferPending(requestId);

  if (isLoadingIds) return <Typography>견적서 데이터 로딩중...</Typography>;
  if (errorIds) return <Typography>견적서 데이터 에러 발생!</Typography>;
  if (isLoading) return <Typography>견적서 데이터 로딩중...</Typography>;
  if (error) return <Typography>견적서 데이터 에러 발생!</Typography>;
  if (!data?.items || !Array.isArray(data?.items) || data?.items.length === 0)
    return <Typography>견적 데이터 없음</Typography>;

  // 4. 실제 데이터 렌더링
  return (
    <Grid container spacing={2}>
      {data.items.map((card: EstimateOffer, index) => (
        <Grid
          key={index}
          size={[12, 12, 6]}
          display={"flex"}
          sx={{ justifyContent: "center" }}
        >
          <CardListWait
            data={card}
            onDetailClick={() => alert(`상세보기 버튼 누름`)}
            onLikeClick={() => alert(`좋아요 버튼 누름`)}
            onConfirmClick={() => alert(`견적을 선택 완료했습니다!`)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
