export const convertToEnum = (label: string): "SMALL" | "HOME" | "OFFICE" => {
  switch (label) {
    case "소형이사 (원룸, 투룸, 20평대 미만)":
      return "SMALL";
    case "가정이사 (쓰리룸, 20평대 이상)":
      return "HOME";
    case "사무실이사 (사무실, 상업공간)":
      return "OFFICE";
    default:
      throw new Error("Unknown move type label");
  }
};

export const convertToLabel = (enumValue: string): string => {
  switch (enumValue) {
    case "SMALL":
      return "소형이사 (원룸, 투룸, 20평대 미만)";
    case "HOME":
      return "가정이사 (쓰리룸, 20평대 이상)";
    case "OFFICE":
      return "사무실이사 (사무실, 상업공간)";
    default:
      return "";
  }
};
