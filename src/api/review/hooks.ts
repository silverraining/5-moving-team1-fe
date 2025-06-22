import { useQuery } from "@tanstack/react-query";
import { getMoverReviews } from "./api";

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
