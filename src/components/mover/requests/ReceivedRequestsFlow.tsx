"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import SendEstimateModal from "../../shared/components/modal/SendEstimateModal";
import RejectRequestModal from "../../shared/components/modal/RejectRequestModal";
import { CardListRequest } from "../../shared/components/card/CardListRequest";
import { CardData } from "@/src/types/card";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import dayjs from "dayjs";
import { CheckboxList } from "../../shared/components/filter-check-box/CheckboxList";
import { SearchInput } from "../../shared/components/text-field/Search";
import MoveSortDropdown from "./MoveSortDropdown";
import FilterModal from "../../shared/components/modal/FilterModal";
import EmptyRequest from "./EmptyRequest";

type TestReceivedRequestRaw = {
  id: string;
  moveType: "SMALL" | "HOME" | "OFFICE";
  status: string;
  moveDate: string;
  fromAddress: { fullAddress: string };
  toAddress: { fullAddress: string };
  customer: {
    imageUrl: string | null;
    serviceType: {
      SMALL: boolean;
      HOME: boolean;
      OFFICE: boolean;
    };
    user: {
      name: string;
    };
  };
};

// CardListRequest에서 요구하는 형식 (ChipProps["type"][])
type TransformedCardData = {
  id: string;
  name: string;
  date: string;
  movingDay: string;
  from: string;
  to: string;
  types: ("small" | "home" | "office")[];
};

const testDataList: TestReceivedRequestRaw[] = [
  {
    id: "1",
    moveType: "HOME",
    status: "PENDING",
    moveDate: "2025-06-01T00:00:00.000Z",
    fromAddress: { fullAddress: "서울 중구 삼일대로 343" },
    toAddress: { fullAddress: "서울 중구 청계천로 100" },
    customer: {
      imageUrl: null,
      serviceType: { SMALL: false, HOME: true, OFFICE: false },
      user: { name: "김짱구" },
    },
  },
  {
    id: "2",
    moveType: "SMALL",
    status: "PENDING",
    moveDate: "2025-06-03T00:00:00.000Z",
    fromAddress: { fullAddress: "서울 강남구 테헤란로 10" },
    toAddress: { fullAddress: "서울 강동구 성내로 20" },
    customer: {
      imageUrl: null,
      serviceType: { SMALL: true, HOME: false, OFFICE: false },
      user: { name: "이짱구" },
    },
  },
  {
    id: "3",
    moveType: "OFFICE",
    status: "PENDING",
    moveDate: "2025-06-05T00:00:00.000Z",
    fromAddress: { fullAddress: "서울 송파구 석촌호수로 300" },
    toAddress: { fullAddress: "서울 중구 퇴계로 77" },
    customer: {
      imageUrl: null,
      serviceType: { SMALL: false, HOME: false, OFFICE: true },
      user: { name: "박짱구" },
    },
  },
];

// 변환 함수
const transformToCardData = (
  data: TestReceivedRequestRaw
): TransformedCardData => {
  return {
    id: data.id,
    name: data.customer.user.name,
    date: dayjs().subtract(2, "day").toISOString(), // 테스트용 생성일
    movingDay: dayjs(data.moveDate).format("YYYY-MM-DD"),
    from: data.fromAddress.fullAddress,
    to: data.toAddress.fullAddress,
    types: [data.moveType.toLowerCase()] as ("small" | "home" | "office")[],
  };
};

// 위 부분은 백엔드 연결하면 삭제 예정
// 아래부터 진짜 코드
export default function ReceivedRequestsFlow() {
  const searchParams = useSearchParams(); // 쿼리 파라미터로 빈 상태 체크 위해 추가, 배포 시 삭제해야 함
  const isEmptyTest = searchParams?.get("empty") === "true"; // 쿼리 파라미터로 빈 상태 체크 위해 추가, 배포 시 삭제해야 함

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const [isEstimateModalOpen, setEstimateModalOpen] = useState(false); // 견적 보내기 모달 여닫기
  const [isRejectModalOpen, setRejectModalOpen] = useState(false); // 반려하기 모달 여닫기
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

  const handleOpenEstimateModal = () => setEstimateModalOpen(true);
  const handleCloseEstimateModal = () => setEstimateModalOpen(false);

  const handleOpenRejectModal = () => setRejectModalOpen(true);
  const handleCloseRejectModal = () => setRejectModalOpen(false);

  const handleOpenFilter = () => setIsFilterModalOpen(true);
  const handleCloseFilter = () => setIsFilterModalOpen(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography>받은 요청</Typography>
      {/* 좌측 필터 영역 */}
      <Box sx={{ display: "flex" }}>
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
          <SearchInput
            variation="right" // 또는 "left"
            value={keyword}
            onChange={handleKeywordChange}
            onClick={handleClear} // 검색어 삭제 버튼에 적용됨
            placeholder="어떤 고객님을 찾고 게세요?"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>전체 {transformedList.length}건</Typography>
            <Box sx={{ display: "flex", gap: "4px" }}>
              <MoveSortDropdown />
              {/* 모바일 환경: 필터 아이콘만 보이기 */}
              {isSmall && (
                <>
                  <Button
                    onClick={handleOpenFilter}
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
                      onClick={handleOpenFilter}
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
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {transformedList.length === 0 ? (
              <EmptyRequest />
            ) : (
              transformedList.map((data) => (
                <CardListRequest
                  key={data.id}
                  data={data}
                  onConfirmClick={handleOpenEstimateModal}
                  onDetailClick={handleOpenRejectModal}
                />
              ))
            )}
            {/* 모달들 */}
            {isEstimateModalOpen && (
              <SendEstimateModal onClose={handleCloseEstimateModal} />
            )}
            {isRejectModalOpen && (
              <RejectRequestModal onClose={handleCloseRejectModal} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
