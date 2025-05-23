export const ServiceType = ["소형이사", "가정이사", "사무실이사"] as const;
export type Service = (typeof ServiceType)[number];

export const RegionType = [
  "서울",
  "경기",
  "인천",
  "강원",
  "충북",
  "충남",
  "세종",
  "대전",
  "전북",
  "전남",
  "경주",
  "경북",
  "경남",
  "대구",
  "울산",
  "부산",
  "제주",
] as const;
export type Region = (typeof RegionType)[number];

export const PATH = { login: "/auth/login", signup: "/auth/signup" };
