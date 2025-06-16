const typeMap: Record<string, string> = {
  SMALL: "소형이사",
  HOME: "가정이사",
  OFFICE: "사무실이사",
};

export const typeMapper = (types: string[]): string[] => {
  return types.map((type) => typeMap[type] || type); // 못 찾으면 원래 값 반환
};
