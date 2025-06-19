import apiClient from "@/src/api/axiosclient";
import { MinimalAddress, ServiceType, ChipType } from "@/src/types/common";
import { ReceivedEstimateRequest } from "@/src/types/estimate";
import { MoverProfile } from "@/src/types/auth";
export interface EstimateRequestItem {
  id: string;
  createdAt: string;
  moveType: ServiceType;
  moveDate: string;

  fromAddressMinimal?: MinimalAddress;
  toAddressMinimal?: MinimalAddress;

  isTargeted?: boolean;
  customerName?: string;

  offerCount: number;
  estimateOffers: ReceivedEstimateRequest[];
}

// 무한스크롤 등 목록 응답용
export interface EstimateRequestResponse {
  items: EstimateRequestItem[];
  nextCursor: string | null;
  hasNext: boolean;
  totalCount: number;
}

// 변환 함수
export interface CardData {
  id: string;
  moveType: ChipType;
  customerName: string;
  createdAt: Date;
  moveDate: Date;
  fromAddressMinimal?: MinimalAddress;
  toAddressMinimal?: MinimalAddress;
  offerCount: number;
  estimateOffers: ReceivedEstimateRequest[];
  isTargeted: boolean;
}

export const mapEstimateToCardData = (item: EstimateRequestItem): CardData => {
  return {
    id: item.id,
    moveType: item.moveType,
    customerName: item.customerName ?? "이름 없음",
    createdAt: new Date(item.createdAt),
    moveDate: new Date(item.moveDate),
    fromAddressMinimal: item.fromAddressMinimal,
    toAddressMinimal: item.toAddressMinimal,
    offerCount: item.offerCount,
    estimateOffers: item.estimateOffers ?? [], // 배열 없으면 빈 배열로 처리
    isTargeted: item.isTargeted ?? false,
  };
};

/**
 * 4. 기사 측에서 받은 이사 견적 요청 목록 조회 (with cursor)
 */

interface FetchEstimateRequestParams {
  cursor?: string | null;
  take?: number;
  sort?: "move_date" | "created_at";
  isTargeted?: boolean;
}

// 받은 견적 요청 목록 불러오기
export const fetchReceivedEstimateRequest = async ({
  cursor = null,
  take = 5,
  sort,
}: FetchEstimateRequestParams): Promise<EstimateRequestResponse> => {
  const params: Record<string, string | boolean | undefined> = {
    take: String(take),
    ...(sort && { orderField: sort }),
    ...(cursor && { cursor }),
  };

  try {
    const response = await apiClient.get<EstimateRequestResponse>(
      "/estimate-request",
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("견적 요청 목록 조회 실패:", error);
    throw new Error("견적 요청 목록을 불러오지 못했습니다.");
  }
};

// 기사님 프로필 정보 조회(서비스 가능 지역 필터링에 필요)
export const fetchMoverMe = async (): Promise<MoverProfile> => {
  try {
    const response = await apiClient.get<MoverProfile>("/mover/me");
    return response.data;
  } catch (error) {
    console.error("기사 프로필 조회 실패:", error);
    throw new Error("기사 프로필을 불러오지 못했습니다.");
  }
};
