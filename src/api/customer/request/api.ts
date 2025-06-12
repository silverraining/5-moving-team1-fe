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

// fetchMyActiveEstimateRequest 응답 타입
export type ActiveEstimateRequest = {
  estimateRequestId: string;
};

export enum EstimateRequestStatus {
  PENDING = "PENDING", // 견적 제안 대기 중
  CONFIRMED = "CONFIRMED", // 고객이 기사님 1명 확정
  REJECTED = "REJECTED", // 기사님이 반려함
  COMPLETED = "COMPLETED", // 이사 완료
  CANCELED = "CANCELED", // 고객이 요청 취소
  EXPIRED = "EXPIRED", // 이사일 지나도록 확정 없음
}

export enum EstimateOfferStatus {
  REQUESTED = "REQUESTED", // 고객이 견적 요청 보냄 (기사 입장에선 대기 중)
  SUBMITTED = "SUBMITTED", // 기사님이 견적서 보냄
  REJECTED = "REJECTED", // 기사님이 반려함
  CONFIRMED = "CONFIRMED", // 고객이 확정함
  CANCELED = "CANCELED", // 고객이 다른 기사 선택 → 자동 취소
  COMPLETED = "COMPLETED", // 이사 완료
}

// fetchPendingOffersByRequestId 함수 응답 타입
export type EstimateOffer = {
  estimateRequestId: string;
  moverId: string;
  price: number;
  status: EstimateOfferStatus;
  requestStatus: EstimateRequestStatus;
  isTargeted: boolean;
  isConfirmed: boolean;
  confirmedAt: Date;
  moveDate: Date;
  moveType: string;
  createdAt: Date;
  fromAddressMinimal: {
    sido: string;
    sigungu: string;
  };
  toAddressMinimal: {
    sido: string;
    sigungu: string;
  };
  mover: {
    nickname: string;
    imageUrl?: string;
    experience: number;
    intro: string;
    rating: number;
    reviewCount: number;
    likeCount: number;
    isLiked: boolean;
    confirmedCount: number;
  };
};

/**
 * 1. 견적 요청 보내기
 */
export const postEstimateRequest = async (data: RequestEstimate) => {
  try {
    const response = await apiClient.post("/estimate-request", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 2. 특정 요청 ID에 대한 기사님 견적 제안 리스트 조회 (대기 상태인 것만)
 */
export const fetchPendingOffersByRequestId = async (
  requestId: string
): Promise<EstimateOffer[]> => {
  try {
    const response = await apiClient.get(
      `/estimate-offer/${requestId}/pending`
    );
    console.log("활성화된 견적 id에 대한 값", response.data);

    return response.data;
  } catch (error) {
    console.error("대기 중인 견적 제안 조회 실패:", error);
    console.log("실패 시 requestId:", requestId);
    throw error;
  }
};

/**
 * 3. 활성화된 내 견적 요청 조회 (이미 요청한 적이 있는지 확인용)
 */
export const fetchMyActiveEstimateRequest = async (): Promise<
  ActiveEstimateRequest[]
> => {
  try {
    const response = await apiClient.get("/estimate-request/active");
    console.log("활성화된 견적있나 응답값:", response.data);
    return response.data;
  } catch (error) {
    console.error("활성 견적 요청 조회 실패:", error);
    throw error;
  }
};
