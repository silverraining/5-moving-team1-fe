"use client";
import { Grid } from "@mui/material";
import { CardData } from "@/src/types/card";
import { CardListReject } from "../../shared/components/card/CardListReject";
import { CardListCompleteState } from "../../shared/components/card/CardListCompleteState";

/**
 * 견적 조회("estimate")와 반려 요청("reject") 중 하나를 나타냅니다.
 * - "estimate": 견적 조회
 * - "reject": 반려 요청
 */
type RequestType = "estimate" | "reject";

interface RequestEstimateProps {
  requestType: RequestType;
}

export default function RequestEstimate({ requestType }: RequestEstimateProps) {
  // 임시로 넣은 상세 보기
  const handleDetailClick = () => {
    alert(`상세보기 버튼 누름`);
  };

  // 확인용으로 넣은 임시 데이터
  const mockCardList: CardData[] = [
    {
      types: ["small", "home"],
      message: "안녕하세요 고객님이 주문하신 물품을 안전하게 운송해 드립니다.",
      imgSrc: "/Images/profile/maleProfile.svg",
      name: "홍길동",
      nickname: "hong123",
      like: 42,
      rating: 4.8,
      count: 120,
      career: 5,
      confirm: 123,
      isLiked: true,
      cost: 100000,
      date: "2025-05-20T15:00:00",
      from: "경기도 고양시",
      to: "서울시 강남구",
      movingDay: "2025-05-20T15:00:00",
      ReviewCheck: true,
      review: 5,
      writeReview: "처음 견적 받아봤는데 너무 만족스러웠어요!",
      reject: true,
      address: ["서울", "경기"],
    },
    {
      types: ["office"],
      message: "사무실 이사 전문, 깔끔한 정리와 정돈을 약속드립니다.",
      imgSrc: "/Images/profile/maleProfile.svg",
      name: "김민지",
      nickname: "minji_kim",
      like: 27,
      rating: 4.5,
      count: 95,
      career: 3,
      confirm: 110,
      isLiked: false,
      cost: 220000,
      date: "2025-06-01T10:30:00",
      from: "서울시 종로구",
      to: "서울시 서초구",
      movingDay: "2025-06-01T10:30:00",
      ReviewCheck: true,
      review: 4,
      writeReview: "깔끔하게 마무리해주셔서 감사해요.",
      reject: false,
      address: ["서울"],
    },
    {
      types: ["home"],
      message: "이사 걱정 끝! 신속 정확한 서비스 보장!",
      imgSrc: "/Images/profile/maleProfile.svg",
      name: "이수현",
      nickname: "soo_move",
      like: 59,
      rating: 4.9,
      count: 140,
      career: 7,
      confirm: 130,
      isLiked: true,
      cost: 180000,
      date: "2025-05-27T09:00:00",
      from: "인천광역시 부평구",
      to: "경기도 수원시",
      movingDay: "2025-05-27T09:00:00",
      ReviewCheck: true,
      review: 5,
      writeReview: "정말 친절하고 정확하게 도와주셨어요!",
      reject: true,
      address: ["인천", "경기"],
    },
    {
      types: ["small"],
      message: "원룸 전문 이사 도와드립니다!",
      imgSrc: "/Images/profile/maleProfile.svg",
      name: "박지은",
      nickname: "eunpark",
      like: 12,
      rating: 4.2,
      count: 60,
      career: 2,
      confirm: 95,
      isLiked: false,
      cost: 80000,
      date: "2025-06-10T14:00:00",
      from: "부산광역시 해운대구",
      to: "부산광역시 수영구",
      movingDay: "2025-06-10T14:00:00",
      ReviewCheck: false,
      review: 0,
      writeReview: "",
      reject: false,
      address: ["부산"],
    },
    {
      types: ["office", "home"],
      message: "이사 + 정리 + 청소까지 원스톱 해결!",
      imgSrc: "/Images/profile/maleProfile.svg",
      name: "최강민",
      nickname: "kangmin_move",
      like: 71,
      rating: 5.0,
      count: 160,
      career: 8,
      confirm: 145,
      isLiked: true,
      cost: 250000,
      date: "2025-06-15T13:00:00",
      from: "대구광역시 수성구",
      to: "경상북도 구미시",
      movingDay: "2025-06-15T13:00:00",
      ReviewCheck: true,
      review: 5,
      writeReview: "완벽한 이사 서비스였습니다!",
      reject: false,
      address: ["대구", "경북"],
    },
  ];

  return (
    <Grid container spacing={2} sx={{ maxWidth: 1400, margin: "0 auto" }}>
      {mockCardList.map((card, index) => (
        <Grid
          key={index}
          size={[12, 12, 6]}
          display={"flex"}
          sx={{ justifyContent: "center" }}
        >
          {requestType === "estimate" && (
            <CardListCompleteState
              data={card}
              onclickDetails={handleDetailClick}
            />
          )}
          {requestType === "reject" && <CardListReject data={card} />}
        </Grid>
      ))}
    </Grid>
  );
}
