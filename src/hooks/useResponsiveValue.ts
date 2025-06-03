import { useCallback } from "react";
/**
 * MUI의 `sx` prop에서 반응형 스타일 배열을 전달받아,
 * forceMobileSize가 true인 경우 항상 첫 번째(모바일) 값을 반환하고,
 * 그렇지 않으면 원래 배열을 그대로 반환합니다.
 *
 * 조기본적으로 "모바일 사이즈 강제 적용"을 위해 사용되는 훅입니다.
 *
 * @template T - 배열 내 요소 타입 (string, number 등)
 * @param {boolean} forceMobileSize - 모바일 사이즈를 강제로 적용할지 여부
 * @returns {(values: [T, T, T]) => T | [T, T, T]} - 강제 모바일 적용 여부에 따라 단일 값 또는 전체 배열을 반환하는 콜백 함수
 *
 * @example
 * const responsive = useResponsiveValue(true);
 * responsive([13, 16, 18]); // => 13 (모바일 고정)
 *
 * const responsive = useResponsiveValue(false);
 * responsive([13, 16, 18]); // → [13, 16, 18] (반응형 유지)
 */
export const useResponsiveValue = (forceMobileSize: boolean) => {
  return useCallback(
    <T>(values: [T, T, T]): T | [T, T, T] => {
      return forceMobileSize ? values[0] : values;
    },
    [forceMobileSize]
  );
};
