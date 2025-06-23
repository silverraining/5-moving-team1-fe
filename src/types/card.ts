import { EstimateRequestStatus, ServiceType } from "./common";

export interface ChipData {
  chipType?: ServiceType;
  status?: EstimateRequestStatus;
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
  review_count: number;
  average_rating: number;
  confirmed_estimate_count: number;
  likeCount: number;
};
