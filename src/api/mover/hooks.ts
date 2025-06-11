import { useMutation, useQuery } from "@tanstack/react-query";
// 경로는 실제에 맞게 조정
import { ServiceType } from "@/src/types/common";
import { estimateRequest, registerMoverProfile } from "./api";

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
