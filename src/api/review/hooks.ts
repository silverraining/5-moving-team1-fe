import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createReview,
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
    enabled: !!moverId && moverId !== "undefined", // moverId가 있을 때만 API 호출 (빈 값이나 undefined일 때는 호출 안함)
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

export const useCreateReview = () => {
  return useMutation({
    mutationFn: ({
      completedOfferId,
      rating,
      comment,
    }: {
      completedOfferId: string;
      rating: number;
      comment: string;
    }) => createReview(completedOfferId, rating, comment),
  });
};
