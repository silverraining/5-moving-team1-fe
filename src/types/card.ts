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

export interface CardData {
  types: ServiceType[];
  message: string; //intro
  imgSrc: string; //imageUrl
  name: string; //nickname
  isLiked: boolean;
  like: number; //likeCount
  rating: number; //averageRating
  count: number; //reviewCount
  career: number; //experience
  confirm: number; //confirmedCount
  address: string[]; //fromAddress, toAddress
}

// CardData를 확장
export interface ExtendedCardData extends CardData {
  isTargeted?: boolean;
  requestStatus?: EstimateRequestStatus;
  moveType?: ServiceType;
  status?: EstimateOfferStatus;
  price?: number;
  moveDate?: Date;
  //imageUrl?: string;
  //intro?: string;
  //averageRating?: number;
  // reviewCount?: number;
  // likeCount?: number;
  // confirmedCount?: number;
  fromAddress?: Address;
  toAddress?: Address;
  chips?: ChipData[];
}

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
  | "serviceRegion"
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
