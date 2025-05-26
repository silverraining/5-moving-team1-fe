const typeMap: Record<string, string> = {
  small: "소형이사",
  home: "가정이사",
  office: "사무실이사",
};

export const typeMapper = (types: string[]): string[] => {
  return types.map((type) => typeMap[type] || type); // 못 찾으면 원래 값 반환
};
