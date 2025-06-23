import { regionLabels } from "../components/profile/RegionSelector";
import { MOVER_LIST } from "../lib/mockData";
import { ServiceType, ServiceRegion } from "@/src/types/common";

export const generateMoverList = (count: number) => {
  const list = [];
  for (let i = 0; i < count; i++) {
    const base = MOVER_LIST[i % MOVER_LIST.length]; // 원본 배열 반복
    list.push({
      ...base,
      id: `mover-${String(i + 1).padStart(3, "0")}`,
      nickname: `${base.nickname} ${i + 1}`,
    });
  }
  return list;
};

/**
 * 서비스 타입 객체를 배열로 변환
 *
 * @example
 * // API 응답 데이터를 UI 표시용 배열로 변환
 * const response = { SMALL: true, HOME: false, OFFICE: true };
 * const array = convertToServiceTypeArray(response); // ['SMALL', 'OFFICE']
 *
 * @description
 * - 백엔드 API 응답형식(객체)을 UI 컴포넌트에서 사용할 배열로 변환
 */
export const convertToServiceTypeArray = (serviceType: {
  [key in ServiceType]: boolean;
}): ServiceType[] => {
  return Object.entries(serviceType)
    .filter(([_, value]) => value)
    .map(([key]) => key as ServiceType);
};

/**
 * 서비스 타입 배열을 객체로 변환
 *
 * @example
 * // UI에서 선택된 서비스 배열을 API 요청 형식으로 변환
 * const selected = ['SMALL', 'OFFICE'];
 * const object = convertToServiceTypeObject(selected);
 * // { SMALL: true, HOME: false, OFFICE: true }
 *
 * @description
 * - UI에서 관리하는 선택된 서비스 배열을 백엔드 API 요청 형식(객체)으로 변환
 */
export const convertToServiceTypeObject = (services: ServiceType[]) => {
  return {
    SMALL: services.includes("SMALL"),
    HOME: services.includes("HOME"),
    OFFICE: services.includes("OFFICE"),
  };
};

/**
 * 지역 객체를 배열로 변환
 *
 * @example
 * // API 응답의 지역 데이터를 UI 표시용 배열로 변환
 * const response = { Seoul: true, Busan: false, Incheon: true };
 * const array = convertToServiceRegionArray(response); // ['Seoul', 'Incheon']
 *
 * @description
 * - 백엔드 API 응답형식(객체)을 UI 컴포넌트에서 사용할 배열로 변환
 */
export const convertToServiceRegionArray = (serviceRegion: {
  [key in ServiceRegion]: boolean;
}): ServiceRegion[] => {
  return Object.entries(serviceRegion)
    .filter(([_, value]) => value)
    .map(([key]) => key as ServiceRegion);
};

/**
 * 지역 배열을 객체로 변환
 *
 * @example
 * // UI에서 선택된 지역 배열을 API 요청 형식으로 변환
 * const selected = ['Seoul', 'Incheon'];
 * const object = convertToServiceRegionObject(selected);
 * // { Seoul: true, Busan: false, Incheon: true, ... }
 *
 * @description
 * - UI에서 관리하는 선택된 지역 배열을 백엔드 API 요청 형식(객체)으로 변환
 */
export const convertToServiceRegionObject = (
  regions: ServiceRegion[]
): Record<ServiceRegion, boolean> => {
  return Object.values(ServiceRegion).reduce(
    (acc, region) => ({
      ...acc,
      [region]: regions.includes(region),
    }),
    {} as Record<ServiceRegion, boolean>
  );
};

/**서비스 지역을 한글 라벨로 변환  */
export const convertRegionToKoreanLabels = (
  regions: ServiceRegion[] | string[] | undefined
): string[] => {
  if (!regions || !Array.isArray(regions)) return [];

  return regions.map(
    (region) => regionLabels[region as ServiceRegion] ?? region
  );
};

/**한글 지역명을 ServiceRegion enum 값으로 변환 */
export const convertKoreanToServiceRegion = (
  koreanRegion: string
): ServiceRegion | undefined => {
  const regionKey = Object.keys(regionLabels).find(
    (key) => regionLabels[key as ServiceRegion] === koreanRegion
  ) as ServiceRegion | undefined;

  return regionKey;
};
