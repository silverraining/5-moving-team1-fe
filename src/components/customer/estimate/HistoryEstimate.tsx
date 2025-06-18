"use client";
import { Typography, Stack } from "@mui/material";
import { EstimateInfo } from "./EstimateInfo";
import { CardListCost } from "../../shared/components/card/CardListCost";
import Dropdown, { SortOption } from "./Dropdown";
import { useState } from "react";
import { EstimateSection } from "./EstimateSection";
import { useEstimateRequestList } from "@/src/api/customer/hook"; // 훅 import
import { EstimateOffer, EstimateRequest } from "@/src/types/estimate";

export default function HistoryEstimate() {
  const sortOption = [
    { label: "전체", value: "all" },
    { label: "확정한 견적서", value: "complete" },
  ];
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOption[0]);

  const handleOptionChange = (option: SortOption) => {
    setSelectedSort(option);
  };

  // 좋아요 토글
  const handleLikeClick = () => {
    alert(`좋아요 버튼 누름`);
  };

  const { data, isLoading, isError } = useEstimateRequestList();

  if (isLoading) return <Typography>로딩 중...</Typography>;
  if (isError) return <Typography>에러가 발생했습니다.</Typography>;
  if (!data?.items || data.items.length === 0)
    return <Typography>견적 요청이 없습니다.</Typography>;

  return (
    <Stack
      padding={["0px 0px", "0px 72px", "0px 260px"]}
      sx={(theme) => ({
        backgroundColor: theme.palette.Background[100],
        borderColor: theme.palette.Line[100],
      })}
    >
      <Stack marginTop={["0px", "32px", "64px"]}>
        {data.items.map((info: EstimateRequest) =>
          !info.estimateOffers || info.estimateOffers.length === 0 ? null : (
            <Stack
              padding={["48px 40px"]}
              margin={"0px 0px 32px 0px"}
              borderRadius={["0px", "24px", "48px"]}
              border={"0.5px solid"}
              gap={"48px"}
              key={info.id}
              sx={(theme) => ({
                backgroundColor: theme.palette.White[100],
                borderColor: theme.palette.Line[100],
              })}
            >
              {/* 견적 정보 */}
              <EstimateSection title="견적 정보">
                <EstimateInfo info={info.estimateOffers[0]} />
              </EstimateSection>

              {/*  견적 목록 */}
              <EstimateSection title="견적서 목록">
                <Dropdown options={sortOption} onChange={handleOptionChange} />
                <Stack gap={"56px"}>
                  {info.estimateOffers.map(
                    (card: EstimateOffer, idx: number) => (
                      <Stack
                        key={idx}
                        onClick={() =>
                          alert(
                            `견적서 아이디 ${card.estimateRequestId}  기사 아이디 ${card.moverId}`
                          )
                        }
                      >
                        {/* 카드 정보 */}
                        <CardListCost
                          data={card}
                          onLikeClick={handleLikeClick}
                        />
                      </Stack>
                    )
                  )}
                </Stack>
              </EstimateSection>
            </Stack>
          )
        )}
      </Stack>
    </Stack>
  );
}
