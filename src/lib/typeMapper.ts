const typeMap: Record<string, string> = {
  SMALL: "소형이사",
  HOME: "가정이사",
  OFFICE: "사무실이사",
};

export const typeMapper = (types: string[]): string[] => {
  return types.map((type) => typeMap[type] || type); // 못 찾으면 원래 값 반환
};

/**
 * Record 형태의 서비스 타입을 배열로 변환하는 함수
 */
export const typeMapperFromRecord = (
  types: Record<string, boolean>
): string[] => {
  return Object.entries(types)
    .filter(([_, value]) => value)
    .map(([key]) => typeMap[key] || key);
};
