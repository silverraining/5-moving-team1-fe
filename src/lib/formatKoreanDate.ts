import dayjs from "dayjs";

export const formatKoreanDate = (
  input: string,
  includeWeekday: boolean = true
): string => {
  const date = dayjs(input);
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][date.day()];

  return includeWeekday
    ? date.format(`YYYY.MM.DD`) + `(${weekday})`
    : date.format(`YYYY.MM.DD`);
};
