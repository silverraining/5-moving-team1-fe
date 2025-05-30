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
  /**메인페이지 */
  main: "/",
  /**일반 유저 로그인 페이지 */
  userLogin: "/auth/user/login",
  /**기사로그인 페이지 */
  moverLogin: "/auth/mover/login",
  /**일반유저 회원가입 페이지 */
  userSignup: "/auth/user/signup",
  /**기사 회원가입 페이지 */
  moverSignup: "/auth/mover/signup",
  /**일반유저 프로필 등록 페이지*/
  userProfileResister: "/customer/profile/register",
  /**일반유저 프로필 수정 페이지*/
  userProfileEdit: "/customer/profile/edit",
  /**기사 프로필 등록 페이지*/
  moverProfileResister: "/mover/profile/register",
  /**기사 프로필 수정 페이지*/
  moverProfileEdit: "/mover/profile/edit",
  /**기사 상세 페이지
   * id:string
   * 아이디 값만 넣어주세용
   */
  moverDtail: (id: string) => `/customer/moverList/${id}`,
  /**기사 리스트 페이지*/
  moverList: "/customer/moverList",
  /**견적 요청 페이지*/
  customerRequest: "/customer/request",
  /**기사가 받은 견적 페이지*/
  moverRequest: "/mover/requests",
  /**내가 만든 견적 보기 페이지 */
  userEstimate: "/customer/estimate/pending",
  /**내가 만든 견적 상세 보기 페이지
   * id : string
   */
  userEstimateDetail: (id: string) => `/customer/estimate/pending/${id}`,
  /** 받았던 견적 보기 페이지 */
  userEstimateReceive: "/customer/estimate/receive",
  /** 받았던 견적 상세 보기 페이지
   * id : string
   */
  userEstimateReceiveDetail: (id: string) => `/customer/estimate/receive/${id}`,
  /**내견적관리-확정 견적 */
  moverEstimateComfirm: "/mover/estimate/confirm",
  /**내견적관리-확정 견적 상세보기 */
  moverEstimateComfirmDetail: (id: string) => `/mover/estimate/confirm/${id}`,
  /**내견적관리-반려 견적 */
  moverEstimateRefuse: "/mover/estimate/refuse",
  /**찜한 기사 페이지 */
  userWishlist: "/customer/wishlist",
  /**일반유저 리뷰 페이지 */
  userReview: "/customer/reviews",
  /**기사 리뷰 페이지 */
  moveRreview: "/mover/reviews",
};

export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.API_URL;
