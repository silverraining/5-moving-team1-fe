"use client";
import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import {
  CardData,
  ChipData,
  MoverListItem,
  MoverListResponse,
} from "@/src/types/card";
import { MoverFilterSidebar } from "@/src/components/customer/mover-list/MoverFilterSidebar";
import { LikedMoverList } from "@/src/components/customer/mover-list/LikedMoverList";
import { MoverCardList } from "@/src/components/customer/mover-list/MoverCardList";
import { useTheme, useMediaQuery } from "@mui/material";
import DropDownWrapper from "@/src/components/shared/components/drop-down/filter-drop-down/DropDownWrapper";
import { fetchPaginatedMovers } from "@/src/api/mover/api";
import { useInfiniteScroll } from "@/src/hooks/useInfiniteScroll";
/**TODO:필터, 정렬, 초기화 구현 
카드 클릭시 상세 페이지 라우팅 
찜한 기사 목록 API 연결결
컴포넌트 분리 
목록에서 하트 클릭 찜하기 가능 ? */

//MoverListItem 타입을 CardData 타입으로 변환하는 함수
function mapMoverListItemToCardData(item: MoverListItem): CardData {
  // 서비스 타입 칩들을 먼저 생성
  const serviceTypeChips = Object.entries(item.serviceType)
    .filter(([_, value]) => value)
    .map(([key]) => ({
      chipType: key as import("@/src/types/common").ServiceType,
    }));

  // isTargeted 칩을 마지막에 추가
  const chips: ChipData[] = [...serviceTypeChips];
  if (item.isTargeted) {
    chips.push({ isTargeted: true });
  }

  return {
    isTargeted: item.isTargeted,
    requestStatus: undefined,
    moveType: undefined,
    types: Object.entries(item.serviceType)
      .filter(([_, value]) => value)
      .map(([key]) => key as any),
    status: undefined,
    price: undefined,
    nickname: item.nickname,
    experience: item.experience,
    moveDate: undefined,
    imageUrl: item.imageUrl,
    intro: item.intro,
    averageRating: item.averageRating,
    reviewCount: item.reviewCount,
    likeCount: item.likeCount,
    isLiked: item.isLiked,
    confirmedCount: item.confirmedEstimateCount ?? 0,
    fromAddress: undefined,
    toAddress: undefined,
    chips,
  };
}

export default function MoverSearchPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [movers, setMovers] = useState<MoverListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const theme = useTheme();
  // desktop: 1200px 이상, tablet: 744~1199px, mobile: 0~743px
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const isTablet = useMediaQuery(theme.breakpoints.down("desktop"));
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"));
  // 이제 isTablet이 true면 태블릿+모바일 모두 포함

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPaginatedMovers({ order: "review_count DESC", take: 5 })
      .then((data) => {
        setMovers(data.movers);
        setHasNext(data.hasNext);
        setNextCursor(data.nextCursor);
      })
      .catch((err) => {
        setError("기사님 목록을 불러오지 못했습니다.");
      })
      .finally(() => setLoading(false));
  }, []);

  // 무한 스크롤 추가 데이터 로드 함수
  const loadMore = () => {
    if (!hasNext || isFetchingNextPage) return;
    setIsFetchingNextPage(true);
    fetchPaginatedMovers({
      order: "experience DESC",
      take: 5,
      cursor: nextCursor || undefined,
    })
      .then((data) => {
        setMovers((prev) => [...prev, ...data.movers]);
        setHasNext(data.hasNext);
        setNextCursor(data.nextCursor);
      })
      .finally(() => setIsFetchingNextPage(false));
  };

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
        bgcolor: (theme) => theme.palette.White[100],
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
          //px: "32px",
          py: 4,
          margin: "auto",
          px: { xs: 2, md: 4, lg: 0 },
        }}
      >
        <Box mb={6}>
          <h2 style={{ fontSize: "24px", fontWeight: 600 }}>기사님 찾기</h2>
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
              <MoverFilterSidebar />
              <Box sx={{ height: "46px" }} />

              <LikedMoverList
                likedMovers={movers
                  .filter((m) => m.isLiked)
                  .map(mapMoverListItemToCardData)}
              />
            </Box>
          )}

          {/* 오른쪽: 정렬 + 검색 + 카드 리스트 */}
          <Box sx={{ flex: 1 }}>
            {loading ? (
              <div>로딩 중...</div> // 스켈레톤이나 로딩 컴포넌트 추가
            ) : error ? (
              <div>{error}</div>
            ) : (
              <>
                <MoverCardList
                  movers={movers.map(mapMoverListItemToCardData)}
                  searchKeyword={searchKeyword}
                  setSearchKeyword={setSearchKeyword}
                />
                {/* 무한 스크롤 트리거 */}
                <div ref={loadMoreRef} style={{ height: 1 }} />
                {isFetchingNextPage && (
                  <Box display="flex" justifyContent="center" py={2}>
                    <CircularProgress size={32} />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
