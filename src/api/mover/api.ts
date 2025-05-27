import { EstimateRequest } from "@/src/types/estimate";
import apiClient from "../axiosclient";
import { ServiceType } from "@/src/types/common";

interface EstimateRequestRquest {
  serviceType: ServiceType[];
  filter: string[];
}
interface EstimateRequestResponse {
  data: EstimateRequest[];
}

export const estimateRequest = async ({
  serviceType,
  filter,
}: EstimateRequestRquest) => {
  try {
    const response = await apiClient.get<EstimateRequestResponse>(
      "/mover/estimate/request",
      {
        params: { serviceType, filter },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
