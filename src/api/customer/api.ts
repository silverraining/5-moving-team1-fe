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
  imageUrl: string;
  serviceType: {
    SMALL: boolean;
    HOME: boolean;
    OFFICE: boolean;
  };
  serviceRegion: {
    [key in ServiceRegion]: boolean;
  };
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
