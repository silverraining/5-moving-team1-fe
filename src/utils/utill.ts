import { MOVER_LIST } from "../lib/mockData";

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
