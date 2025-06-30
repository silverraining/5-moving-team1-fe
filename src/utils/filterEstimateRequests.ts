import { convertSidoToEnglish } from "./parseAddress";
import { MoverProfile } from "../types/auth";
import { EstimateRequestItem } from "@/src/api/mover/estimate/requested/api";
import { ServiceRegion } from "../types/common";
import { useTranslation } from "react-i18next";
export const filterEstimateRequests = ({
  items,
  moveTypeItems,
  filterItems,
  moverProfile,
  keyword,
}: {
  items: EstimateRequestItem[];
  moveTypeItems: { label: string; checked: boolean }[];
  filterItems: { label: string; checked: boolean }[];
  moverProfile: MoverProfile | null;
  keyword?: string;
}) => {
  const { t } = useTranslation();
  const selectedMoveTypes = moveTypeItems
    .filter((item) => item.checked)
    .map((item) => {
      if (item.label === t("소형이사")) return "SMALL";
      if (item.label === t("가정이사")) return "HOME";
      if (item.label === t("사무실이사")) return "OFFICE";
      return null;
    })
    .filter(Boolean);

  const selectedFilters = filterItems
    .filter((item) => item.checked)
    .map((item) => item.label);

  return items.filter((item) => {
    const isMoveTypeMatched =
      selectedMoveTypes.length === 0 ||
      selectedMoveTypes.includes(item.moveType);

    // ✅ 필터 조건들 OR 로 비교
    const matchedFilters: boolean[] = [];

    if (selectedFilters.includes(t("지정 견적 요청"))) {
      matchedFilters.push(item.isTargeted === true);
    }

    if (selectedFilters.includes(t("서비스 가능 지역"))) {
      if (!moverProfile?.serviceRegion) {
        matchedFilters.push(false);
      } else {
        // 받아온 데이터 그대로 사용하도록 수정
        const fromSido = item.fromAddressMinimal?.sido ?? "";
        const toSido = item.toAddressMinimal?.sido ?? "";

        const serviceRegionMap = moverProfile.serviceRegion as unknown as {
          [key: string]: boolean;
        };

        const isRegionMatched = (sido: string): boolean => {
          // 직접 매핑
          const regionEnum = SIDO_TO_SERVICE_REGION[sido];
          if (
            regionEnum &&
            serviceRegionMap[regionEnum as keyof typeof serviceRegionMap]
          ) {
            return true;
          }

          // 별칭 매핑
          for (const [region, aliases] of Object.entries(SIDO_ALIASES)) {
            if (aliases.includes(sido)) {
              return (
                serviceRegionMap[region as keyof typeof serviceRegionMap] ===
                true
              );
            }
          }
          return false;
        };

        const fromMatched = isRegionMatched(fromSido);
        const toMatched = isRegionMatched(toSido);

        matchedFilters.push(fromMatched || toMatched); // 출발지 OR 도착지 하나만 포함되어도 통과
      }
    }

    // OR 조건: 하나라도 true면 통과
    const isFilterMatched =
      selectedFilters.length === 0
        ? true
        : matchedFilters.length === 0
        ? false
        : matchedFilters.some(Boolean);

    // 검색어 필터링
    const isKeywordMatched =
      !keyword || keyword.trim() === ""
        ? true
        : item.customerName
        ? item.customerName.toLowerCase().includes(keyword.trim().toLowerCase())
        : false;

    // 최종 필터 조건 - 모두 만족해야 함
    return isMoveTypeMatched && isFilterMatched && isKeywordMatched;
  });
};

// 두 배열이 같은지(내용이 같은지) 비교하는 함수
export function areItemsEqual<
  T extends { label: string | number; count: number; checked: boolean }
>(arr1: T[], arr2: T[]) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, idx) => {
    const other = arr2[idx];
    return (
      item.label === other.label &&
      item.count === other.count &&
      item.checked === other.checked
    );
  });
}

// 태블릿,모바일 환경에서 CheckboxList 대신사용되는 FilerModal 사용을 위한 변환 함수
export function convertCheckedToFilterItems(
  checked: {
    all: boolean;
    small: boolean;
    home: boolean;
    office: boolean;
  },
  currentMoveTypeItems: { label: string; count: number; checked: boolean }[],
  currentFilterItems: { label: string; count: number; checked: boolean }[],
  t: (key: string) => string
) {
  // moveTypeItems 업데이트
  const newMoveTypeItems = currentMoveTypeItems.map((item) => {
    if (item.label === t("소형이사")) {
      return { ...item, checked: checked.all || checked.small };
    }
    if (item.label === t("가정이사")) {
      return { ...item, checked: checked.all || checked.home };
    }
    if (item.label === t("사무실이사")) {
      return { ...item, checked: checked.all || checked.office };
    }
    return item;
  });

  // filterItems는 현재 FilterModal에 포함되어 있지 않으므로, 기존 상태 유지 혹은 필요시 따로 처리
  // 예를 들어 모바일 모달에서도 "지정 견적 요청", "서비스 가능 지역" 체크박스를 넣었다면 여기도 변환해야 함
  // 지금 FilterModal에 포함 안 돼 있으면 기존 filterItems 유지
  const newFilterItems = [...currentFilterItems];

  return { newMoveTypeItems, newFilterItems };
}

/* 한글 주소를 enum 값과 매칭하는 매핑 함수( (from또는to)AddressMinimal.sido의 값과 기사님 서비스 가능 지역(ServiceRegion)이 일치하는지 확인하기 위함)
받아오는 값 서울, 경기 부산광역시, 대전광역시, 광주 확인 - 이외에 다르게 받아오는 데이터 있는 경우 수정 필요*/
export const SIDO_TO_SERVICE_REGION: Record<string, ServiceRegion> = {
  서울특별시: ServiceRegion.SEOUL,
  경기도: ServiceRegion.GYEONGGI,
  인천광역시: ServiceRegion.INCHEON,
  강원도: ServiceRegion.GANGWON,
  충청북도: ServiceRegion.CHUNGBUK,
  충청남도: ServiceRegion.CHUNGNAM,
  세종특별자치시: ServiceRegion.SEJONG,
  대전광역시: ServiceRegion.DAEJEON,
  전라북도: ServiceRegion.JEONBUK,
  전라남도: ServiceRegion.JEONNAM,
  광주: ServiceRegion.GWANGJU,
  경상북도: ServiceRegion.GYEONGBUK,
  경상남도: ServiceRegion.GYEONGNAM,
  대구광역시: ServiceRegion.DAEGU,
  울산광역시: ServiceRegion.ULSAN,
  부산광역시: ServiceRegion.BUSAN,
  제주특별자치도: ServiceRegion.JEJU,
};

// 동일 지역 허용: ex) "서울" = "서울특별시"
export const SIDO_ALIASES: Record<ServiceRegion, string[]> = {
  [ServiceRegion.SEOUL]: ["서울특별시", "서울"],
  [ServiceRegion.GYEONGGI]: ["경기도", "경기"],
  [ServiceRegion.INCHEON]: ["인천광역시", "인천"],
  [ServiceRegion.GANGWON]: ["강원도"],
  [ServiceRegion.CHUNGBUK]: ["충청북도"],
  [ServiceRegion.CHUNGNAM]: ["충청남도"],
  [ServiceRegion.SEJONG]: ["세종특별자치시", "세종시"],
  [ServiceRegion.DAEJEON]: ["대전광역시", "대전"],
  [ServiceRegion.JEONBUK]: ["전라북도"],
  [ServiceRegion.JEONNAM]: ["전라남도"],
  [ServiceRegion.GWANGJU]: ["광주광역시", "광주"],
  [ServiceRegion.GYEONGBUK]: ["경상북도"],
  [ServiceRegion.GYEONGNAM]: ["경상남도"],
  [ServiceRegion.DAEGU]: ["대구광역시", "대구"],
  [ServiceRegion.ULSAN]: ["울산광역시", "울산"],
  [ServiceRegion.BUSAN]: ["부산광역시", "부산"],
  [ServiceRegion.JEJU]: ["제주특별자치도", "제주도"],
};
