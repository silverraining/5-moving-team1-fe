import apiClient from "@/src/api/axiosclient";
import { CardData } from "@/src/types/card";
import { ChipProps } from "@/src/types/card";
import { AddressMinimal, ServiceType } from "@/src/types/common";
import { EstimateOffer } from "@/src/types/estimate";

export interface EstimateRequestItem {
  id: string;
  createdAt: string;
  moveType: ServiceType;
  moveDate: string;

  fromAddressMinimal?: AddressMinimal;
  toAddressMinimal?: AddressMinimal;

  isTargeted?: boolean;
  customerName?: string;

  offerCount: number;
  estimateOffers: EstimateOffer[];
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
  types: ServiceType[]; // ChipProps (예: ["소형이사"])
  name: string;
  date: Date;
  movingDay: string;
  from: string;
  to: string;
}

export const mapEstimateToCardData = (item: EstimateRequestItem): CardData => {
  const moveTypeMap: Record<ServiceType, string> = {
    SMALL: "소형이사",
    HOME: "가정이사",
    OFFICE: "사무실이사",
  };

  return {
    id: item.id,
    types: [moveTypeMap[item.moveType]],
    name: item.customerName ?? "이름 없음",
    date: new Date(item.createdAt),
    movingDay: item.moveDate,
    from: item.fromAddressMinimal?.sido ?? "출발지 없음",
    to: item.toAddressMinimal?.sigungu ?? "도착지 없음",
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
