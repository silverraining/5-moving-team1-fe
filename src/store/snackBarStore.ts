import { create } from "zustand";

type Severity = "success" | "error" | "warning" | "info";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: Severity;
  duration: number;
  variant: "filled" | "outlined" | "standard";
  openSnackbar: (msg: string, severity?: Severity, dur?: number) => void;
  closeSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  message: "",
  severity: "info",
  duration: 2000,
  variant: "standard",
  openSnackbar: (msg, severity = "info", dur = 2000) =>
    set({ open: true, message: msg, severity, duration: dur }),
  closeSnackbar: () => set({ open: false }),
}));
