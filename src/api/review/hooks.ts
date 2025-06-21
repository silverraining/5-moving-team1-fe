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
  });
};
