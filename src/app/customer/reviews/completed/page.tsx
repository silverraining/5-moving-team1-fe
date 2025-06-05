"use client";

import Pagination from "@/src/components/shared/pagination/Pagination";
import { EmprtyReview } from "@/src/components/review/EmptyReview";
import { CardData } from "@/src/types/card";
import { Stack } from "@mui/material";
import { useState } from "react";
import { CardListMyReview } from "@/src/components/shared/components/card/CardListMyReview";

const ReviewsCompleted = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 2;

  //목업 데이터 array를 사용 해서 반복 시킴
  const mockCardData: CardData[] = Array.from({ length: 6 }, (_, i) => ({
    types: ["small", "complete"],
    message: `이사 ${i + 1}건 완료!`,
    imgSrc: "/images/profile/maleProfile.svg",
    name: `김이사${i + 1}`,
    like: 10 + i,
    rating: 3.5 + (i % 5) * 0.1,
    count: 100 + i * 10,
    career: 3 + i,
    confirm: 95,
    isLiked: false,
    cost: 250000 + i * 50000,
    date: "2025-05-30",
    from: "서울시 강남구",
    to: "서울시 마포구",
    ReviewCheck: i % 2 === 0, // 짝수만 작성됨
    review: 4.5,
    writeReview: "만족스러운 이사였습니다!",
    nickname: `고객${i + 1}`,
    movingDay: "2025-05-30",
    reject: false,
    address: ["서울시 강남구", "서울시 마포구"],
  }));

  return (
    <Stack pt={["16px", "24px", "24px"]} pb={5} gap={[6, 6, 5]}>
      <Stack
        direction="row"
        flexWrap="wrap"
        sx={{
          rowGap: ["24px", "32px", "48px"],
          columnGap: "24px",
        }}
        justifyContent="center"
      >
        {mockCardData.length === 0 && (
          <EmprtyReview
            text="아직 등록된 리뷰가 없어요!"
            variation="complete"
          />
        )}
        {mockCardData?.map((mover: CardData, idx: number) => (
          <Stack key={idx}>
            <CardListMyReview data={mover} />
          </Stack>
        ))}
      </Stack>
      {mockCardData.length !== 0 && totalPages > 1 && (
        //데이터가 없거나 totalpage가 1보다 작으면 보이지 않게
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </Stack>
  );
};

export default ReviewsCompleted;
