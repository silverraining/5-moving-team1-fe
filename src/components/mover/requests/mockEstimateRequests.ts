import dayjs from "dayjs";
import { ChipProps } from "@/src/types/card";

export type TestReceivedRequestRaw = {
  id: string;
  moveType: ChipProps["type"];
  status: string;
  moveDate: string;
  fromAddress: { fullAddress: string };
  toAddress: { fullAddress: string };
  customer: {
    imageUrl: string | null;
    serviceType: {
      SMALL: boolean;
      HOME: boolean;
      OFFICE: boolean;
    };
    user: {
      name: string;
    };
  };
};

export type TransformedCardData = {
  id: string;
  name: string;
  date: string;
  movingDay: string;
  from: string;
  to: string;
  types: ChipProps["type"][];
};

export const testDataList: TestReceivedRequestRaw[] = [
  {
    id: "1",
    moveType: "home",
    status: "PENDING",
    moveDate: "2025-06-01T00:00:00.000Z",
    fromAddress: { fullAddress: "서울 중구 삼일대로 343" },
    toAddress: { fullAddress: "서울 중구 청계천로 100" },
    customer: {
      imageUrl: null,
      serviceType: { SMALL: false, HOME: true, OFFICE: false },
      user: { name: "김짱구" },
    },
  },
  {
    id: "2",
    moveType: "small",
    status: "PENDING",
    moveDate: "2025-06-03T00:00:00.000Z",
    fromAddress: { fullAddress: "서울 강남구 테헤란로 10" },
    toAddress: { fullAddress: "서울 강동구 성내로 20" },
    customer: {
      imageUrl: null,
      serviceType: { SMALL: true, HOME: false, OFFICE: false },
      user: { name: "이짱구" },
    },
  },
  {
    id: "3",
    moveType: "office",
    status: "PENDING",
    moveDate: "2025-06-05T00:00:00.000Z",
    fromAddress: { fullAddress: "서울 송파구 석촌호수로 300" },
    toAddress: { fullAddress: "서울 중구 퇴계로 77" },
    customer: {
      imageUrl: null,
      serviceType: { SMALL: false, HOME: false, OFFICE: true },
      user: { name: "박짱구" },
    },
  },
];

export const transformToCardData = (
  data: TestReceivedRequestRaw
): TransformedCardData => {
  return {
    id: data.id,
    types: [data.moveType],
    name: data.customer.user.name,
    date: dayjs().subtract(2, "day").toISOString(),
    from: data.fromAddress.fullAddress,
    to: data.toAddress.fullAddress,
    movingDay: dayjs(data.moveDate).format("YYYY-MM-DD"),
  };
};
