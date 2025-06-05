export const formatPhoneNumber = (value: string): string => {
  if (!value) return value;

  // 숫자만 추출
  const numbers = value.replace(/[^\d]/g, "");

  // 길이에 따라 포맷팅
  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  }
};

export const removePhoneNumberFormat = (value: string): string => {
  return value.replace(/-/g, "");
};
