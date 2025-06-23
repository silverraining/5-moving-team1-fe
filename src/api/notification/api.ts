import axios from "axios";
import apiClient from "../axiosclient";

export type notificationAllRes = {
  id: string;
  type: string;
  message: string;
  targetId: string;
  isRead: boolean;
  createdAt: string;
};

export type notificationReadReq = {
  id?: string;
  ids?: string[];
};
/**
 * 알림 전체 조회
 * @returns {Promise<notificationAllRes[]>} - 알림 목록
 */
export const notificationAll = async (): Promise<notificationAllRes[]> => {
  try {
    const response = await apiClient.get(`/notifications`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("알림 조회 실패");
  }
};
/**
 * 알림 읽기
 * @param id - 단일 알림 ID
 * @param ids - 여러 알림 ID 배열
 * @param {notificationReadReq} param0 - 알림 읽기 요청 객체
 * @param param0
 */
export const notificationRead = async ({
  id,
  ids,
}: notificationReadReq): Promise<void> => {
  try {
    if (id) {
      await apiClient.patch(`/notifications/read`, { id });
    } else if (ids && ids.length > 0) {
      await apiClient.patch(`/notifications/read`, { ids });
    } else {
      throw new Error("id 또는 ids를 반드시 전달해야 합니다.");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("알림 읽음 처리 실패");
  }
};
