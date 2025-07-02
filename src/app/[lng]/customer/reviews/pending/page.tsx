"use client";

import {
  CardListWriteReview,
  CardListWriteReviewSkeleton,
} from "@/src/components/shared/components/card/CardListWriteReview";
import Pagination from "@/src/components/shared/pagination/Pagination";
import { EmptyReview } from "@/src/components/review/EmptyReview";
import { Stack } from "@mui/material";
import { useState } from "react";
import { useWriteReviewsList } from "@/src/api/review/hooks";
import ReviewModal from "@/src/components/shared/components/modal/ReviewModal";

const ReviewsPending = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, refetch, isLoading } = useWriteReviewsList(currentPage, 6);
  const handleReviewClick = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isLoading && (!data || data.reviewableOffers.length === 0))
    return <EmptyReview text="작성 가능한 리뷰가 없습니다" />;

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
        {isLoading &&
          [...Array(6)].map((_, i) => <CardListWriteReviewSkeleton key={i} />)}

        {data?.reviewableOffers.map((d, idx: number) => (
          <Stack key={idx}>
            <CardListWriteReview data={d} onReviewClick={handleReviewClick} />
            <ReviewModal
              isOpen={isOpen}
              onClose={handleClose}
              moverImage={d.mover.imageUrl}
              moverName={d.mover.nickname}
              moveDate={d.moveDate}
              price={d.price}
              moveType={d.moveType}
              offerId={d.reviewableOfferId}
              dataRefetch={refetch}
            />
          </Stack>
        ))}
      </Stack>

      {data && data?.reviewableOffers.length !== 0 && data?.total / 6 > 1 && (
        //데이터가 없거나 totalpage가 1보다 작으면 보이지 않게
        <Pagination
          currentPage={currentPage}
          totalPages={data ? data.total / 6 : 1}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </Stack>
  );
};

export default ReviewsPending;
