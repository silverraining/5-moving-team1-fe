"use client";
import { EstimateRequest } from "@/src/types/card";
import { Typography, Stack, Box } from "@mui/material";
import { EstimateInfo } from "./EstimateInfo";
import { CardListCost } from "../../shared/components/card/CardListCost";
import Dropdown, { SortOption } from "./Dropdown";
import { useState } from "react";
import { EstimateSection } from "./EstimateSection";

export default function ReceiveEstimate() {
  const sortOption = [
    { label: "전체", value: "all" },
    { label: "확정한 견적서", value: "complete" },
  ];
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOption[0]);

  const handleOptionChange = (option: SortOption) => {
    setSelectedSort(option);
  };

  // 임시로 넣은 좋아요 토글
  const handleLikeClick = () => {
    alert(`좋아요 버튼 누름`);
  };
  // 옵션 목록

  const mockCardList: EstimateRequest[] = [
    {
      types: ["small", "home"],
      id: "req-1",
      date: "2024-06-01",
      movingDay: "2024-07-05",
      from: "서울특별시 강남구 삼성동 123-45",
      to: "경기도 성남시 분당구 정자동 101-5",
      estimateList: [
        {
          types: ["small", "wait"],
          message: "1톤 트럭 + 기사님 1명, 포장 포함",
          imgSrc: "/Images/profile/maleProfile.svg",
          name: "이사천국",
          like: 10,
          rating: 4.8,
          count: 128,
          career: 5,
          confirm: 98,
          isLiked: false,
          cost: 240000,
          date: "2024-06-01",
          from: "서울특별시 강남구 삼성동 123-45",
          to: "경기도 성남시 분당구 정자동 101-5",
          ReviewCheck: true,
          review: 52,
          writeReview: "친절하게 잘 해주셨어요.",
          nickname: "홍길동",
          movingDay: "2024-07-05",
          reject: false,
          address: ["서울특별시 강남구 삼성동", "경기도 성남시 분당구 정자동"],
        },
        {
          types: ["small", "designation"],
          message: "저렴하고 빠른 이사 추천!",
          imgSrc: "/Images/profile/maleProfile.svg",
          name: "이사드림",
          like: 8,
          rating: 4.5,
          count: 97,
          career: 3,
          confirm: 80,
          isLiked: true,
          cost: 210000,
          date: "2024-06-01",
          from: "서울특별시 강남구 삼성동 123-45",
          to: "경기도 성남시 분당구 정자동 101-5",
          ReviewCheck: false,
          review: 21,
          writeReview: "",
          nickname: "이이사",
          movingDay: "2024-07-05",
          reject: false,
          address: ["서울특별시 강남구 삼성동", "경기도 성남시 분당구 정자동"],
        },
      ],
    },
    {
      types: ["home", "wait"],
      id: "req-2",
      date: "2024-05-28",
      movingDay: "2024-06-15",
      from: "서울특별시 마포구 상암동 200-30",
      to: "서울특별시 은평구 녹번동 22-10",
      estimateList: [
        {
          types: ["home", "wait"],
          message: "포장이사, 사다리차 포함",
          imgSrc: "/Images/profile/maleProfile.svg",
          name: "마포이사",
          like: 15,
          rating: 4.9,
          count: 150,
          career: 7,
          confirm: 110,
          isLiked: false,
          cost: 320000,
          date: "2024-05-28",
          from: "서울특별시 마포구 상암동 200-30",
          to: "서울특별시 은평구 녹번동 22-10",
          ReviewCheck: true,
          review: 60,
          writeReview: "완벽하게 정리해주셨어요.",
          nickname: "철수",
          movingDay: "2024-06-15",
          reject: false,
          address: ["서울특별시 마포구 상암동", "서울특별시 은평구 녹번동"],
        },
      ],
    },
  ];

  return (
    <Stack
      padding={["0px 0px", "0px 72px", "0px 260px"]}
      sx={(theme) => ({
        backgroundColor: theme.palette.Background[100],
        borderColor: theme.palette.Line[100],
      })}
    >
      <Stack marginTop={["0px", "32px", "64px"]}>
        {mockCardList.map((info) => (
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
              <EstimateInfo info={info} />
            </EstimateSection>

            {/* 견적 목록 */}
            <EstimateSection title="견적서 목록">
              <Dropdown options={sortOption} onChange={handleOptionChange} />
              <Stack gap={"56px"}>
                {!info.estimateList || info.estimateList.length === 0 ? (
                  <Typography>제출된 견적서가 없습니다.</Typography>
                ) : (
                  info.estimateList.map((card, idx) => (
                    <CardListCost
                      key={idx}
                      data={card}
                      onLikeClick={handleLikeClick}
                    />
                  ))
                )}
              </Stack>
            </EstimateSection>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
