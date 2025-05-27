import { create } from "zustand";
import { persist } from "zustand/middleware";

type EstimateState = {
  moveType: string;
  moveDate: string;
  fromAddress: string;
  toAddress: string;
  setMoveType: (type: string) => void;
  setMoveDate: (date: string) => void;
  setFromAddress: (addr: string) => void;
  setToAddress: (addr: string) => void;
};

export const useEstimateStore = create<EstimateState>()(
  persist(
    (set) => ({
      moveType: "",
      moveDate: "",
      fromAddress: "",
      toAddress: "",
      setMoveType: (type) => set({ moveType: type }),
      setMoveDate: (date) => set({ moveDate: date }),
      setFromAddress: (addr) => set({ fromAddress: addr }),
      setToAddress: (addr) => set({ toAddress: addr }),
    }),
    {
      name: "estimate-storage", // localStorage 키 이름
    }
  )
);
