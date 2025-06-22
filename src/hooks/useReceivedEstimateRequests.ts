import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchReceivedEstimateRequest } from "../api/mover/estimate/requested/api";
import { EstimateRequestResponse } from "../api/mover/estimate/requested/api";

export const receivedEstimateRequestsQueryKey = (
  sort: "move_date" | "created_at" = "move_date",
  isTargeted: boolean = false
) => ["receivedEstimateRequests", sort, isTargeted] as const;

export const useReceivedEstimateRequests = ({
  sort = "move_date",
  isTargeted,
}: {
  sort?: "move_date" | "created_at";
  isTargeted?: boolean;
}) => {
  return useInfiniteQuery<
    EstimateRequestResponse,
    Error,
    EstimateRequestResponse,
    ReturnType<typeof receivedEstimateRequestsQueryKey>,
    string | null
  >({
    queryKey: receivedEstimateRequestsQueryKey(sort, isTargeted), // queryKey 함수화
    queryFn: ({ pageParam = null }) =>
      fetchReceivedEstimateRequest({
        cursor: pageParam,
        sort,
        isTargeted,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
  });
};
