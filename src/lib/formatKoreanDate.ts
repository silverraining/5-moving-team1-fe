export const formatKoreanDate = (
  input: string,
  includeWeekday: boolean = true
): string => {
  const date = new Date(input);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekday = weekdays[date.getDay()];

  return includeWeekday
    ? `${year}.${month}.${day}(${weekday})`
    : `${year}.${month}.${day}`;
};
