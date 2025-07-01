import dayjs from "./dayjsConfig";

export const formatKoreanDate = (
  input: string | Date | dayjs.Dayjs,
  includeWeekday: boolean = true
): string => {
  const date = dayjs(input);

  return includeWeekday
    ? date.format(`YYYY. MM. DD(dd)`)
    : date.format(`YYYY. MM. DD`);
};

export const formatDateWithDay = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = days[date.getDay()];

  return `${year}. ${month}. ${day}(${dayOfWeek})`;
};
