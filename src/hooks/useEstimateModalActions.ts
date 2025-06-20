import { useMutation } from "@tanstack/react-query";
import {
  sendEstimateOffer,
  rejectEstimateRequest,
} from "@/src/api/mover/estimate/requested/api";

export const useEstimateModalActions = () => {
  const sendEstimateMutation = useMutation({
    mutationFn: ({
      requestId,
      price,
      comment,
    }: {
      requestId: string;
      price: number;
      comment: string;
    }) => sendEstimateOffer(requestId, { price, comment }),
  });

  const rejectEstimateMutation = useMutation({
    mutationFn: ({
      requestId,
      comment,
    }: {
      requestId: string;
      comment: string;
    }) => rejectEstimateRequest(requestId, { comment }),
  });

  return { sendEstimateMutation, rejectEstimateMutation };
};
