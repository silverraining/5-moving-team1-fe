export const ServiceType = ["소형이사", "가정이사", "사무실이사"] as const;

export type Service = (typeof ServiceType)[number];

export const RegionType = [
  "서울",
  "경기",
  "인천",
  "강원",
  "충북",
  "충남",
  "세종",
  "대전",
  "전북",
  "전남",
  "경주",
  "경북",
  "경남",
  "대구",
  "울산",
  "부산",
  "제주",
] as const;
export type Region = (typeof RegionType)[number];

export const PATH = {
  /** 메인 페이지 (/) */
  main: "/",

  /** 일반 유저 로그인 페이지 (/auth/user/login) */
  userLogin: "/auth/user/login",

  /** 기사 로그인 페이지 (/auth/mover/login) */
  moverLogin: "/auth/mover/login",

  /** 일반 유저 회원가입 페이지 (/auth/user/signup) */
  userSignup: "/auth/user/signup",

  /** 기사 회원가입 페이지 (/auth/mover/signup) */
  moverSignup: "/auth/mover/signup",

  /** 기사 프로필 등록 페이지 (/mover/profile/register) */
  moverProfileRegister: "/mover/profile/register",

  /** 기사 프로필 수정 페이지 (/mover/profile/edit) */
  moverProfileEdit: "/mover/profile/edit",

  /** 기사가 받은 견적 리스트 페이지 (/mover/estimate/requested) */
  moverRequest: "/mover/estimate/requested",

  /** 기사의 확정된 견적 리스트 페이지 (/mover/estimate/confirm) */
  moverEstimateConfirm: "/mover/estimate/confirm",

  /** 기사의 확정된 견적 상세 페이지 (/mover/estimate/confirm/:id) */
  moverEstimateConfirmDetail: (id: string) => `/mover/estimate/confirm/${id}`,

  /** 기사의 반려된 견적 리스트 페이지 (/mover/estimate/reject) */
  moverEstimateReject: "/mover/estimate/reject",

  /** 기사 상세 페이지 (/customer/moverList/:id) */
  moverDetail: (id: string) => `/customer/moverlist/${id}`,

  /** 기사 리스트 페이지 (/customer/moverList) */
  moverList: "/customer/moverlist",

  /** 기사 리뷰 페이지 (/mover/reviews) */
  moverReview: "/mover/reviews",

  /** 견적 요청 페이지 (/customer/request) */
  userRequest: "/customer/request",

  /** 내가 만든 견적 리스트 페이지 (/customer/estimate/pending) */
  userEstimate: "/customer/estimate/pending",

  /** 일반 유저 프로필 등록 페이지 (/customer/profile/register) */
  userProfileRegister: "/customer/profile/register",

  /** 일반 유저 프로필 수정 페이지 (/customer/profile/edit) */
  userProfileEdit: "/customer/profile/edit",

  /** 내가 만든 견적 상세 페이지 (/customer/estimate/pending/:id) */
  userEstimateDetail: (id: string) => `/customer/estimate/pending/${id}`,

  /** 받았던 견적 리스트 페이지 (/customer/estimate/receive) */
  userEstimateReceive: "/customer/estimate/receive",

  /** 받았던 견적 상세 페이지 (/customer/estimate/receive/:id) */
  userEstimateReceiveDetail: (id: string) => `/customer/estimate/receive/${id}`,

  /** 일반 유저의 찜한 기사 리스트 페이지 (/customer/wishlist) */
  userWishlist: "/customer/wishlist",

  /** 일반 유저 리뷰 페이지 (/customer/reviews) */
  userReview: "/customer/reviews",
  /** 일반 유저 작성가능 한 리뷰 페이지 (/customer/reviews/pending) */
  userReviewPending: "/customer/reviews/pending",
  /** 일반 유저 작성가능 한 리뷰 페이지 (/customer/reviews/completed) */
  userReviewCompleted: "/customer/reviews/completed",
};

export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : process.env.API_URL;
