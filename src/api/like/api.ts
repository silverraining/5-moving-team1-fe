import axios from "axios";
import apiClient from "../axiosclient";

export type likeRes = { message: string };

export type likeMoverListRes = {
  id: string;
  nickname: string;
  imageUrl: string;
  experience: number;
  serviceType: {
    SMALL: boolean;
    HOME: boolean;
    OFFICE: boolean;
  };
  review_count: number;
  average_rating: number;
  confirmed_estimate_count: number;
  likeCount: number;
}[];
/**
 * 찜하기 APi
 * @param moverId 기사 프로필 ID
 * @returns
 */
export const createlikeMover = async (moverId: string): Promise<likeRes> => {
  try {
    const response = await apiClient.post(`/like/${moverId}`, {});
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("찜하기 실패");
  }
};
/**
 * 찜하기 취소 API
 * @param moverId
 * @returns
 */
export const deletelikeMover = async (moverId: string): Promise<likeRes> => {
  try {
    const response = await apiClient.delete(`/like/${moverId}`, {});
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("찜하기 취소 실패");
  }
};

/**
 * 찜한 기사 목록 API
 * @returns
 */
export const getLikeList = async (): Promise<likeMoverListRes> => {
  try {
    const response = await apiClient.get(`like`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("찜한 기사 목록 불러오기 실패");
  }
};
