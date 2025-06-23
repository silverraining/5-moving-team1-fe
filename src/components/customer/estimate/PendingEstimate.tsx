"use client";
import { Grid, Typography } from "@mui/material";
import {
  CardListWait,
  PendingEstimateCardData,
} from "@/src/components/shared/components/card/CardListWait";
import {
  useEstimateOfferConfirmed,
  useEstimateOfferPending,
  useEstimateRequestActive,
} from "@/src/api/customer/hook";
import { useRouter } from "next/navigation";
import { PATH } from "@/src/lib/constants";
import { useCreateLike, useDeleteLike } from "@/src/api/like/hooks";
import { useQueryClient } from "@tanstack/react-query";

// 견적서 카드 데이터에 ID 추가
interface PendingEstimateCardDataWithId extends PendingEstimateCardData {
  moverId: string;
  offerId: string;
}

export default function PendingEstimate() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // ID 배열 받아오기
  const {
    data: requestIds,
    isLoading: isLoadingIds,
    error: errorIds,
  } = useEstimateRequestActive();

  // 좋아요 관련 훅
  const { mutate: createLikeMutate } = useCreateLike();
  const { mutate: deleteLikeMutate } = useDeleteLike();

  // 견적 확정하기 훅
  const { mutate: EstimateOfferConfirmedMutate } = useEstimateOfferConfirmed();

  // 첫 번째 ID만 사용(여러 개라면 map 돌려도 됨)
  const requestId = requestIds?.[0]?.estimateRequestId;

  // 해당 ID로 견적서 리스트 받아오기
  const { data, isLoading, error } = useEstimateOfferPending(requestId);

  if (isLoadingIds) return <Typography>견적서 데이터 로딩중...</Typography>;
  if (errorIds) return <Typography>견적서 데이터 에러 발생!</Typography>;
  if (isLoading) return <Typography>견적서 데이터 로딩중...</Typography>;
  if (error) return <Typography>견적서 데이터 에러 발생!</Typography>;
  if (!data?.items || !Array.isArray(data?.items) || data?.items.length === 0)
    return <Typography>견적 데이터 없음</Typography>;

  // 실제 데이터 렌더링
  return (
    <Grid container spacing={2}>
      {data.items.map((card: PendingEstimateCardDataWithId, index) => (
        <Grid
          key={index}
          size={[12, 12, 6]}
          display={"flex"}
          sx={{ justifyContent: "center" }}
        >
          <CardListWait
            data={card}
            onDetailClick={() =>
              router.push(
                `${PATH.userEstimateDetail(card.estimateRequestId)}?moverId=${card.moverId}`
              )
            }
            onLikeClick={() => {
              const moverId = card.moverId;
              if (card.mover.isLiked) {
                deleteLikeMutate(
                  { moverId },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["EstimateOfferPending"],
                      });
                    },
                  }
                );
              } else {
                createLikeMutate(
                  { moverId },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["EstimateOfferPending"],
                      });
                    },
                  }
                );
              }
            }}
            onConfirmClick={() => {
              const offerId = card.offerId;
              EstimateOfferConfirmedMutate(
                { offerId },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ["EstimateOfferPending"],
                    });
                  },
                }
              );
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
