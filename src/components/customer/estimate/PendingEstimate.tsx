"use client";
import { Grid, Typography } from "@mui/material";
import {
  CardListWait,
  CardListWaitSkeleton,
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
import { EmprtyReview } from "../../review/EmptyReview";
import { useTranslation } from "react-i18next";

// 견적서 카드 데이터에 ID 추가
interface PendingEstimateCardDataWithId extends PendingEstimateCardData {
  moverId: string;
  offerId: string;
}

export default function PendingEstimate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
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

  if (error || errorIds)
    return <Typography>견적서 데이터 에러 발생!</Typography>;

  if (isLoading) {
    return <EmprtyReview text={t("로딩 중 입니다")} />;
  }

  if (!data || data.items.length === 0) {
    return <EmprtyReview text={t("대기중인 견적이 없습니다")} />;
  }

  const handleDetailClick = (card: PendingEstimateCardDataWithId) => () => {
    router.push(PATH.userEstimateDetail(card.estimateRequestId, card.moverId));
  };

  const handleLikeClick = (card: PendingEstimateCardDataWithId) => () => {
    const moverId = card.moverId;
    if (card.mover.isLiked) {
      deleteLikeMutate(
        { moverId },
        {
          onSuccess: () =>
            queryClient.invalidateQueries({
              queryKey: ["EstimateOfferPending"],
            }),
        }
      );
    } else {
      createLikeMutate(
        { moverId },
        {
          onSuccess: () =>
            queryClient.invalidateQueries({
              queryKey: ["EstimateOfferPending"],
            }),
        }
      );
    }
  };

  const handleConfirmClick = (card: PendingEstimateCardDataWithId) => () => {
    EstimateOfferConfirmedMutate(
      { offerId: card.offerId },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ["EstimateOfferPending"] }),
      }
    );
  };

  // 실제 데이터 렌더링
  return (
    <Grid container spacing={2} py={[3, 4, 5]}>
      {isLoading || isLoadingIds
        ? [...Array(6)].map((_, i) => (
            <Grid
              key={i}
              size={[12, 12, 6]}
              display={"flex"}
              sx={{ justifyContent: "center" }}
            >
              <CardListWaitSkeleton />
            </Grid>
          ))
        : data?.items.map((card: PendingEstimateCardDataWithId, index) => (
            <Grid
              key={index}
              size={[12, 12, 6]}
              display={"flex"}
              sx={{ justifyContent: "center" }}
            >
              <CardListWait
                data={card}
                onDetailClick={handleDetailClick(card)}
                onLikeClick={handleLikeClick(card)}
                onConfirmClick={handleConfirmClick(card)}
              />
            </Grid>
          ))}
    </Grid>
  );
}
