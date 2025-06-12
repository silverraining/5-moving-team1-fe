import { ServiceRegion, ServiceType } from "@/src/types/common";
import apiClient from "../axiosclient";

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

export const moverDetail = async (moverId: string) => {
  try {
    const response = await apiClient.get(`/user/mover/detail/${moverId}`, {});
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
