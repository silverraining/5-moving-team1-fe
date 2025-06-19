import { MoverProfile } from "./auth";
import {
  Address,
  EstimateOfferStatus,
  EstimateRequestStatus,
  ServiceType,
} from "./common";

export interface ChipData {
  chipType?: ServiceType;
  status?: EstimateRequestStatus;
  isTargeted?: boolean;
}

export type CardData = {
  isTargeted: boolean | undefined;
  requestStatus: EstimateRequestStatus | undefined;
  moveType: ServiceType | undefined;
  types: ServiceType[];
  status?: EstimateOfferStatus;
  price?: number;
  nickname: string;
  experience: number;
  moveDate?: Date;
  imageUrl?: string;
  intro: string;
  averageRating: number;
  reviewCount: number;
  likeCount: number;
  isLiked: boolean;
  confirmedCount: number;
  fromAddress?: Address;
  toAddress?: Address;
  chips?: ChipData[];
};

export type likeMoverListResItem = {
  id: string;
  nickname: string;
  imageUrl: string;
  experience: number;
  serviceType: {
    SMALL: boolean;
    HOME: boolean;
    OFFICE: boolean;
  };
  review_count: number;
  average_rating: number;
  confirmed_estimate_count: number;
  likeCount: number;
};
export { EstimateRequestStatus };

/** 기사님 마이페이지 프로필 카드 데이터 타입 */
export type MoverProfileCardData = Pick<
  MoverProfile,
  | "nickname"
  | "intro"
  | "imageUrl"
  | "averageRating"
  | "experience"
  | "reviewCount"
  | "confirmedCount"
  | "serviceType"
  | "serviceRegions"
>;

//기사님 목록 데이터 타입
export type MoverListItem = {
  id: string;
  nickname: string;
  imageUrl: string;
  experience: number;
  intro: string;
  serviceType: {
    SMALL: boolean;
    HOME: boolean;
    OFFICE: boolean;
  };
  reviewCount: number;
  averageRating: number;
  confirmedEstimateCount: number;
  likeCount: number;
  isTargeted: boolean;
  isLiked: boolean;
};

//페이지네이션 데이터 타입
export type MoverListResponse = {
  movers: MoverListItem[];
  hasNext: boolean;
  nextCursor: string | null;
};
