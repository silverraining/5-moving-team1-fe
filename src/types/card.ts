import {
  EstimateOfferStatus,
  EstimateRequestStatus,
  ServiceType,
} from "./common";

export interface ChipData {
  chipType?: ServiceType | ServiceType[];
  status?: EstimateOfferStatus | EstimateRequestStatus;
  isTargeted?: boolean;
}

export interface CardData {
  id?: string;
  types: ServiceType[];
  message: string;
  imgSrc: string;
  name: string;
  isLiked: boolean;
  like: number;
  rating: number;
  count: number;
  career: number;
  confirm: number;
  address: string[];
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
  reviewCount: number;
  averageRating: number;
  confirmedEstimateCount: number;
  likeCount: number;
};
