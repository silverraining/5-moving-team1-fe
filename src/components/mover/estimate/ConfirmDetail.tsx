"use client";
import { Box, Stack, Typography, Divider } from "@mui/material";
import { CardData, EstimateRequest } from "@/src/types/card";
import { EstimateSection } from "../../customer/estimate/EstimateSection";
import { SnsShare } from "../../shared/components/sns-share/SnsShare";
import { EstimateInfo } from "../../customer/estimate/EstimateInfo";
import { EstimateOfferStatus } from "@/src/types/common";
import { CardListReject } from "../../shared/components/card/CardListReject";

export default function ConfirmDetail({ moverId }: { moverId: string }) {
  // 확인용으로 넣은 임시 데이터
  const EstimateRequest: EstimateRequest[] = [
    {
      types: ["small", "home"],
      id: "req-1",
      date: "2024-06-01",
      movingDay: "2024-07-05",
      from: "서울특별시 강남구 삼성동 123-45",
      to: "경기도 성남시 분당구 정자동 101-5",
    },
  ];
  const mockCardList: CardData[] = [
    {
      types: ["small", "complete"],
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
      review: 2,
      writeReview: "친절하게 잘 해주셨어요.",
      nickname: "홍길동",
      movingDay: "2024-07-05",
      reject: false,
      address: ["서울특별시 강남구 삼성동", "경기도 성남시 분당구 정자동"],
    },
  ];
  const mockStatus: EstimateOfferStatus = EstimateOfferStatus.CONFIRMED;

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
            <CardListReject data={mockCardList[0]} />
          </EstimateSection>
          <Divider />

          {/* 태블릿 이하 SNS */}
          <Stack display={["flex", "flex", "none"]} gap={"24px"}>
            <SnsShare title="견적서 공유하기" />
            <Divider />
          </Stack>
        </Stack>

        {/* 견적가 */}
        <EstimateSection title="견적가">
          <Typography variant="B_32">{mockCardList[0].cost}</Typography>
        </EstimateSection>
        <Divider />

        {/* 견적 정보 */}
        <EstimateSection title="견적 정보">
          <EstimateInfo info={EstimateRequest[0]}></EstimateInfo>
        </EstimateSection>
      </Stack>

      {/* 데스크탑 SNS */}
      <Box display={["none", "none", "block"]} marginTop={"72px"}>
        <SnsShare title="견적서 공유하기" />
      </Box>
    </Stack>
  );
}
