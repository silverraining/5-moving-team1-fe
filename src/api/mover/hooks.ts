import { useMutation, useQuery } from "@tanstack/react-query";
// 경로는 실제에 맞게 조정
import { ServiceType } from "@/src/types/common";
import {
  estimateRequest,
  registerMoverProfile,
  updateMoverProfile,
  updateGeneralMoverProfile,
  getMoverDetail,
  requestTargetedEstimate,
  fetchMoverProfileCard,
  fetchPaginatedMovers,
} from "./api";

interface UseEstimateRequestQueryParams {
  serviceType: ServiceType[];
  filter: string[];
  enabled?: boolean;
}

export const useEstimateRequest = ({
  serviceType,
  filter,
  enabled = true,
}: UseEstimateRequestQueryParams) => {
  return useQuery({
    queryKey: ["estimateRequest", serviceType, filter],
    queryFn: () => estimateRequest({ serviceType, filter }),
    enabled,
    staleTime: 1000 * 60 * 5, // 5분 캐시 (옵션)
  });
};

/** 기사님 프로필 등록 hook
 * TODO: 등록 후 쿼리 무효화
 */
export const useRegisterMoverProfile = () => {
  return useMutation({
    mutationFn: registerMoverProfile,
  });
};

/** 기사님 프로필 수정 hook */
export const useUpdateMoverProfile = () => {
  return useMutation({
    mutationFn: updateMoverProfile,
  });
};

/** 기사님 기본 정보 수정 hook */
export const useUpdateGeneralMoverProfile = () => {
  return useMutation({
    mutationFn: updateGeneralMoverProfile,
  });
};

/** 기사님 상세 정보 조회 hook */
export const useMoverDetail = (moverId: string) => {
  return useQuery({
    queryKey: ["mover", moverId],
    queryFn: () => getMoverDetail(moverId),
  });
};

/** 지정 견적 요청 hook */
export const useRequestTargetedEstimate = () => {
  return useMutation({
    mutationFn: ({
      requestId,
      moverProfileId,
    }: {
      requestId: string;
      moverProfileId: string;
    }) => requestTargetedEstimate(requestId, moverProfileId),
  });
};

/** 기사님 마이페이지 프로필 카드 조회 hook */
export const useMoverMypage = () => {
  return useQuery({
    queryKey: ["moverMypage"],
    queryFn: fetchMoverProfileCard,
  });
};

/** 커서 기반 페이지네이션 기사님 목록 조회 hook */
export const usePaginatedMovers = ({
  order,
  take,
  cursor,
  enabled = true,
}: {
  order: string;
  take: number;
  cursor?: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["paginatedMovers", order, take, cursor],
    queryFn: () => fetchPaginatedMovers({ order, take, cursor }),
    enabled,
    staleTime: 1000 * 60 * 5, // 5분 캐시 , 불필요시 삭제
  });
};
