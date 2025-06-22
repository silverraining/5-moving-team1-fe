import { ServiceRegion, ServiceType } from "@/src/types/common";
import apiClient from "../axiosclient";
import { EstimateOffer, EstimateRequest } from "@/src/types/estimate";

export type MoverListRequest = {
  location?: ServiceRegion;
  serviceType?: ServiceType;
  sortBy?: "review" | "rating" | "history" | "confirm";
};

export const moverList = async ({
  location = ServiceRegion.SEOUL,
  serviceType = "HOME",
  sortBy = "rating",
}: MoverListRequest) => {
  try {
    const response = await apiClient.get("/user/mover/list", {
      params: { location, serviceType, sortBy },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 일반 유저 프로필 등록 요청 타입 */
export interface CustomerProfileRequest {
  imageUrl?: string | null;
  serviceType: Record<ServiceType, boolean>;
  serviceRegion: Record<ServiceRegion, boolean>;
}

/** 일반 유저 프로필 등록 api */
export const registerCustomerProfile = async (data: CustomerProfileRequest) => {
  try {
    const response = await apiClient.post("/customer", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 일반 유저 프로필 수정 요청 타입 */
export interface UpdateCustomerProfileRequest {
  name: string;
  phone: string;
  password?: string;
  newPassword?: string;
  imageUrl?: string | null;
  serviceType: Record<ServiceType, boolean>;
  serviceRegion: Record<ServiceRegion, boolean>;
}

/** 일반 유저 프로필 수정 api */
export const updateCustomerProfile = async (
  data: UpdateCustomerProfileRequest
) => {
  try {
    const response = await apiClient.patch("/customer/me", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 고객 프로필 응답 타입 */
export interface CustomerProfileResponse {
  name: string;
  email: string;
  phone: string;
  id: string;
  imageUrl: string;
  serviceType: Record<ServiceType, boolean>;
  serviceRegion: Record<ServiceRegion, boolean>;
}

/** 고객 프로필 조회 api */
export const getCustomerProfile =
  async (): Promise<CustomerProfileResponse> => {
    try {
      const response = await apiClient.get("/customer/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

/** PENDING, CONFIRMED 상태의 견적 요청 ID만 반환 api */
export const EstimateRequestActive = async () => {
  try {
    const response = await apiClient.get("/estimate-request/active", {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 받았던 견적 타입 */
export type EstimateRequestHistoryResponse = {
  items: EstimateRequest[];
  hasNext: boolean;
  nextCursor: string | null;
  totalCount: number;
};

/** 견적 관리 받았던 견적 api */
export const EstimateRequestHistory =
  async (): Promise<EstimateRequestHistoryResponse> => {
    try {
      const response = await apiClient.get("/estimate-request/history", {});
      return response.data;
    } catch (error) {
      throw error;
    }
  };

/** 대기 중인 견적 타입 */
export type EstimateOfferPendingResponse = {
  items: EstimateOffer[];
  hasNext: boolean;
  nextCursor: string | null;
  totalCount: number;
};

/** 견적 관리 대기 중인 견적 api */
export const EstimateOfferPending = async (
  requestId: string
): Promise<EstimateOfferPendingResponse> => {
  try {
    const response = await apiClient.get(
      `/estimate-offer/${requestId}/pending`,
      {}
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 대기 중인, 받았던 견적 상세보기 api */
export const EstimateOfferDetail = async (
  requestId: string,
  moverId: string
) => {
  try {
    const response = await apiClient.get(
      `/estimate-offer/${requestId}/${moverId}/pending`,
      {}
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
