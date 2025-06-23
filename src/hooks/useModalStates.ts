/*
받은 요청 페이지(app/mover/estimate/requested/page.tsx)의 플로우를 나타낸 ReceivedRequestsFlow 코드에서 필터 모달, 견적 보내기 모달, 반려하기 모달을 사용하고 있음.
이 모달들의 열림/닫힘을 관리하는 상태 관리 훅
*/
import { useState } from "react";

export default function useModalStates() {
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const openEstimateModal = () => setIsEstimateModalOpen(true);
  const closeEstimateModal = () => setIsEstimateModalOpen(false);

  const openRejectModal = () => setIsRejectModalOpen(true);
  const closeRejectModal = () => setIsRejectModalOpen(false);

  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);

  return {
    isEstimateModalOpen,
    isRejectModalOpen,
    isFilterModalOpen,
    openEstimateModal,
    closeEstimateModal,
    openRejectModal,
    closeRejectModal,
    openFilterModal,
    closeFilterModal,
  };
}
