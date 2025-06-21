import { useQuery } from "@tanstack/react-query";
import { getMoverReviews } from "./api";

/**
 * 기사님 리뷰 조회 훅
 * @param moverId - 기사님 ID
 * @param page - 페이지 번호
 * @param take - 페이지당 항목 수
 * @returns 기사님 리뷰 데이터
 */
export const useMoverReviews = (
  moverId: string,
  page: number,
  take: number
) => {
  return useQuery({
    queryKey: ["moverReviews", moverId, page, take],
    queryFn: () => getMoverReviews(moverId, page, take),
    enabled: !!moverId && moverId !== "undefined", // moverId가 있을 때만 API 호출 (빈 값이나 undefined일 때는 호출 안함)
  });
};
