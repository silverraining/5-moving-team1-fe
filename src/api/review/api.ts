import { ServiceType } from "@/src/types/common";
import apiClient from "../axiosclient";

interface ReviewResponse {
  reviews: {
    rating: number;
    comment: string;
    createdAt: string;
    customerName: string;
  }[];
  rating: {
    average: number;
    count: {
      "1": number;
      "2": number;
      "3": number;
      "4": number;
      "5": number;
    };
  };
  total: number;
}

export const getMoverReviews = async (
  moverId: string,
  page: number,
  take: number
): Promise<ReviewResponse> => {
  const response = await apiClient.get<ReviewResponse>(
    `/review/mover/${moverId}?page=${page}&take=${take}`
  );
  return response.data;
};

export type reviewableOffers = {
  moveType: ServiceType[];
  moveDate: string;
  price: number;
  isTargeted: boolean;
  mover: {
    nickname: string;
    imageUrl: string;
  };
};

export type getWriteReviewListRes = {
  reviewableOffers: reviewableOffers[];
  total: number;
};

export const getWriteReviewList = async (
  page: number = 1,
  take: number = 5
): Promise<getWriteReviewListRes> => {
  const response = await apiClient.get<getWriteReviewListRes>(
    `/review/available`,
    {
      params: {
        page: page,
        take: take,
      },
    }
  );
  return response.data;
};

export type getCompletedReviewsRes = {
  reviews: {
    moveType: ServiceType;
    isTargeted: boolean;
    createdAt: string;
    moveDate: string;
    price: number;
    rating: number;
    comment: string;
    mover: {
      nickname: string;
      imageUrl: string;
    };
  }[];
  total: number;
};

export const getCompletedReviews = async (
  page: number = 1,
  take: number = 5
): Promise<getCompletedReviewsRes> => {
  const response = await apiClient.get<getCompletedReviewsRes>(
    `/review/customer/me`,
    {
      params: {
        page: page,
        take: take,
      },
    }
  );
  return response.data;
};
