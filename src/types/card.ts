export type ChipProps = {
  type: "small" | "home" | "office" | "designation" | "wait" | "complete";
};

export type CardData = {
  types: ChipProps["type"][];
  message?: string;
  imgSrc: string;
  name: string;
  like: number;
  rating: number;
  count: number;
  career: number;
  confirm: number;
  isLiked: boolean;
  cost?: number;
  date?: string;
  from?: string;
  to?: string;
  ReviewCheck?: boolean;
  review?: number;
  writeReview?: string;
  nickname?: string;
  movingDay?: string;
  refuse?: boolean;
  address: string[];
};
