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
