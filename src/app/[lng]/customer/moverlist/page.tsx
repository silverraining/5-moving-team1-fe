"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { CardData, ChipData } from "@/src/types/card";
import { MoverFilterSidebar } from "@/src/components/customer/mover-list/MoverFilterSidebar";
import { LikedMoverList } from "@/src/components/customer/mover-list/LikedMoverList";
import { MoverCardList } from "@/src/components/customer/mover-list/MoverCardList";
import { useTheme, useMediaQuery } from "@mui/material";
import { fetchPaginatedMovers, MoverDetail } from "@/src/api/mover/api";
import { useInfiniteScroll } from "@/src/hooks/useInfiniteScroll";
import { ServiceType } from "@/src/types/common";
import { useMoverFilter } from "@/src/hooks/useMoverFilter";
import { useRouter } from "next/navigation";
import { PATH } from "@/src/lib/constants";
import { MoverList } from "@/src/components/customer/mover-list/MoverList";
import { useSearch } from "@/src/hooks/utill";
import { EmprtyReview } from "@/src/components/review/EmptyReview";

/**TODO:컴포넌트 분리 , 상세페이지 라우팅시 로딩 처리*/

// MoverDetail을 CardData 타입으로 변환하는 함수
function mapMoverDetailToCardData(item: MoverDetail): CardData {
  const serviceType = item.serviceType || {};
  const serviceRegion = item.serviceRegion || {};

  // 서비스 타입 칩들 먼저 생성
  const serviceTypeChips: ChipData[] = Object.entries(serviceType)
    .filter(([_, value]) => value)
    .map(([key]) => ({
      chipType: key as ServiceType,
    }));

  // isTargeted 칩 마지막에 추가
  const chips: ChipData[] = [...serviceTypeChips];
  if (item.isTargeted) {
    chips.push({ isTargeted: true });
  }

  return {
    id: item.id,
    types: Object.entries(serviceType)
      .filter(([_, value]) => value)
      .map(([key]) => key as ServiceType),
    message: item.intro || "",
    imgSrc: item.imageUrl || "/Images/profile/maleProfile.svg",
    name: item.nickname || "",
    isLiked: item.isLiked || false,
    like: item.likeCount || 0,
    rating: item.averageRating || 0,
    count: item.reviewCount || 0,
    career: item.experience || 0,
    confirm: item.confirmedEstimateCount || 0,
    address: Object.entries(serviceRegion)
      .filter(([_, value]) => value)
      .map(([key, _]) => key),
    chips,
  };
}

export default function MoverSearchPage() {
  const [movers, setMovers] = useState<MoverDetail[]>([]);
  const [allMovers, setAllMovers] = useState<MoverDetail[]>([]); // 전체 기사님 데이터
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const theme = useTheme();
  const router = useRouter();
  const search = useSearch();

  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));

  // 필터 훅 사용
  const {
    filters,
    setRegion,
    setServiceType,
    setSortBy,
    setSearchKeyword: setFilterSearchKeyword,
    resetFilters,
    getFilterParams,
  } = useMoverFilter();

  const handleCardClick = (moverId?: string) => {
    if (moverId) {
      router.push(PATH.moverDetail(moverId));
    }
  };

  // 클라이언트 사이드 검색
  const filterMoversBySearch = useCallback(
    (searchKeyword: string, moversData: MoverDetail[]) => {
      if (!searchKeyword.trim()) {
        return moversData;
      }

      const keyword = searchKeyword.toLowerCase().trim();

      const filtered = moversData.filter((mover) => {
        // 기사님 이름으로 검색
        const nameMatch =
          mover.nickname?.toLowerCase().includes(keyword) || false;

        // 서비스 타입으로 검색
        const serviceTypeMatch = mover.serviceType
          ? Object.entries(mover.serviceType)
              .filter(([_, value]) => value)
              .some(([key, _]) => key.toLowerCase().includes(keyword))
          : false;

        return nameMatch || serviceTypeMatch;
      });

      return filtered;
    },
    []
  );

  // 검색어 변경 시 필터링 (API 호출 없이)
  useEffect(() => {
    const filtered = filterMoversBySearch(search.debouncedValue, allMovers);
    setMovers(filtered);
    setFilterSearchKeyword(search.debouncedValue);
  }, [
    search.debouncedValue,
    allMovers,
    filterMoversBySearch,
    setFilterSearchKeyword,
  ]);

  // 초기화
  const handleReset = useCallback(() => {
    search.onClear();
    resetFilters();
  }, [search, resetFilters]);

  // 필터나 정렬이 변경될 때 데이터 다시 로드
  const loadMovers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const filterParams = getFilterParams();
      const params = {
        order: filterParams.sortBy,
        take: 5,
        ...(filterParams.region && { region: filterParams.region }),
        ...(filterParams.serviceType && {
          serviceType: filterParams.serviceType,
        }),
      };

      const data = await fetchPaginatedMovers(params);

      setAllMovers(data.movers);
      // 검색어가 이미 있다면 초기 로드 시에도 필터링
      const filtered = filterMoversBySearch(search.debouncedValue, data.movers);
      setMovers(filtered);
      setHasNext(data.hasNext);
      setNextCursor(data.nextCursor || null);
    } catch (err) {
      console.error("API 에러:", err);
      <EmprtyReview text="프로필을 등록해주세요." />;
    } finally {
      setLoading(false);
    }
  }, [getFilterParams, filterMoversBySearch]);

  // 초기 로드 및 필터 변경 시 데이터 로드 (검색어 변경 시에는 호출X)
  useEffect(() => {
    loadMovers();
  }, [filters.region, filters.serviceType, filters.sortBy]);

  // 무한 스크롤 추가 데이터 로드 함수
  const loadMore = useCallback(async () => {
    if (!hasNext || isFetchingNextPage) return;
    setIsFetchingNextPage(true);

    const filterParams = getFilterParams();
    const params = {
      order: filterParams.sortBy,
      take: 5,
      cursor: nextCursor || undefined,
      ...(filterParams.region && { region: filterParams.region }),
      ...(filterParams.serviceType && {
        serviceType: filterParams.serviceType,
      }),
    };

    try {
      const data = await fetchPaginatedMovers(params);
      const newAllMovers = [...allMovers, ...data.movers];
      setAllMovers(newAllMovers);

      const filtered = filterMoversBySearch(
        search.debouncedValue,
        newAllMovers
      );
      setMovers(filtered);

      setHasNext(data.hasNext);
      setNextCursor(data.nextCursor || null);
    } catch (err) {
    } finally {
      setIsFetchingNextPage(false);
    }
  }, [
    hasNext,
    isFetchingNextPage,
    nextCursor,
    getFilterParams,
    allMovers,
    search.debouncedValue,
    filterMoversBySearch,
  ]);

  // useInfiniteScroll 훅 사용
  const { loadMoreRef } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasNextPage: hasNext,
    isFetchingNextPage,
  });

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          flex: 1,
          py: 3,
          margin: "auto",
          px: { xs: 2, md: 4, lg: 4 },
        }}
      >
        <Box>
          <Box mb={6}>
            <Typography variant="SB_24">기사님 찾기</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "107px",
              justifyContent: "center",
              alignItems: "flex-start",
              marginX: "auto",
            }}
          >
            {/* 왼쪽: 필터 + 찜한 기사님 (데스크탑에서만 보임) */}
            {isDesktop && (
              <Box>
                <MoverFilterSidebar
                  selectedRegion={filters.region}
                  selectedServiceType={filters.serviceType}
                  searchKeyword={search.value}
                  onRegionChange={setRegion}
                  onServiceTypeChange={setServiceType}
                  onReset={handleReset}
                />
                <Box sx={{ height: "46px" }} />

                <LikedMoverList
                  likedMovers={allMovers
                    .filter((m) => m.isLiked)
                    .map(mapMoverDetailToCardData)}
                />
              </Box>
            )}

            {/* 오른쪽: 정렬 + 검색 + 카드 리스트 */}
            <Box sx={{ flex: 1 }}>
              <MoverCardList
                searchKeyword={search.value}
                onSearchChange={search.onChange}
                onSearchClear={search.onClear}
                selectedRegion={filters.region}
                selectedServiceType={filters.serviceType}
                selectedSort={filters.sortBy}
                onRegionChange={setRegion}
                onServiceTypeChange={setServiceType}
                onSortChange={setSortBy}
              />
              <MoverList
                movers={movers.map(mapMoverDetailToCardData)}
                loading={loading}
                error={error}
                searchKeywordForEmptyMessage={search.debouncedValue}
                isFetchingNextPage={isFetchingNextPage}
                loadMoreRef={loadMoreRef}
                onCardClick={handleCardClick}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
