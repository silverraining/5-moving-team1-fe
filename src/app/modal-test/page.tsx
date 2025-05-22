"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import ReviewModal from "@/src/components/shared/components/modal/ReviewModal";
import SendEstimateModal from "@/src/components/shared/components/modal/SendEstimateModal";
import RejectRequestModal from "@/src/components/shared/components/modal/RejectRequestModal";

export default function TestPage() {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [estimateOpen, setEstimateOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  const handleReviewOpen = () => setReviewOpen(true);
  const handleReviewClose = () => setReviewOpen(false);

  const handleEstimateOpen = () => setEstimateOpen(true);
  const handleEstimateClose = () => setEstimateOpen(false);

  const handleRejectOpen = () => setRejectOpen(true);
  const handleRejectClose = () => setRejectOpen(false);

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
    handleReviewClose();
  };

  const handleEstimateSend = (data: { price: number; comment: string }) => {
    console.log("견적 데이터 전송됨:", data);
    alert(`견적 전송됨!\n가격: ${data.price}\n코멘트: ${data.comment}`);
    handleEstimateClose();
  };

  const handleRejectSubmit = (reason: string) => {
    console.log("반려 사유:", reason);
    alert(`반려 사유:\n${reason}`);
    handleRejectClose();
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>리뷰 모달 테스트 페이지</h1>
      <Button variant="outlined" onClick={handleReviewOpen} sx={{ mr: 2 }}>
        리뷰 쓰기 열기
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleEstimateOpen}
        sx={{ mr: 2 }}
      >
        견적 보내기 열기
      </Button>

      <Button variant="outlined" color="error" onClick={handleRejectOpen}>
        반려 요청 열기
      </Button>

      {/* ReviewModal */}
      <ReviewModal
        isOpen={reviewOpen}
        onClose={handleReviewClose}
        onSubmit={handleSubmit}
        moverName="김코드"
        moveDate="2024. 07. 01"
        price={210000}
        moveType={["small", "designation"]}
      />
      {/* SendEstimateModal */}
      <SendEstimateModal
        open={estimateOpen}
        onClose={handleEstimateClose}
        onSend={handleEstimateSend}
        moveType={["small", "designation"]}
        customerName="김코드"
        moveDate="2024. 07. 01(월)"
        fromAddress="서울시 중구"
        toAddress="경기도 수원시"
      />
      {/* RejectRequestModal */}
      <RejectRequestModal
        open={rejectOpen}
        onClose={handleRejectClose}
        onSubmit={handleRejectSubmit}
        moveType={["small", "designation"]}
        customerName="김코드"
        moveDate="2024. 07. 01(월)"
        fromAddress="서울시 중구"
        toAddress="경기도 수원시"
      />
    </div>
  );
}
