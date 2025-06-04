import dayjs from "dayjs";

export const formatKoreanDate = (
  input: string,
  includeWeekday: boolean = true
): string => {
  const date = dayjs(input);

  return includeWeekday
    ? date.format(`YYYY.MM.DD(dd)`)
    : date.format(`YYYY.MM.DD`);
};
