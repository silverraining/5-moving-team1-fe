import { create } from "zustand";
import { persist } from "zustand/middleware";

type EstimateState = {
  moveType: string;
  moveDate: string;
  fromAddress: string;
  toAddress: string;
  step: number | null; // 견적요청 Progress 게이지 바를 header로 사용하기 위해 추가
  setMoveType: (type: string) => void;
  setMoveDate: (date: string) => void;
  setFromAddress: (addr: string) => void;
  setToAddress: (addr: string) => void;
  setStep: (step: number | null) => void;
};

export const useEstimateStore = create<EstimateState>()(
  persist(
    (set) => ({
      moveType: "",
      moveDate: "",
      fromAddress: "",
      toAddress: "",
      step: null,
      setMoveType: (type) => set({ moveType: type }),
      setMoveDate: (date) => set({ moveDate: date }),
      setFromAddress: (addr) => set({ fromAddress: addr }),
      setToAddress: (addr) => set({ toAddress: addr }),
      setStep: (step) => set({ step }),
    }),
    {
      name: "estimate-storage", // localStorage 키 이름
    }
  )
);
