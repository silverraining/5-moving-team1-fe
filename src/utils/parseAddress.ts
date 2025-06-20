// utils/parseAddress.ts

export interface ParsedAddress {
  sido: string;
  sidoEnglish: string;
  sigungu: string;
  roadAddress: string;
  fullAddress: string;
}

export interface ModalAddress {
  zipCode: string;
  roadAddress: string;
  jibunAddress: string;

  sido: string;
  sigungu: string;
  sidoEnglish: string;
  fullAddress: string;
}

export const parseAddress = (address: ModalAddress): ParsedAddress => {
  return {
    sido: address.sido, // ex: "서울특별시"
    sidoEnglish: address.sidoEnglish, // ex: "Seoul"
    sigungu: address.sigungu, // ex: "강남구"
    roadAddress: address.roadAddress, // ex: "서울 강남구 테헤란로 123"
    fullAddress: address.fullAddress || address.roadAddress, // fallback 처리
  };
};

export const convertSidoToEnglish = (sido: string): string => {
  const map: Record<string, string> = {
    서울: "Seoul",
    경기: "Gyeonggi",
    인천: "Incheon",
    부산: "Busan",
    대구: "Daegu",
    대전: "Daejeon",
    광주: "Gwangju",
    울산: "Ulsan",
    세종: "Sejong",
    강원: "Gangwon",
    충북: "Chungbuk",
    충남: "Chungnam",
    전북: "Jeonbuk",
    전남: "Jeonnam",
    경북: "Gyeongbuk",
    경남: "Gyeongnam",
    제주: "Jeju",
  };
  return map[sido] ?? "";
};

export const convertEnglishToSido = (region: string): string => {
  const map: Record<string, string> = {
    Seoul: "서울",
    "Gyeonggi-do": "경기",
    Incheon: "인천",
    "Gangwon-do": "강원",
    "Chungcheongbuk-do": "충북",
    "Chungcheongnam-do": "충남",
    "Sejong-si": "세종",
    Daejeon: "대전",
    "Jeonbuk-do": "전북",
    "Jeollanam-do": "전남",
    Gwangju: "광주",
    "Gyeongsangbuk-do": "경북",
    "Gyeongsangnam-do": "경남",
    Daegu: "대구",
    Ulsan: "울산",
    Busan: "부산",
    "Jeju-do": "제주",
  };
  return map[region] ?? region;
};
