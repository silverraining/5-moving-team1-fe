import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
  useInfiniteQuery,
  QueryFunctionContext,
} from "@tanstack/react-query";
import {
  moverList,
  MoverListRequest,
  CustomerProfileRequest,
  registerCustomerProfile,
  UpdateCustomerProfileRequest,
  updateCustomerProfile,
  getCustomerProfile,
  EstimateRequestActive,
  EstimateOfferPending,
  EstimateRequestHistory,
  EstimateOfferDetail,
  EstimateOfferConfirmed,
  ConfirmRes,
  EstimateRequestHistoryResponse,
  requestRejectReq,
  requestReject,
} from "./api";
import { completeEstimateRequest } from "./request/api";
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
export const useEstimateRequestHistory = (take = 5) =>
  useInfiniteQuery({
    queryKey: ["EstimateRequestHistory", take],
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      EstimateRequestHistory(pageParam, take),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: undefined,
  });

/** 견적 관리 대기 중인 견적 hook */
export const useEstimateOfferPending = (requestId: string, take = 5) =>
  useInfiniteQuery({
    queryKey: ["EstimateOfferPendingInfinite", requestId, take],
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      EstimateOfferPending(requestId, pageParam, take),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !!requestId, // requestId가 있을 때만 요청
    initialPageParam: undefined,
  });

/** 대기 중인, 받았던 견적 상세보기 hook */
export const useEstimateOfferDetail = (requestId: string, moverId: string) => {
  return useQuery({
    queryKey: ["EstimateOfferDetail", requestId, moverId],
    queryFn: () => EstimateOfferDetail(requestId, moverId),
    enabled: !!requestId && !!moverId,
  });
};

/** 견적 요청 확정 hook */
export const useEstimateOfferConfirmed = (): UseMutationResult<
  ConfirmRes,
  Error,
  { offerId: string }
> => {
  return useMutation({
    mutationFn: ({ offerId }: { offerId: string }) =>
      EstimateOfferConfirmed(offerId),
  });
};
export const useEstimateRequestCancle = (): UseMutationResult<
  requestRejectReq,
  Error,
  string
> => {
  return useMutation<requestRejectReq, Error, string>({
    mutationFn: (requestId: string) => requestReject(requestId),
  });
};

/** 이사 완료 처리 hook */
export const useCompleteEstimateRequest = (): UseMutationResult<
  { message: string },
  Error,
  string
> => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string>({
    mutationFn: (requestId: string) => completeEstimateRequest(requestId),
    onSuccess: () => {
      // 성공 시 관련 쿼리 무효화 새로고침
      queryClient.invalidateQueries({ queryKey: ["EstimateRequestActive"] });
      queryClient.invalidateQueries({ queryKey: ["EstimateRequestHistory"] });
    },
  });
};
