import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchReceivedEstimateRequest } from "../api/mover/estimate/requested/api";
import { EstimateRequestResponse } from "../api/mover/estimate/requested/api";

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
    [string, string?, boolean?],
    string | null
  >({
    queryKey: ["receivedEstimateRequests", sort, isTargeted],
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
