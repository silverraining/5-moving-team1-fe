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

/** 기사 프로필 등록 api */
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

interface UpdateGeneralMoverProfileRequest {
  name: string;
  phone: string;
  password?: string;
  newPassword?: string;
}

/** 기사님 기본 정보 수정 api */
export const updateGeneralMoverProfile = async (
  data: UpdateGeneralMoverProfileRequest
) => {
  try {
    const response = await apiClient.patch("/user/me", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface MoverDetail {
  id: string;
  nickname: string;
  imageUrl: string;
  experience: number;
  intro: string;
  description: string;
  serviceType: Record<ServiceType, boolean>;
  serviceRegion: Record<ServiceRegion, boolean>;
  reviewCount: number;
  averageRating: number;
  confirmedEstimateCount: number;
  likeCount: number;
  isTargeted: boolean;
  isLiked: boolean;
}

/** 기사님 상세 정보 조회 api */
export const getMoverDetail = async (moverId: string): Promise<MoverDetail> => {
  const { data } = await apiClient.get<MoverDetail>(`/mover/${moverId}`);
  return data;
};

/** 지정 견적 요청 api */
export const requestTargetedEstimate = async (
  requestId: string,
  moverProfileId: string
) => {
  const response = await apiClient.patch<{ message: string }>(
    `/estimate-request/${requestId}/targeted`,
    {
      moverProfileId,
    }
  );

  return response.data;
};

/** 기사님 프로필 카드 데이터 타입 */
export interface MoverProfileCardData {
  id: string;
  nickname: string;
  intro: string;
  imageUrl: string;
  averageRating: number;
  experience: number;
  reviewCount: number;
  confirmedEstimateCount: number;
  serviceType: Record<ServiceType, boolean>;
  serviceRegion: Record<ServiceRegion, boolean>;
}

/**
 * 기사님의 프로필 카드 정보 조회 API
 */
export const fetchMoverProfileCard =
  async (): Promise<MoverProfileCardData> => {
    try {
      const response = await apiClient.get<MoverProfileCardData>("/mover/me");
      return response.data;
    } catch (error) {
      throw new Error("기사님 프로필 정보를 불러오지 못했습니다.");
    }
  };
