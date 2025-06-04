import { PATH } from "./constants";

export type TabType = { label: string; href: string }[];
export const CUSTOMER_MENU: TabType = [
  { label: "견적 요청", href: PATH.userRequest },
  { label: "기사님 찾기", href: PATH.moverList },
  { label: "내 견적 관리", href: PATH.userEstimate },
];

export const MOVER_MENU: TabType = [
  { label: "받은 요청", href: PATH.moverRequest },
  { label: "내 견적 관리", href: PATH.moverEstimateConfirm },
];

export const GUEST_MENU: TabType = [
  { label: "기사님 찾기", href: PATH.moverList },
];

export const USER_REQUEST: TabType = [
  { label: "대기중인 견적", href: PATH.userEstimate },
  { label: "받았던 견적", href: PATH.userEstimateReceive },
];

export const USER_REVIEW: TabType = [
  { label: "작성 가능한 리뷰", href: PATH.userReviewPending },
  { label: "내가 작성한 리뷰", href: PATH.userReviewCompleted },
];

export const MOVER_REQUST: TabType = [
  { label: "보낸 견적 조회", href: PATH.moverEstimateConfirm },
  { label: "반려 요청", href: PATH.moverEstimateReject },
];
