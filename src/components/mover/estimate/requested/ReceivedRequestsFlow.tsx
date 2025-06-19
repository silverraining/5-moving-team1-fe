"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import SendEstimateModal from "../../../shared/components/modal/SendEstimateModal";
import RejectRequestModal from "../../../shared/components/modal/RejectRequestModal";
import { CardListRequest } from "../../../shared/components/card/CardListRequest";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { CheckboxList } from "../../../shared/components/filter-check-box/CheckboxList";
import { SearchInput } from "../../../shared/components/text-field/Search";
import MoveSortDropdown from "./MoveSortDropdown";
import FilterModal from "../../../shared/components/modal/FilterModal";
import EmptyRequest from "./EmptyRequest";
import { testDataList } from "./mockEstimateRequests";
import useModalStates from "@/src/hooks/useModalStates";
import { useReceivedEstimateRequests } from "@/src/hooks/useReceivedEstimateRequests";
import {
  mapEstimateToCardData,
  EstimateRequestItem,
  fetchMoverMe,
} from "@/src/api/mover/estimate/requested/api";
import {
  filterEstimateRequests,
  areItemsEqual,
  SIDO_TO_SERVICE_REGION,
} from "@/src/utils/filterEstimateRequests";
import { MoverProfile } from "@/src/types/auth";
import { ServiceType } from "@/src/lib/constants";

type ServiceTypeLabel = (typeof ServiceType)[number];

export default function ReceivedRequestsFlow() {
  console.log("ReceivedRequestsFlow 렌더됨");
  // url 뒤에 '?empty=true' 추가하면 빈 경우 확인 가능
  const searchParams = useSearchParams(); // 쿼리 파라미터로 빈 상태 체크 위해 추가, 배포 시 삭제해야 함
  const isEmptyTest = searchParams?.get("empty") === "true"; // 쿼리 파라미터로 빈 상태 체크 위해 추가, 배포 시 삭제해야 함

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("desktop")); // 모바일+태블릿일 때 포함
  const {
    isEstimateModalOpen,
    isRejectModalOpen,
    isFilterModalOpen,
    openEstimateModal,
    closeEstimateModal,
    openRejectModal,
    closeRejectModal,
    openFilterModal,
    closeFilterModal,
  } = useModalStates();

  const [moveTypeItems, setMoveTypeItems] = useState<
    { label: ServiceTypeLabel; count: number; checked: boolean }[]
  >([
    { label: "소형이사", count: 0, checked: false },
    { label: "가정이사", count: 0, checked: false },
    { label: "사무실이사", count: 0, checked: false },
  ]);

  const [filterItems, setFilterItems] = useState([
    // 필터 필터링
    { label: "서비스 가능 지역", count: 0, checked: false },
    { label: "지정 견적 요청", count: 0, checked: false },
  ]);
  const [keyword, setKeyword] = useState(""); // 검색어
  const [checked, setChecked] = useState({
    // 필터링 상태
    all: true,
    small: false,
    home: false,
    office: false,
  });
  const [selectedRequest, setSelectedRequest] = useState<
    // 선택된 견적건
    (typeof testDataList)[0] | null
  >(null);

  // 기사 프로필 데이터 fetch
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await fetchMoverMe();
        setMoverProfile(profile);
      } catch (e) {
        console.error("프로필 로딩 실패", e);
      }
    };
    fetchProfile();
  }, []);

  const [moverProfile, setMoverProfile] = useState<MoverProfile | null>(null); // 기사 정보

  const EstimateRequestPageClient = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
      useReceivedEstimateRequests({
        sort: "move_date", // 혹은 상태 값에 따라 "createdAt"
        isTargeted: false, // 혹은 true 또는 undefined (전체)
      });
    console.log("✅ useReceivedEstimateRequests 결과", {
      isLoading,
      data,
    });
    console.log("API에서 받아온 데이터 구조 확인:", data);

    // 실제 API로 받은 데이터 목록 정리
    const estimateItems = data?.pages?.flatMap((page) => page.items) ?? [];

    // 필터링된 데이터 적용
    const filteredItems = filterEstimateRequests({
      items: estimateItems,
      moveTypeItems,
      filterItems,
      moverProfile,
    });

    // 📎 useEffect 추가: 필터 count를 estimateItems 기준으로 동기화
    useEffect(() => {
      if (!estimateItems.length) return;
      if (!moverProfile) return;

      // 📎 1. 이사 유형별 카운트 계산
      const moveTypeCounts: Record<ServiceTypeLabel, number> = {
        소형이사: 0,
        가정이사: 0,
        사무실이사: 0,
      };
      // 📎 2. 필터별 카운트 계산
      let targetedCount = 0;
      let regionCount = 0;

      // 서비스 가능 지역이 true인 region들 배열로 추출
      const activeRegions = Object.entries(moverProfile.serviceRegion)
        .filter(([_, isActive]) => isActive)
        .map(([region]) => region);

      estimateItems.forEach((item) => {
        // moveType count
        if (item.moveType === "SMALL") moveTypeCounts["소형이사"]++;
        if (item.moveType === "HOME") moveTypeCounts["가정이사"]++;
        if (item.moveType === "OFFICE") moveTypeCounts["사무실이사"]++;

        // 지정 견적 요청 필터 count
        if (item.isTargeted) targetedCount++;

        // 서비스 가능 지역 필터 count
        const sido = item.fromAddressMinimal?.sido;
        const regionEnum = sido ? SIDO_TO_SERVICE_REGION[sido] : undefined;

        const matched = regionEnum ? activeRegions.includes(regionEnum) : false;
        if (matched) regionCount++;
      });

      // 이전 상태와 비교할 새로운 상태 생성
      const newMoveTypeItems = moveTypeItems.map((item) => ({
        ...item,
        count: moveTypeCounts[item.label as ServiceTypeLabel],
      }));

      const newFilterItems = filterItems.map((item) => {
        if (item.label === "서비스 가능 지역") {
          return { ...item, count: regionCount };
        }
        if (item.label === "지정 견적 요청") {
          return { ...item, count: targetedCount };
        }
        return item;
      });

      // 이전 상태와 다를 때만 setState 호출
      if (!areItemsEqual(moveTypeItems, newMoveTypeItems)) {
        setMoveTypeItems(newMoveTypeItems);
      }
      if (!areItemsEqual(filterItems, newFilterItems)) {
        setFilterItems(newFilterItems);
      }
    }, [estimateItems, moverProfile, moveTypeItems, filterItems]);
    console.log("estimateItems:", estimateItems);

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    };

    const handleClear = () => {
      setKeyword("");
    };

    // 전체선택 핸들러
    const count = {
      all: 4,
      small: 1,
      home: 2,
      office: 1,
    };

    const indeterminate =
      !checked.all &&
      [checked.small, checked.home, checked.office].some(Boolean) &&
      ![checked.small, checked.home, checked.office].every(Boolean);

    // 전체선택 핸들러
    const handleAllChange = (value: boolean) => {
      setChecked({
        all: value,
        small: false,
        home: false,
        office: false,
      });
    };

    // 개별선택 핸들러
    const handleIndividualChange = (
      key: "small" | "home" | "office",
      value: boolean
    ) => {
      const updated = {
        ...checked,
        all: false,
        [key]: value,
      };
      setChecked(updated);
    };

    const handleSubmit = (next: typeof checked) => {
      setChecked(next);
      closeFilterModal();
    };

    // 견적 보내기 모달 핸들러
    const handleSendClick = (request: EstimateRequestItem) => {
      console.log("견적 보내기 버튼 눌리나 테스트");
      setSelectedRequest(request);
      openEstimateModal();
    };

    // 견적 반려하기 모달 핸들러
    const handleRejectClick = (request: EstimateRequestItem) => {
      console.log("반려 버튼 눌리나 테스트");
      setSelectedRequest(request);
      openRejectModal();
    };

    // 견적 보내기 모달 - 콘솔로 데이터 확인(백엔드 연결 후 수정 필요)
    const handleSendEstimate = (formData: {
      price: number;
      comment: string;
    }) => {
      console.log(
        "보내는 견적 데이터:",
        formData,
        "선택된 데이터",
        selectedRequest
      );
      closeEstimateModal();
    };

    // 반려하기 모달 - 콘솔로 데이터 확인(백엔드 연결 후 수정 필요)
    const handleSendReject = (reason: string) => {
      console.log(
        "보내는 반려 사유:",
        reason,
        "선택된 데이터",
        selectedRequest
      );
      closeRejectModal();
    };

    if (isLoading || !data || !estimateItems) {
      return <CircularProgress />;
    }

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant={isSmall ? "SB_18" : "SB_24"}
            sx={{
              py: isSmall ? "14px" : "32px",
              width: "100%",
              textAlign: "left",
            }}
          >
            받은 요청
          </Typography>
          <Box sx={{ display: "flex", gap: "107px" }}>
            {/* 좌측 필터 영역 */}
            <Box
              sx={{
                display: isSmall ? "none" : "flex",
                flexDirection: "column",
              }}
            >
              <CheckboxList
                title="이사 유형"
                items={moveTypeItems}
                onItemChange={(index, checked) => {
                  // 개별 체크박스 선택
                  const newItems = moveTypeItems.map((item, i) =>
                    i === index ? { ...item, checked } : item
                  );
                  setMoveTypeItems(newItems);
                }}
                // 전체 선택
                onSelectAll={(checked) => {
                  const newItems = moveTypeItems.map((item) => ({
                    ...item,
                    checked,
                  }));
                  setMoveTypeItems(newItems);
                }}
              />
              <CheckboxList
                title="필터"
                items={filterItems}
                onItemChange={(index, checked) => {
                  // 개별 체크박스 선택
                  const newItems = filterItems.map((item, i) =>
                    i === index ? { ...item, checked } : item
                  );
                  setFilterItems(newItems);
                }}
                // 전체 선택
                onSelectAll={(checked) => {
                  const newItems = filterItems.map((item) => ({
                    ...item,
                    checked,
                  }));
                  setFilterItems(newItems);
                }}
              />
            </Box>
            {/* 우측 검색, 드롭다운 등 헤더 영역 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: ["375px", "601px", "955px"],
              }}
            >
              <Box sx={{ marginBottom: isSmall ? "12px" : "24px" }}>
                <SearchInput
                  variation="left"
                  value={keyword}
                  onChange={handleKeywordChange}
                  onClick={handleClear} // 검색어 삭제 버튼에 적용됨
                  placeholder="어떤 고객님을 찾고 게세요?"
                  sx={{
                    bgcolor: theme.palette.NeutralGray[200],
                    border: "none",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: ["16px", "20px", "32px"],
                }}
              >
                <Box>
                  <Typography variant={isSmall ? "M_13" : "M_16"}>
                    전체{" "}
                  </Typography>
                  <Typography variant={isSmall ? "SB_13" : "SB_16"}>
                    {filteredItems.length}건
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "4px" }}>
                  <MoveSortDropdown />
                  {/* 모바일 환경: 필터 아이콘만 보이기 */}
                  {isSmall && (
                    <>
                      <Button
                        onClick={() => openFilterModal()}
                        sx={{
                          padding: 0,
                          width: "32px",
                          height: "32px",
                          minWidth: "32px",
                        }}
                      >
                        <Image
                          src="/Images/icon-btn/sort_button.svg"
                          width={32}
                          height={32}
                          alt="필터"
                          style={{ cursor: "pointer" }}
                        />
                      </Button>
                      {isFilterModalOpen && (
                        <FilterModal
                          open={isFilterModalOpen}
                          onClose={() => closeFilterModal()}
                          count={count}
                          checked={checked}
                          indeterminate={indeterminate}
                          onAllChange={handleAllChange}
                          onIndividualChange={handleIndividualChange}
                          onSubmit={handleSubmit}
                        />
                      )}
                    </>
                  )}
                </Box>
              </Box>
              {/* 우측 카드 리스트 또는 EmptyRequest 조건부 렌더링 */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ["24px", "32px", "48px"],
                }}
              >
                {filteredItems.length === 0 ? (
                  <EmptyRequest />
                ) : (
                  <Box>
                    {filteredItems.map((item) => (
                      <CardListRequest
                        key={item.requestId}
                        data={mapEstimateToCardData(item)}
                        onConfirmClick={() => handleSendClick(item)}
                        onDetailClick={() => handleRejectClick(item)}
                      />
                    ))}
                  </Box>
                )}
                {/* 모달들 */}
                {isEstimateModalOpen && selectedRequest?.customer && (
                  <SendEstimateModal
                    open={isEstimateModalOpen}
                    onClose={() => closeEstimateModal()}
                    onSend={handleSendEstimate}
                    moveType={[selectedRequest.moveType]} // 배열로 감싸기
                    customerName={selectedRequest.customer.user.name}
                    moveDate={selectedRequest.moveDate}
                    fromAddress={selectedRequest.fromAddress.fullAddress}
                    toAddress={selectedRequest.toAddress.fullAddress}
                  />
                )}
                {isRejectModalOpen && selectedRequest?.customer && (
                  <RejectRequestModal
                    open={isRejectModalOpen}
                    onClose={() => closeRejectModal()}
                    onSubmit={handleSendReject}
                    moveType={[selectedRequest.moveType]} // 배열로 감싸기
                    customerName={selectedRequest.customer.user.name}
                    moveDate={selectedRequest.moveDate}
                    fromAddress={selectedRequest.fromAddress.fullAddress}
                    toAddress={selectedRequest.toAddress.fullAddress}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };
  return <EstimateRequestPageClient />;
}
