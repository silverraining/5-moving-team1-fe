import { CustomerProfile, MoverProfile } from "./auth";
import {
  EstimateOfferStatus,
  EstimateRequestStatus,
  ServiceType,
  Address,
  MinimalAddress,
} from "./common";

export type EstimateOffer = {
  estimateRequestId: string;
  moverId: string;
  price: number;
  comment: string;
  status: EstimateOfferStatus;
  requestStatus: EstimateRequestStatus;
  confirmedCount: number;
  isTargeted: boolean;
  isConfirmed: boolean;
  confirmedAt?: Date;
  completedAt?: Date; //이사 완료시점  ex)리뷰 작성 기간 제한
  createdAt: Date;
  moveDate: Date;
  updatedAt: Date;
  moveType: ServiceType[];
  estimateReques?: EstimateRequest;
  mover: MoverProfile;
  review: Review;
  toAddress: Address;
  fromAddress: Address;
  toAddressMinimal: MinimalAddress;
  fromAddressMinimal: MinimalAddress;
};

export type EstimateRequest = {
  estimateRequestId: string;
  moverId: string;
  customerName: string;
  price: number;
  status: EstimateOfferStatus;
  isTargeted: boolean;
  isConfirmed: boolean;
  confirmedAt: Date;
  moveDate: Date;
  moveType: ServiceType;
  createdAt: Date;

  fromAddress?: Address;
  toAddress?: Address;
  fromAddressMinimal?: MinimalAddress;
  toAddressMinimal?: MinimalAddress;

  mover: MoverProfile;
};

export type Review = {
  estimateOfferId: string;
  customerId: string;
  moverId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  estimateOffer?: EstimateOffer;
  customerProfile: CustomerProfile;
};

export type Like = {
  moverId: string;
  customerId: string;
  createdAt: Date;
  moverProfile: MoverProfile;
  customerProfile: CustomerProfile;
};
