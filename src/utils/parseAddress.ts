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
