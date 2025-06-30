import { EstimateRequest } from "@/src/types/estimate";
import apiClient from "../axiosclient";
import { ServiceRegion, ServiceType } from "@/src/types/common";
import { SERVICE_TYPE_MAP } from "@/src/lib/constants";
import { convertKoreanToServiceRegion } from "@/src/utils/util";

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

/** 기사님 프로필 조회 api */
export const getMoverProfile = async (): Promise<MoverProfileRequest> => {
  try {
    const response = await apiClient.get<MoverProfileRequest>("/mover/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface UpdateGeneralMoverProfileRequest {
  name: string;
  phone: string | null;
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

/** 기사님 목록 응답 타입 */
export interface MoverListResponse {
  movers: MoverDetail[];
  nextCursor?: string;
  hasNext: boolean;
}

/**
 * 커서 기반 페이지네이션 기사님 찾기 (목록 조회) API
 * @param params { order: string, take: number, cursor?: string, region?: string, serviceType?: string, search?: string } 정렬 기준, 가져올 개수, 다음 커서, 지역 필터, 서비스 타입 필터, 검색어
 * @returns Promise<MoverListResponse> 기사님 목록 응답
 */
export const fetchPaginatedMovers = async ({
  order,
  take,
  cursor,
  region,
  serviceType,
  search,
}: {
  order: string;
  take: number;
  cursor?: string;
  region?: string;
  serviceType?: string;
  search?: string;
}) => {
  try {
    const params: any = { order, take };

    if (cursor) params.cursor = cursor;

    if (region && region !== "전체") {
      // 한글 지역명을 ServiceRegion enum 값으로 변환
      const regionKey = convertKoreanToServiceRegion(region);

      // 백엔드에서 serviceRegion 파라미터를 사용
      params.serviceRegion = regionKey || region;
    }

    if (serviceType && serviceType !== "전체") {
      // 프론트엔드 서비스 타입을 백엔드 서비스 타입으로 매핑
      const mappedServiceType = SERVICE_TYPE_MAP[serviceType];
      params.serviceType = mappedServiceType || serviceType;
    }

    if (search) params.search = search;

    const response = await apiClient.get<MoverListResponse>("/mover", {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 기사가 보낸 견적 목록 api */
export const EstimateOffer = async () => {
  try {
    const response = await apiClient.get("/estimate-offer/offers");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 기사가 보낸 견적 상세 api */
export const EstimateOfferId = async (offerId: string) => {
  try {
    const response = await apiClient.get(`/estimate-offer/${offerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 기사가 반려한 견적 목록 api */
export const EstimateOfferReject = async () => {
  try {
    const response = await apiClient.get("/estimate-offer/rejected-offers");
    return response.data;
  } catch (error) {
    throw error;
  }
};
