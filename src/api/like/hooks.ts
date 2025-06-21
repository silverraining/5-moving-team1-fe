import {
  useQuery,
  UseQueryResult,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import {
  createLikeMover,
  deleteLikeMover,
  getLikeList,
  likeMoverListRes,
  likeRes,
} from "./api";

/**
 * 무버 찜 목록을 조회하는 React Query 훅입니다.
 *
 * @param enabled - 자동 실행 여부를 제어하는 boolean 값입니다. 기본값은 true입니다.
 * @returns likeMoverListRes 타입의 찜한 무버 리스트 데이터를 포함한 쿼리 결과 객체를 반환합니다.
 */
export const useLikeList = (
  enabled = true
): UseQueryResult<likeMoverListRes, Error> => {
  return useQuery({ queryKey: ["likeList"], queryFn: getLikeList, enabled });
};
/**
 * 무버를 찜(좋아요)하는 API를 호출하는 React Query Mutation 훅입니다.
 * @param moverId 기사 프로필 ID
 * @returns mutation 객체로, mutate 함수 등을 사용할 수 있습니다.
 */

export const useCreateLike = (): UseMutationResult<
  likeRes,
  Error,
  { moverId: string }
> => {
  return useMutation({
    mutationFn: ({ moverId }: { moverId: string }) => createLikeMover(moverId),
  });
};

/**
 * 무버 찜을 취소(좋아요 해제)하는 API를 호출하는 React Query Mutation 훅입니다.
 * @param moverId 기사 프로필 ID
 * @returns mutation 객체로, mutate 함수 등을 사용할 수 있습니다.
 */

export const useDeleteLike = (): UseMutationResult<
  likeRes,
  Error,
  { moverId: string }
> => {
  return useMutation({
    mutationFn: ({ moverId }: { moverId: string }) => deleteLikeMover(moverId),
  });
};
