"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import SendEstimateModal from "../../shared/components/modal/SendEstimateModal";
import RejectRequestModal from "../../shared/components/modal/RejectRequestModal";
import { CardListRequest } from "../../shared/components/card/CardListRequest";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { CheckboxList } from "../../shared/components/filter-check-box/CheckboxList";
import { SearchInput } from "../../shared/components/text-field/Search";
import MoveSortDropdown from "./MoveSortDropdown";
import FilterModal from "../../shared/components/modal/FilterModal";
import EmptyRequest from "./EmptyRequest";
import {
  testDataList,
  TransformedCardData,
  transformToCardData,
} from "./mockEstimateRequests";

export default function ReceivedRequestsFlow() {
  // url 뒤에 '?empty=true' 추가하면 빈 경우 확인 가능
  const searchParams = useSearchParams(); // 쿼리 파라미터로 빈 상태 체크 위해 추가, 배포 시 삭제해야 함
  const isEmptyTest = searchParams?.get("empty") === "true"; // 쿼리 파라미터로 빈 상태 체크 위해 추가, 배포 시 삭제해야 함

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("desktop")); // 모바일+태블릿일 때 포함

  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false); // 견적 보내기 모달 여닫기
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false); // 반려하기 모달 여닫기
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // 필터링 모달 여닫기
  const [moveTypeItems, setMoveTypeItems] = useState([
    // 이사유형 필터링
    { label: "소형이사", count: 10, checked: false },
    { label: "가정이사", count: 2, checked: false },
    { label: "사무실이사", count: 8, checked: false },
  ]);
  const [filterItems, setFilterItems] = useState([
    // 필터 필터링
    { label: "서비스 가능 지역", count: 10, checked: false },
    { label: "지정 견적 요청", count: 2, checked: false },
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

  // 빈 상태 테스트면 빈 배열, 아니면 기존 데이터 변환
  const transformedList: TransformedCardData[] = isEmptyTest
    ? []
    : testDataList.map(transformToCardData);

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
    setIsFilterModalOpen(false);
  };

  // 견적 보내기 모달 핸들러
  const handleSendClick = (request: (typeof testDataList)[0]) => {
    console.log("견적 보내기 버튼 눌리나 테스트");
    setSelectedRequest(request);
    setIsEstimateModalOpen(true);
  };

  // 견적 반려하기 모달 핸들러
  const handleRejectClick = (request: (typeof testDataList)[0]) => {
    console.log("반려 버튼 눌리나 테스트");
    setSelectedRequest(request);
    setIsRejectModalOpen(true);
  };

  // 견적 보내기 모달 - 콘솔로 데이터 확인(백엔드 연결 후 수정 필요)
  const handleSendEstimate = (formData: { price: number; comment: string }) => {
    console.log(
      "보내는 견적 데이터:",
      formData,
      "선택된 데이터",
      selectedRequest
    );
    setIsEstimateModalOpen(false);
  };

  // 반려하기 모달 - 콘솔로 데이터 확인(백엔드 연결 후 수정 필요)
  const handleSendReject = (reason: string) => {
    console.log("보내는 반려 사유:", reason, "선택된 데이터", selectedRequest);
    setIsRejectModalOpen(false);
  };

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
                const newItems = [...moveTypeItems];
                newItems[index].checked = checked;
                setMoveTypeItems(newItems);
              }}
              // 전체 선택
              onSelectAll={(checked) => {
                const newItems = moveTypeItems.map((item) => ({
                  ...item,
                  checked: checked,
                }));
                setMoveTypeItems(newItems);
              }}
            />
            <CheckboxList
              title="필터"
              items={filterItems}
              onItemChange={(index, checked) => {
                // 개별 체크박스 선택
                const newItems = [...filterItems];
                newItems[index].checked = checked;
                setFilterItems(newItems);
              }}
              // 전체 선택
              onSelectAll={(checked) => {
                const newItems = filterItems.map((item) => ({
                  ...item,
                  checked: checked,
                }));
                setFilterItems(newItems);
              }}
            />
          </Box>
          {/* 우측 검색, 드롭다운 등 헤더 영역 */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ marginBottom: isSmall ? "12px" : "24px" }}>
              <SearchInput
                variation="left"
                value={keyword}
                onChange={handleKeywordChange}
                onClick={handleClear} // 검색어 삭제 버튼에 적용됨
                placeholder="어떤 고객님을 찾고 게세요?"
                sx={{ bgcolor: theme.palette.NeutralGray[200], border: "none" }}
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
                  {transformedList.length}건
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "4px" }}>
                <MoveSortDropdown />
                {/* 모바일 환경: 필터 아이콘만 보이기 */}
                {isSmall && (
                  <>
                    <Button
                      onClick={() => setIsFilterModalOpen(true)}
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
                        onClick={() => setIsFilterModalOpen(true)}
                      />
                    </Button>
                    {isFilterModalOpen && (
                      <FilterModal
                        open={isFilterModalOpen}
                        onClose={() => setIsFilterModalOpen(false)}
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
              {transformedList.length === 0 ? (
                <EmptyRequest />
              ) : (
                transformedList.map((data) => (
                  <CardListRequest
                    key={data.id}
                    data={data}
                    onConfirmClick={() => {
                      const original = testDataList.find(
                        (item) => item.id === data.id
                      );
                      if (original) handleSendClick(original);
                    }}
                    onDetailClick={() => {
                      const original = testDataList.find(
                        (item) => item.id === data.id
                      );
                      if (original) handleRejectClick(original);
                    }}
                  />
                ))
              )}
              {/* 모달들 */}
              {isEstimateModalOpen && selectedRequest?.customer && (
                <SendEstimateModal
                  open={isEstimateModalOpen}
                  onClose={() => setIsEstimateModalOpen(false)}
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
                  onClose={() => setIsRejectModalOpen(false)}
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
}
