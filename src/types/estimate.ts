import { CustomerProfile, MoverProfile } from "./auth";
import {
  EstimateOfferStatus,
  EstimateRequestStatus,
  ServiceType,
} from "./common";

export type EstimateOffer = {
  estimateRequestId: String;
  moverId: String;
  price: Number;
  comment: String;
  status: EstimateOfferStatus;
  isTargeted: Boolean;
  isConfirmed: Boolean;
  confirmedAt: Date;
  completedAt: Date; //이사 완료시점  ex)리뷰 작성 기간 제한
  createdAt: Date;
  updatedAt: Date;

  estimateRequest: EstimateRequest;
  moverProfile: MoverProfile;
  review: Review;
};

export type EstimateRequest = {
  id: string;
  customerId: String;
  estimateOfferId: String;
  moveType: ServiceType;
  status: EstimateRequestStatus;
  moveDate: Date; // 연월일시 + 시간
  targetMoverIds: string[]; // 3개 제한
  fromAddress: Object; // 객체로 저장 JSON
  toAddress: Object; // 객체로 저장 JSON
  createdAt: Date;
  updatedAt: Date;
  estimateOffers: EstimateOffer[]; // 1:N 관계
  confirmedOfferId: String; //확정된 견적에 대한 id 1:1
  confirmedOffer: EstimateOffer;
  customerProfile: CustomerProfile;
};
export type Review = {
  estimateOfferId: String;
  customerId: String;
  moverId: String;
  rating: Number;
  comment: String;
  createdAt: Date;
  updatedAt: Date;
  estimateOffer: EstimateOffer;
  customerProfile: CustomerProfile;
};
export type Like = {
  moverId: String;
  customerId: String;
  createdAt: Date;
  moverProfile: MoverProfile;
  customerProfile: CustomerProfile;
};
