"use client";
import { Grid } from "@mui/material";
import { CardListWait } from "@/src/components/shared/components/card/CardListWait";
import { CardData } from "@/src/types/card";

export default function PendingEstimate() {
  // 임시로 넣은 상세 보기
  const handleDetailClick = () => {
    alert(`상세보기 버튼 누름`);
  };

  // 임시로 넣은 좋아요 토글
  const handleLikeClick = () => {
    alert(`좋아요 버튼 누름`);
  };

  // 임시로 넣은 견적 확정하기
  const handleConfirmClick = () => {
    alert(`견적을 선택 완료했습니다!`);
  };

  // 확인용으로 넣은 임시 데이터
  const mockCardList: CardData[] = [
    {
      types: ["small", "home"],
      message: "안녕하세요 고객님이 주문하신 물품을 안전하게 운송해 드립니다.",
      imgSrc: "/images/profile/maleProfile.svg",
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
      refuse: false,
      address: ["서울", "경기"],
    },
    {
      types: ["office"],
      message: "사무실 이사 전문, 깔끔한 정리와 정돈을 약속드립니다.",
      imgSrc: "/images/profile/maleProfile.svg",
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
      refuse: false,
      address: ["서울"],
    },
    {
      types: ["home"],
      message: "이사 걱정 끝! 신속 정확한 서비스 보장!",
      imgSrc: "/images/profile/maleProfile.svg",
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
      refuse: false,
      address: ["인천", "경기"],
    },
    {
      types: ["small"],
      message: "원룸 전문 이사 도와드립니다!",
      imgSrc: "/images/profile/maleProfile.svg",
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
      refuse: false,
      address: ["부산"],
    },
    {
      types: ["office", "home"],
      message: "이사 + 정리 + 청소까지 원스톱 해결!",
      imgSrc: "/images/profile/maleProfile.svg",
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
      refuse: false,
      address: ["대구", "경북"],
    },
  ];

  return (
    <Grid container spacing={2}>
      {mockCardList.map((card, index) => (
        <Grid
          key={index}
          size={[12, 12, 6]}
          display={"flex"}
          sx={{ justifyContent: "center" }}
        >
          <CardListWait
            data={card}
            onDetailClick={handleDetailClick}
            onLikeClick={handleLikeClick}
            onConfirmClick={handleConfirmClick}
          />
        </Grid>
      ))}
    </Grid>
  );
}
