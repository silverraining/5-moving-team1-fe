export const maskNickname = (nickname: string): string => {
  const visible = nickname.slice(0, 3); // 앞 3자리까지 표시 (길이가 부족하면 있는 만큼만)
  const masked = "*".repeat(4); // 항상 4자리 마스킹

  return visible + masked;
};
