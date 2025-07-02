"use client";

import Pagination from "@/src/components/shared/pagination/Pagination";
import { EmptyReview } from "@/src/components/review/EmptyReview";
import { Stack } from "@mui/material";
import { useState } from "react";
import { CardListMyReview } from "@/src/components/shared/components/card/CardListMyReview";
import { useCompletedReviews } from "@/src/api/review/hooks";

const ReviewsCompleted = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data } = useCompletedReviews(currentPage, 6);
  //목업 데이터 array를 사용 해서 반복 시킴

  if (!data || data?.reviews.length === 0) {
    return (
      <EmptyReview text="아직 등록된 리뷰가 없어요!" variation="complete" />
    );
  }

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
        {data?.reviews.map((mover, idx: number) => (
          <Stack key={idx}>
            <CardListMyReview data={mover} />
          </Stack>
        ))}
      </Stack>
      {data && data.reviews.length !== 0 && data.total / 6 > 1 && (
        //데이터가 없거나 totalpage가 1보다 작으면 보이지 않게
        <Pagination
          currentPage={currentPage}
          totalPages={data.total / 6 || 1}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </Stack>
  );
};

export default ReviewsCompleted;
