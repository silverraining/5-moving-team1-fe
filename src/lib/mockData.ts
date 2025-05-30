import { generateMockReviews } from "../mock/moverHendler";
import { MoverProfile } from "../types/auth";
import {
  EstimateRequestStatus,
  ServiceRegion,
} from "../types/common";
import { EstimateRequest } from "../types/estimate";

export const LOGIN = {
  accessToken: "mockAccessToken12345",
  refreshToken: "mockRefreshToken67890",
  user: {
    id: "user-001",
    name: "홍길동",
    phone: "010-1234-5678",
    email: "hong@example.com",
    role: "CUSTOMER",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-05-26T12:00:00Z"),
    notifications: [
      { id: "noti1", message: "새 알림이 도착했습니다.", read: false },
    ],
    customerProfile: [{ id: "profile1", info: "프로필 정보 예시" }],
    moverProfile: [],
  },
};

export const MOVER_LIST: MoverProfile[] = [
  {
    id: "mover-001",
    userId: "user-002",
    nickname: "이사왕",
    imageUrl: "/images/profile/maleProfile.svg",
    experience: 5,
    intro: "안녕하세요! 이사 전문 기사입니다.",
    description: "고객님의 소중한 짐을 안전하게 옮겨드립니다.",
    averageRating: 4.8,
    confirmedCount: 50,
    serviceType: ["HOME", "OFFICE"],
    serviceRegions: [ServiceRegion.CHUNGBUK, ServiceRegion.GYEONGGI],
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-05-26T12:00:00Z"),
    reviews: [],
  },
];

export const MOVER_DTAIL: MoverProfile = {
  id: "mover-001",
  userId: "user-002",
  nickname: "이사왕",
  imageUrl: "/images/profile/maleProfile.svg",
  experience: 5,
  intro: "안녕하세요! 이사 전문 기사입니다.",
  description: "고객님의 소중한 짐을 안전하게 옮겨드립니다.",
  averageRating: 4.8,
  confirmedCount: 50,
  serviceType: ["OFFICE", "SMALL"],
  serviceRegions: [ServiceRegion.CHUNGBUK, ServiceRegion.GYEONGGI],
  createdAt: new Date("2024-01-01T10:00:00Z"),
  updatedAt: new Date("2024-05-26T12:00:00Z"),
  reviews: [],
};

export const ESTIMATEREQUEST: EstimateRequest = {
  id: "estimate-001",
  customerId: "user-001",
  estimateOfferId: "offer-001",
  moveType: "HOME",
  status: EstimateRequestStatus.PENDING,
  moveDate: new Date("2024-06-01T10:00:00Z"),
  targetMoverIds: ["mover-001", "mover-002"],
  fromAddress: { city: "서울", street: "강남구 테헤란로" },
  toAddress: { city: "서울", street: "서초구 서초동" },
  createdAt: new Date("2024-05-01T10:00:00Z"),
  updatedAt: new Date("2024-05-26T12:00:00Z"),
  estimateOffers: [],
  confirmedOfferId: "",
  confirmedOffer: undefined,
  customerProfile: {
    userId: "user-001",
    id: "profile1",
    imageUrl: "https://example.com/customer1.jpg",
    serviceRegion: ServiceRegion.SEOUL,
    serviceType: ["HOME", "SMALL"],
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-05-26T12:00:00Z"),
    reviews: [],
    likes: [],
  },
};
const reviewData = generateMockReviews(30, ESTIMATEREQUEST.customerProfile);

MOVER_LIST.forEach((mover) => {
  mover.reviews = reviewData;
});
MOVER_DTAIL.reviews = reviewData;
