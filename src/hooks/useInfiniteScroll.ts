import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  threshold?: number;
}
/**
 * IntersectionObserver API를 사용하여 특정 요소가 뷰포트에 노출되었을 때 추가 데이터를 로드
 * @param onLoadMore - 추가 데이터를 로드하는 콜백 함수
 * @param hasNextPage - 추가로 로드할 데이터가 있는지 여부
 * @param isFetchingNextPage - 현재 데이터를 로드 중인지 여부
 * @param threshold - 요소가 뷰포트에 노출되어야 하는 비율 (0.0 ~ 1.0, 기본값: 0.1)
 * @returns loadMoreRef - 관찰 대상 요소에 연결할 ref 객체
 */
export const useInfiniteScroll = ({
  onLoadMore,
  hasNextPage = false,
  isFetchingNextPage,
  threshold = 0.1,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // IntersectionObserver API를 사용하여 무한 스크롤 구현
    // viewPort 내에 요소가 threshold 비율만큼 노출되었을 때 콜백을 실행
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore();
        }
      },
      { threshold }
    );

    observerRef.current = observer;
    // 관찰 대상 등록
    // loadMoreRef에 할당된 요소를 observer가 감지할 수 있도록 observer.observe로 등록
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    // 클린업: observer 연결 해제
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore, threshold]);

  return { loadMoreRef };
}; 