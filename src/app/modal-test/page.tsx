"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import ReviewModal from "@/src/components/shared/components/modal/ReviewModal";

export default function TestPage() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (
    moverName: string,
    moveDate: string,
    price: number,
    rating: number,
    comment: string,
    moveType: string[]
  ) => {
    console.log("리뷰 제출됨:", {
      moverName,
      moveDate,
      price,
      rating,
      comment,
      moveType,
    });

    alert("리뷰가 성공적으로 등록되었습니다.");
    handleClose();
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>리뷰 모달 테스트 페이지</h1>
      <Button variant="outlined" onClick={handleOpen}>
        리뷰 쓰기 열기
      </Button>

      <ReviewModal
        isOpen={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        moverName="김코드"
        moveDate="2024. 07. 01"
        price={210000}
        moveType={["small", "designation"]}
      />
    </div>
  );
}
