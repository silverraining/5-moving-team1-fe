"use client";

import { Typography, Stack } from "@mui/material";
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

interface HistoryEstimateCardDataWithId extends HistoryEstimateCardData {
  moverId: string;
  offerId: string;
}

export default function HistoryEstimate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: createLikeMutate } = useCreateLike();
  const { mutate: deleteLikeMutate } = useDeleteLike();
  const { data, isLoading, isError } = useEstimateRequestHistory();

  const sortOptions: SortOption[] = [
    { label: "전체", value: "all" },
    { label: "확정한 견적서", value: "COMPLETED" },
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
  if (!Array.isArray(data?.items) || data.items.length === 0)
    return <EmprtyReview text="대기중인 견적이 없습니다" />;

  return (
    <Stack
      padding={["0px 0px", "0px 72px", "0px 260px"]}
      sx={(theme) => ({
        backgroundColor: theme.palette.Background[100],
        borderColor: theme.palette.Line[100],
      })}
    >
      <Stack marginTop={["0px", "32px", "64px"]}>
        {data.items.map((info: EstimateRequestHistoryItem, index) => {
          const selectedSort = filterMap[info.requestId]?.value || "all";

          const filteredOffers =
            selectedSort === "COMPLETED"
              ? info.estimateOffers?.filter(
                  (offer) => offer.offerStatus === "COMPLETED"
                )
              : info.estimateOffers;

          if (!info.estimateOffers || info.estimateOffers.length === 0)
            return null;

          return (
            <Stack
              key={index}
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
              {/* 견적 정보 */}
              <EstimateSection title="견적 정보">
                <EstimateInfo info={info.estimateOffers[0]} />
              </EstimateSection>

              {/* 견적서 목록 */}
              <EstimateSection title="견적서 목록">
                <Dropdown
                  options={sortOptions}
                  onChange={(option) =>
                    handleFilterChange(info.requestId, option)
                  }
                />

                {filteredOffers && filteredOffers.length > 0 ? (
                  <Stack gap={"56px"}>
                    {filteredOffers.map(
                      (card: HistoryEstimateCardDataWithId, idx) => (
                        <Stack
                          key={idx}
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
                    해당 조건의 견적서가 없습니다.
                  </Typography>
                )}
              </EstimateSection>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
