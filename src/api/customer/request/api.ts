import axios from "axios";
import apiClient from "../../axiosclient";

export interface AddressPayload {
  sido: string;
  sidoEnglish: string;
  sigungu: string;
  roadAddress: string;
  fullAddress: string;
}

export type RequestEstimate = {
  moveType: string;
  moveDate: string;
  fromAddress: AddressPayload;
  toAddress: AddressPayload;
};

export enum EstimateOfferStatus {
  REQUESTED, // 고객이 견적 요청 보냄 (기사 입장에선 대기 중)
  SUBMITTED, // 기사님이 견적서 보냄
  REJECTED, // 기사님이 반려함
  CONFIRMED, // 고객이 확정함
  CANCELED, // 고객이 다른 기사 선택 → 자동 취소
  COMPLETED, // 이사 완료
}

export const postEstimateRequest = async (data: RequestEstimate) => {
  try {
    const response = await apiClient.post("/estimate-request", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMyEstimateOffers = async () => {
  const response = await apiClient.get("/estimate-offer"); // requestId 없음
  console.log("fetch응답값확인용", response);
  return response.data as EstimateOfferStatus[]; // 배열 형태
};
