import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  moverDetail,
  moverList,
  MoverListRequest,
  CustomerProfileRequest,
  registerCustomerProfile,
  UpdateCustomerProfileRequest,
  updateCustomerProfile,
} from "./api";
import { ServiceRegion } from "@/src/types/common";
import { API_BASE_URL } from "@/src/lib/constants";

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

/** 일반 유저 프로필 수정 hook
 * TODO: 수정 후 쿼리 무효화
 */
export const useUpdateCustomerProfile = () => {
  return useMutation({
    mutationFn: (data: UpdateCustomerProfileRequest) =>
      updateCustomerProfile(data),
  });
};
