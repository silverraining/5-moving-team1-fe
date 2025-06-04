"use client";
import {
  Box,
  Stack,
  Typography,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import { CardData, EstimateRequest } from "@/src/types/card";
import { CardListMover } from "../../shared/components/card/CardListMover";
import { EstimateSection } from "./EstimateSection";
import { SnsShare } from "../../shared/components/sns-share/SnsShare";
import { EstimateInfo } from "./EstimateInfo";
import { useState } from "react";
import Image from "next/image";

export default function PendingDetail({ moverId }: { moverId: string }) {
  const handleLikeClick = () => {
    alert(`좋아요 버튼 누름`);
  };

  const handleConfirmEstimate = () => {
    alert(`확정하기 버튼`);
  };

  const [isLiked, setIsLiked] = useState(false);
  const theme = useTheme();

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
            <CardListMover
              data={mockCardList[0]}
              onLikeClick={handleLikeClick}
            />
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
      <Stack
        display={["none", "none", "flex"]}
        marginTop={"72px"}
        gap={"40px"}
        width={"328px"}
      >
        {/* <Button
          variant="outlined"
          fullWidth
          onClick={handleLikeClick}
          sx={{
            height: "48px",
            fontSize: 16,
            fontWeight: 600,
            backgroundColor: theme.palette.White[100],
            border: `1px solid ${theme.palette.Line[200]}`,
            color: theme.palette.Black[300],
            marginBottom: "24px",
            gap: "8px",
            "&:hover": {
              backgroundColor: theme.palette.PrimaryBlue[100],
              border: `1px solid ${theme.palette.Line[200]}`,
            },
          }}
        >
          <Image
            src={isLiked ? "/Images/like/like.svg" : "/Images/like/unlike.svg"}
            alt="찜하기"
            width={20}
            height={20}
          />
          기사님 찜하기
        </Button> */}

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
