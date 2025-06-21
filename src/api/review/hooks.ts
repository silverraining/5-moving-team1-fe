import { useQuery } from "@tanstack/react-query";
import {
  getCompletedReviews,
  getMoverReviews,
  getWriteReviewList,
} from "./api";

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

export const useWriteReviewsList = (page: number, take: number) => {
  return useQuery({
    queryKey: ["writeReviewsList", page, take],
    queryFn: () => getWriteReviewList(page, take),
  });
};

export const useCompletedReviews = (page: number, take: number) => {
  return useQuery({
    queryKey: ["completedReviews", page, take],
    queryFn: () => getCompletedReviews(page, take),
  });
};
