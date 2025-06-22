import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendEstimateOffer,
  rejectEstimateRequest,
} from "@/src/api/mover/estimate/requested/api";
import { receivedEstimateRequestsQueryKey } from "./useReceivedEstimateRequests";

export const useEstimateModalActions = ({
  sort = "move_date",
  isTargeted = false,
}: {
  sort?: "move_date" | "created_at";
  isTargeted?: boolean;
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync: sendEstimate, isPending: isSending } = useMutation({
    mutationFn: ({
      requestId,
      price,
      comment,
    }: {
      requestId: string;
      price: number;
      comment: string;
    }) => sendEstimateOffer(requestId, { price, comment }),

    // 성공 시 서버 데이터 다시 가져오도록 캐시 무효화
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: receivedEstimateRequestsQueryKey(sort, isTargeted),
      });
    },
  });

  const { mutateAsync: rejectEstimate, isPending: isRejecting } = useMutation({
    mutationFn: ({
      requestId,
      comment,
    }: {
      requestId: string;
      comment: string;
    }) => rejectEstimateRequest(requestId, { comment }),

    // 성공 시 서버 데이터 다시 가져오도록 캐시 무효화
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: receivedEstimateRequestsQueryKey(sort, isTargeted),
      });
    },
  });

  return { sendEstimate, isSending, rejectEstimate, isRejecting };
};
