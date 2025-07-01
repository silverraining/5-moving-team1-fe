import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ParsedAddress } from "../utils/parseAddress";

type EstimateState = {
  moveType: string | null;
  moveDate: string | null;
  fromAddress: ParsedAddress | null;
  toAddress: ParsedAddress | null;
  step: number | null; // 견적요청 Progress 게이지 바를 header로 사용하기 위해 추가
  setMoveType: (type: string) => void;
  setMoveDate: (date: string) => void;
  setFromAddress: (addr: ParsedAddress) => void;
  setToAddress: (addr: ParsedAddress) => void;
  setStep: (step: number | null) => void;
};

export const useEstimateStore = create<EstimateState & { reset: () => void }>()(
  persist(
    (set) => ({
      moveType: null,
      moveDate: null,
      fromAddress: null,
      toAddress: null,
      step: null,
      setMoveType: (type) => set({ moveType: type }),
      setMoveDate: (date) => set({ moveDate: date }),
      setFromAddress: (addr) => set({ fromAddress: addr }),
      setToAddress: (addr) => set({ toAddress: addr }),
      setStep: (step) => set({ step }),
      reset: () =>
        set({
          moveType: null,
          moveDate: null,
          fromAddress: null,
          toAddress: null,
          step: null,
        }),
    }),
    {
      name: "estimate-storage",
    }
  )
);
