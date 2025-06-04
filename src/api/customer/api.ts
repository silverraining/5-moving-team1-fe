import { ServiceRegion, ServiceType } from "@/src/types/common";
import apiClient from "../axiosclient";

export type MoverListRequest = {
  location?: ServiceRegion;
  serviceType?: ServiceType;
  sortBy?: "review" | "rating" | "history" | "confirm";
};

export const moverList = async ({
  location = ServiceRegion.SEOUL,
  serviceType = "HOME",
  sortBy = "rating",
}: MoverListRequest) => {
  try {
    const response = await apiClient.get("/user/mover/list", {
      params: { location, serviceType, sortBy },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const moverDetail = async (moverId: string) => {
  try {
    const response = await apiClient.get(`/user/mover/detail/${moverId}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};
