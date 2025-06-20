import { EstimateRequest, Review } from "@/src/types/estimate";
import apiClient from "../axiosclient";
import { ServiceRegion, ServiceType } from "@/src/types/common";
import { MoverListResponse } from "@/src/types/card";

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

/**
 * 커서 기반 페이지네이션 기사님 찾기 (목록 조회) API
 * @param params { order: string, take: number, cursor?: string } 정렬 기준, 가져올 개수, 다음 커서
 * @returns Promise<MoverListResponse> 기사님 목록 응답
 */
export const fetchPaginatedMovers = async ({
  order,
  take,
  cursor,
}: {
  order: string;
  take: number;
  cursor?: string;
}) => {
  try {
    const response = await apiClient.get<MoverListResponse>("/mover", {
      params: { order, take, cursor },
    });
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
