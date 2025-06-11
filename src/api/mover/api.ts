import { EstimateRequest } from "@/src/types/estimate";
import apiClient from "../axiosclient";
import { ServiceRegion, ServiceType } from "@/src/types/common";

interface EstimateRequestRquest {
  serviceType: ServiceType[];
  filter: string[];
}
interface EstimateRequestResponse {
  data: EstimateRequest[];
}

export const estimateRequest = async ({
  serviceType,
  filter,
}: EstimateRequestRquest) => {
  try {
    const response = await apiClient.get<EstimateRequestResponse>(
      "/mover/estimate/request",
      {
        params: { serviceType, filter },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 기사님 프로필 등록 및 수정 요청 타입 */
export interface MoverProfileRequest {
  nickname: string;
  imageUrl?: string | null;
  experience: number;
  intro: string;
  description: string;
  serviceType: Record<ServiceType, boolean>;
  serviceRegion: Record<ServiceRegion, boolean>;
}

/** 일반 유저 프로필 등록 api */
export const registerMoverProfile = async (data: MoverProfileRequest) => {
  try {
    const response = await apiClient.post("/mover", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 기사님 프로필 수정 api */
export const updateMoverProfile = async (data: MoverProfileRequest) => {
  try {
    const response = await apiClient.patch("/mover/me", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
