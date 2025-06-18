import {
  Address,
  EstimateOfferStatus,
  EstimateRequestStatus,
  ServiceType,
  ChipType,
} from "./common";

export interface ChipData {
  chipType?: ChipType;
  status?: EstimateRequestStatus;
  isTargeted?: boolean;
}

export type CardData = {
  types: ServiceType;
  status: EstimateOfferStatus;
  price?: number;
  nickname: string;
  experience: number;
  moveDate: Date;
  imageUrl?: string;
  intro: string;
  rating: number;
  reviewCount: number;
  likeCount: number;
  isLiked: boolean;
  confirmedCount: number;
  fromAddress: Address;
  toAddress: Address;
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
