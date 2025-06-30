"use client";

import { Typography, Stack, Box } from "@mui/material";
import { EstimateInfo } from "./EstimateInfo";
import {
  HistoryEstimateCardData,
  CardListCost,
} from "../../shared/components/card/CardListCost";
import Dropdown, { SortOption } from "./Dropdown";
import { useState } from "react";
import { EstimateSection } from "./EstimateSection";
import { useEstimateRequestHistory } from "@/src/api/customer/hook";
import { useRouter } from "next/navigation";
import { PATH } from "@/src/lib/constants";
import { useCreateLike, useDeleteLike } from "@/src/api/like/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { EstimateRequestHistoryItem } from "@/src/api/customer/api";
import { EmprtyReview } from "../../review/EmptyReview";
import { useInfiniteScroll } from "@/src/hooks/useInfiniteScroll";
import { useTranslation } from "react-i18next";

interface HistoryEstimateCardDataWithId extends HistoryEstimateCardData {
  moverId: string;
  offerId: string;
}

export default function HistoryEstimate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: createLikeMutate } = useCreateLike();
  const { mutate: deleteLikeMutate } = useDeleteLike();
  const { t } = useTranslation();
  // 무한스크롤 Query 사용
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEstimateRequestHistory();

  // 무한스크롤: 데이터 펼치기
  const items =
    data?.pages.flatMap((page) =>
      Array.isArray(page.items) ? page.items : []
    ) ?? [];

  // 무한스크롤: 마지막 카드 ref 연결
  const { loadMoreRef } = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // 정렬 옵션
  const sortOptions: SortOption[] = [
    { label: "전체", value: "all" },
    { label: "확정한 견적서", value: "CONFIRMED" },
  ];

  // 각 requestId별로 필터 상태를 관리
  const [filterMap, setFilterMap] = useState<Record<string, SortOption>>({});

  const handleFilterChange = (requestId: string, option: SortOption) => {
    setFilterMap((prev) => ({
      ...prev,
      [requestId]: option,
    }));
  };

  if (isLoading) return <Typography>로딩 중...</Typography>;
  if (isError) return <EmprtyReview text="대기중인 견적이 없습니다" />;
  if (!items || items.length === 0)
    return <EmprtyReview text="대기중인 견적이 없습니다" />;

  console.log(
    "hasNextPage",
    hasNextPage,
    "isFetchingNextPage",
    isFetchingNextPage
  );

  return (
    <Stack
      padding={["0px 0px", "0px 72px", "0px 260px"]}
      sx={(theme) => ({
        borderColor: theme.palette.Line[100],
      })}
    >
      <Stack marginTop={["0px", "32px", "64px"]}>
        {items.map((info: EstimateRequestHistoryItem) => {
          const selectedSort = filterMap[info.requestId]?.value || "all";
          const filteredOffers =
            selectedSort === "CONFIRMED"
              ? info.estimateOffers?.filter(
                  (offer) => offer.offerStatus === "CONFIRMED"
                )
              : info.estimateOffers;

          if (!info.estimateOffers || info.estimateOffers.length === 0)
            return null;

          return (
            <Stack
              key={info.requestId}
              padding={["48px 40px"]}
              margin={"0px 0px 32px 0px"}
              borderRadius={["0px", "24px", "48px"]}
              border={"0.5px solid"}
              gap={"48px"}
              sx={(theme) => ({
                backgroundColor: theme.palette.White[100],
                borderColor: theme.palette.Line[100],
              })}
            >
              <EstimateSection title={t("견적 정보")}>
                <EstimateInfo info={info.estimateOffers[0]} />
              </EstimateSection>

              <EstimateSection title={t("견적서 목록")}>
                <Dropdown
                  options={sortOptions}
                  onChange={(option) =>
                    handleFilterChange(info.requestId, option)
                  }
                />
                {filteredOffers && filteredOffers.length > 0 ? (
                  <Stack gap={"56px"}>
                    {filteredOffers.map(
                      (card: HistoryEstimateCardDataWithId) => (
                        <Stack
                          key={card.offerId}
                          onClick={() => {
                            router.push(
                              `${PATH.userEstimateHistoryDetail(
                                card.estimateRequestId
                              )}?moverId=${card.moverId}`
                            );
                          }}
                          sx={{
                            cursor: "pointer",
                            "&:hover": {
                              boxShadow:
                                "2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24",
                            },
                          }}
                        >
                          <CardListCost
                            data={card}
                            onLikeClick={
                              ((e: React.MouseEvent) => {
                                e.stopPropagation();

                                const moverId = card.moverId;
                                const handler = () => {
                                  if (card.mover.isLiked) {
                                    deleteLikeMutate(
                                      { moverId },
                                      {
                                        onSuccess: () => {
                                          queryClient.invalidateQueries({
                                            queryKey: [
                                              "EstimateRequestHistory",
                                            ],
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
                                            queryKey: [
                                              "EstimateRequestHistory",
                                            ],
                                          });
                                        },
                                      }
                                    );
                                  }
                                };

                                handler();
                              }) as unknown as () => void
                            }
                          />
                        </Stack>
                      )
                    )}
                  </Stack>
                ) : (
                  <Typography
                    sx={(theme) => ({
                      fontSize: 14,
                      color: theme.palette.Grayscale[400],
                      paddingTop: "16px",
                    })}
                  >
                    {t("해당 조건의 견적서가 없습니다.")}
                  </Typography>
                )}
              </EstimateSection>
            </Stack>
          );
        })}

        <Box ref={loadMoreRef} style={{ height: 1 }} />

        {isFetchingNextPage && (
          <Typography align="center" sx={{ py: 4 }}>
            더 불러오는 중...
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
