import { useQuery } from "@tanstack/react-query";
import { moverDetail, moverList, MoverListRequest } from "./api";
import { ServiceRegion } from "@/src/types/common";

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
