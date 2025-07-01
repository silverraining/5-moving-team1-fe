"use client";
import { Box, Grid, Stack, Typography } from "@mui/material";
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
import { EmptyReview } from "../../review/EmptyReview";
import { useTranslation } from "react-i18next";
import { useInfiniteScroll } from "@/src/hooks/useInfiniteScroll";
import {
  EstimateRequestCard,
  EstimateRequestCardSkeleton,
} from "./EstimateRequestCard";

interface PendingEstimateCardDataWithId extends PendingEstimateCardData {
  moverId: string;
  offerId: string;
}

export default function PendingEstimate() {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();

  // 견적서 요청 ID 리스트 가져오기
  const {
    data: requestIds,
    isLoading: isLoadingIds,
    isError: errorIds,
  } = useEstimateRequestActive();

  // 첫 번째 requestId만 사용 (복수라면 map/탭 등으로 UI 확장)
  const requestId = requestIds?.[0]?.requestId ?? "";

  // 무한스크롤용 훅
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEstimateOfferPending(requestId);

  // 모든 pages를 펼쳐 하나의 items 배열로
  const items =
    data?.pages.flatMap((page) =>
      Array.isArray(page.items) ? page.items : []
    ) ?? [];

  // Intersection Observer로 스크롤 감지
  const { loadMoreRef } = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // 좋아요 관련 훅
  const { mutate: createLikeMutate } = useCreateLike();
  const { mutate: deleteLikeMutate } = useDeleteLike();

  // 견적 확정하기 훅
  const { mutate: EstimateOfferConfirmedMutate } = useEstimateOfferConfirmed();

  // 첫 번째 ID만 사용(여러 개라면 map 돌려도 됨)
  // const requestId = requestIds?.[0]?.requestId;

  console.log(data);
  // 해당 ID로 견적서 리스트 받아오기
  if (isLoading || isLoadingIds) {
    return (
      <Stack display={"flex"} flexDirection={"column"} py={3}>
        <Stack spacing={2} pb={3}>
          <Typography variant="SB_24">견적 요청 정보</Typography>
          <EstimateRequestCardSkeleton />
          <Typography variant="SB_24">받은 견적</Typography>
          <Grid container spacing={2} py={[3, 4, 5]}>
            {[...Array(6)].map((_, i) => (
              <Grid
                key={i}
                size={[12, 12, 6]}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CardListWaitSkeleton />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    );
  }
  if (errorIds) return <Typography>견적서 데이터 에러 발생!</Typography>;
  if (!requestId && !data) {
    return <EmptyReview text={t("요청된 견적이 없습니다.")} />;
  }
  if (data?.pages.length === 0) {
    return <EmptyReview text={t("대기중인 견적이 없습니다.")} />;
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
              queryKey: ["EstimateOfferPendingInfinite"],
            }),
        }
      );
    } else {
      createLikeMutate(
        { moverId },
        {
          onSuccess: () =>
            queryClient.invalidateQueries({
              queryKey: ["EstimateOfferPendingInfinite"],
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
          queryClient.invalidateQueries({
            queryKey: ["EstimateOfferPendingInfinite"],
          }),
      }
    );
  };

  if (isLoading || isLoadingIds) return <CardListWaitSkeleton />;
  if (isError || errorIds)
    return <EmptyReview text="대기중인 견적이 없습니다" />;
  if (!items || items.length === 0)
    return <EmptyReview text="대기중인 견적이 없습니다" />;

  // 실제 카드 리스트 렌더링 및 무한스크롤 ref 달기
  return (
    <Stack display={"flex"} flexDirection={"column"} py={3}>
      <Stack spacing={2} pb={3}>
        <Typography variant="SB_24">견적 요청 정보</Typography>

        <EstimateRequestCard requestData={requestIds[0]} />
      </Stack>
      <Typography variant="SB_24">받은 견적</Typography>
      <Grid container spacing={2} py={[3, 4, 5]}>
        {items.map((card: PendingEstimateCardDataWithId, index) => (
          <Grid
            key={card.offerId ?? index}
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

        <Box ref={loadMoreRef} style={{ height: 1 }} />

        {isFetchingNextPage && (
          <Typography align="center" sx={{ py: 4 }}>
            더 불러오는 중...
          </Typography>
        )}
      </Grid>
    </Stack>
  );
}
