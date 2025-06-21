export interface MoveTypeFilterItem {
  label: "소형이사" | "가정이사" | "사무실이사";
  count: number;
  checked: boolean;
}

export interface FilterItem {
  label: "서비스 가능 지역" | "지정 견적 요청";
  count: number;
  checked: boolean;
}
