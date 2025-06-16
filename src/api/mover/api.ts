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

/** 기사님 프로필 카드 데이터 타입 */
export interface MoverProfileCardData {
  nickname: string; // 기사 이름
  intro: string; // 소개 문구
  imageUrl?: string; // 프로필 이미지 URL
  averageRating: number; // 평균 평점
  experience: number;
  reviewCount: number; // 리뷰 수
  confirmedCount: number; // 확정 건수
  serviceType?: string[]; // 서비스 종류
  serviceRegion: string[]; // 서비스 지역
}
/** 기사님 프로필 카드 조회 api */ //TODO: 확정건수 DB 데이터와 불일치, 평점 추가 필요 / 리뷰 조회 API 필요
export const fetchMoverProfileCard =
  async (): Promise<MoverProfileCardData> => {
    const response = await apiClient.get("/mover/me");
    const data = response.data;

    return {
      nickname: data.nickname,
      intro: data.intro,
      imageUrl: data.imageUrl || "",
      averageRating: data.average_rating,
      experience: data.experience,
      reviewCount: data.review_count,
      confirmedCount: data.confirmed_estimate_count,
      serviceType: data.serviceType?.split(",") ?? [],
      serviceRegion: data.serviceRegion?.split(",") ?? [],
    };
  };

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
