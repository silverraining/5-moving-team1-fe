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
