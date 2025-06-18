import { EstimateRequest } from "@/src/types/estimate";
import apiClient from "../axiosclient";
import { ServiceRegion, ServiceType } from "@/src/types/common";
import { MoverProfile } from "@/src/types/auth";
import {
  convertToServiceRegionArray,
  convertToServiceTypeArray,
} from "@/src/utils/util";

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
export type MoverProfileCardData = Pick<
  MoverProfile,
  | "nickname"
  | "intro"
  | "imageUrl"
  | "averageRating"
  | "experience"
  | "reviewCount"
  | "confirmedCount"
  | "serviceType"
  | "serviceRegions"
>;

//TODO: 확정건수 DB 데이터와 불일치, 평점 추가 필요 / 리뷰 조회 API 필요
/**
 * @function fetchMoverProfileCard
 * @returns {Promise<MoverProfileCardData>}
 * @description
 * 로그인된 기사님의 프로필 카드 정보 조회 API
 * @returns
 *  성공 시 기사님의 프로필 카드 정보를 포함한 Promise를 반환
 *  프로필 카드 정보에는 닉네임, 자기소개, 이미지 URL, 평균 평점, 경험 연수, 리뷰 수, 확정 견적 수, 서비스 유형, 서비스 지역 포함
 * @throws
 * API 요청 실패 시 에러가 발생하며, 에러 메시지를 포함합니다.
 */
export const fetchMoverProfileCard =
  async (): Promise<MoverProfileCardData> => {
    try {
      const response = await apiClient.get("/mover/me");
      const data = response.data;

      return {
        nickname: data.nickname,
        intro: data.intro,
        imageUrl: data.imageUrl ?? "",
        averageRating: data.average_rating ?? 0,
        experience: data.experience ?? 0,
        reviewCount: data.review_count ?? 0,
        confirmedCount: data.confirmed_estimate_count ?? 0,
        serviceType: convertToServiceTypeArray(data.serviceType),
        serviceRegions: convertToServiceRegionArray(data.serviceRegion),
      };
    } catch (error) {
      throw new Error("기사님 프로필 정보를 불러오지 못했습니다.");
    }
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
