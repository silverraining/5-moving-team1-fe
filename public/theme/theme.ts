"use client";
import { createTheme } from "@mui/material/styles";
import { COLORS } from "./colors";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    desktop: true;
  }
}
export const lightTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 744,
      desktop: 1200,
    },
  },
  typography: {
    // Text-3xl
    B_32: {
      fontSize: "32px",
      lineHeight: "42px",
      fontWeight: 700,
    },
    SB_32: {
      fontSize: "32px",
      lineHeight: "42px",
      fontWeight: 600,
    },
    // Text-2xl
    B_24: {
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: 700,
    },
    SB_24: {
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: 600,
    },
    M_24: {
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: 500,
    },
    R_24: {
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: 400,
    },
    // Text-xl
    B_20: {
      fontSize: "20px",
      lineHeight: "32px",
      fontWeight: 700,
    },
    SB_20: {
      fontSize: "20px",
      lineHeight: "32px",
      fontWeight: 600,
    },
    M_20: {
      fontSize: "20px",
      lineHeight: "32px",
      fontWeight: 500,
    },
    R_20: {
      fontSize: "20px",
      lineHeight: "32px",
      fontWeight: 400,
    },
    // Text-2lg
    B_18: {
      fontSize: "18px",
      lineHeight: "26px",
      fontWeight: 700,
    },
    SB_18: {
      fontSize: "18px",
      lineHeight: "26px",
      fontWeight: 600,
    },
    M_18: {
      fontSize: "18px",
      lineHeight: "26px",
      fontWeight: 500,
    },
    R_18: {
      fontSize: "18px",
      lineHeight: "26px",
      fontWeight: 400,
    },
    // Text-lg
    B_16: {
      fontSize: "16px",
      lineHeight: "26px",
      fontWeight: 500,
    },
    SB_16: {
      fontSize: "16px",
      lineHeight: "26px",
      fontWeight: 500,
    },
    R_16: {
      fontSize: "16px",
      lineHeight: "26px",
      fontWeight: 500,
    },
    M_16: {
      fontSize: "16px",
      lineHeight: "26px",
      fontWeight: 500,
    },
    // Text-md
    B_14: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 700,
    },
    SB_14: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 600,
    },
    M_14: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 500,
    },
    R_14: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 400,
    },
    // Text-sm
    SB_13: {
      fontSize: "13px",
      lineHeight: "22px",
      fontWeight: 600,
    },
    M_13: {
      fontSize: "13px",
      lineHeight: "22px",
      fontWeight: 500,
    },
    // Text-xs
    SB_12: {
      fontSize: "12px",
      lineHeight: "20px",
      fontWeight: 600,
    },
    M_12: {
      fontSize: "12px",
      lineHeight: "18px",
      fontWeight: 500,
    },
    R_12: {
      fontSize: "12px",
      lineHeight: "18px",
      fontWeight: 400,
    },
  },
  palette: {
    mode: "light",
    primary: { main: "#4F9AFF" },
    background: { default: "#ffffff", paper: "#f9f9f9" },
    text: { primary: "#000000", secondary: "#555555" },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: { backgroundColor: COLORS.PrimaryBlue[400], color: "white" },
        },
      ],
    },
  },
});

export const darkTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 744,
      desktop: 1200,
    },
  },
  typography: {
    // Text-3xl
    B_32: {
      fontSize: "32px",
      lineHeight: "42px",
      fontWeight: 700,
    },
    SB_32: {
      fontSize: "32px",
      lineHeight: "42px",
      fontWeight: 600,
    },
    // Text-2xl
    B_24: {
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: 700,
    },
    SB_24: {
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: 600,
    },
    M_24: {
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: 500,
    },
    R_24: {
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: 400,
    },
    // Text-xl
    B_20: {
      fontSize: "20px",
      lineHeight: "32px",
      fontWeight: 700,
    },
    SB_20: {
      fontSize: "20px",
      lineHeight: "32px",
      fontWeight: 600,
    },
    M_20: {
      fontSize: "20px",
      lineHeight: "32px",
      fontWeight: 500,
    },
    R_20: {
      fontSize: "20px",
      lineHeight: "32px",
      fontWeight: 400,
    },
    // Text-2lg
    B_18: {
      fontSize: "18px",
      lineHeight: "26px",
      fontWeight: 700,
    },
    SB_18: {
      fontSize: "18px",
      lineHeight: "26px",
      fontWeight: 600,
    },
    M_18: {
      fontSize: "18px",
      lineHeight: "26px",
      fontWeight: 500,
    },
    R_18: {
      fontSize: "18px",
      lineHeight: "26px",
      fontWeight: 400,
    },
    // Text-lg
    B_16: {
      fontSize: "16px",
      lineHeight: "26px",
      fontWeight: 500,
    },
    SB_16: {
      fontSize: "16px",
      lineHeight: "26px",
      fontWeight: 500,
    },
    R_16: {
      fontSize: "16px",
      lineHeight: "26px",
      fontWeight: 500,
    },
    M_16: {
      fontSize: "16px",
      lineHeight: "26px",
      fontWeight: 500,
    },
    // Text-md
    B_14: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 700,
    },
    SB_14: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 600,
    },
    M_14: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 500,
    },
    R_14: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 400,
    },
    // Text-sm
    SB_13: {
      fontSize: "13px",
      lineHeight: "22px",
      fontWeight: 600,
    },
    M_13: {
      fontSize: "13px",
      lineHeight: "22px",
      fontWeight: 500,
    },
    // Text-xs
    SB_12: {
      fontSize: "12px",
      lineHeight: "20px",
      fontWeight: 600,
    },
    M_12: {
      fontSize: "12px",
      lineHeight: "18px",
      fontWeight: 500,
    },
    R_12: {
      fontSize: "12px",
      lineHeight: "18px",
      fontWeight: 400,
    },
  },
  palette: {
    mode: "dark",
    primary: { main: "#4F9AFF" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff", secondary: "#aaaaaa" },
  },
});
