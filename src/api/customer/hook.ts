import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  moverDetail,
  moverList,
  MoverListRequest,
  CustomerProfileRequest,
  registerCustomerProfile,
  UpdateCustomerProfileRequest,
  updateCustomerProfile,
  getCustomerProfile,
  EstimateRequestList,
  EstimateOfferList,
  EstimateRequestActive,
} from "./api";
import { ServiceRegion } from "@/src/types/common";

// 고객 프로필 관련 쿼리 키
const CUSTOMER_PROFILE_KEY = ["customer", "profile"] as const;

export const useMoverList = (params: MoverListRequest, enabled = true) => {
  const {
    location = ServiceRegion.SEOUL,
    serviceType = "HOME",
    sortBy = "rating",
  } = params;
  return useQuery({
    queryKey: ["moverList", { location, serviceType, sortBy }],
    queryFn: () => moverList({ location, serviceType, sortBy }),
    enabled, // 쿼리 활성화 여부
    staleTime: 1000 * 60 * 5, // 5분 간 캐시 유지
  });
};

export const useMoverDetail = (moverId: string, enabled = true) => {
  return useQuery({
    queryKey: ["moverDetail", moverId],
    queryFn: () => moverDetail(moverId),
    enabled: !!moverId && enabled, // moverId 없으면 요청 비활성화
    staleTime: 1000 * 60 * 5, // 5분 캐시 유지
  });
};

/** 일반 유저 프로필 등록 hook
 * TODO: 등록 후 쿼리 무효화
 */
export const useRegisterCustomerProfile = () => {
  return useMutation({
    mutationFn: (data: CustomerProfileRequest) => registerCustomerProfile(data),
  });
};

/** 일반 유저 프로필 조회 hook */
export const useGetCustomerProfile = (enabled = true) => {
  return useQuery({
    queryKey: CUSTOMER_PROFILE_KEY,
    queryFn: getCustomerProfile,
    enabled,
  });
};

/** 일반 유저 프로필 수정 hook */
export const useUpdateCustomerProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCustomerProfileRequest) =>
      updateCustomerProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_PROFILE_KEY });
    },
  });
};

// ** 견적 관리 활성화된 견적 요청 hook */
export const useEstimateRequestActive = () => {
  return useQuery({
    queryKey: ["EstimateRequestActive"],
    queryFn: EstimateRequestActive,
  });
};

/** 견적 관리 받았던 견적 hook */
export const useEstimateRequestList = () => {
  return useQuery({
    queryKey: ["EstimateRequestList"],
    queryFn: EstimateRequestList,
  });
};

/** 견적 관리 대기 중인 견적 hook */
export const useEstimateOfferList = (requestId: string) => {
  return useQuery({
    queryKey: ["EstimateOfferList", requestId],
    queryFn: () => EstimateOfferList(requestId),
    enabled: !!requestId,
  });
};
