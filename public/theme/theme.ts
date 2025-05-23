// theme.ts
"use client";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { COLORS, DARK_COLORS } from "./colors";

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

const sharedTypography: ThemeOptions["typography"] = {
  fontFamily: "'Pretendard Variable', sans-serif",
  B_36: { fontSize: "36px", lineHeight: "42px", fontWeight: 700 },
  B_32: { fontSize: "32px", lineHeight: "42px", fontWeight: 700 },
  SB_32: { fontSize: "32px", lineHeight: "42px", fontWeight: 600 },
  B_24: { fontSize: "24px", lineHeight: "32px", fontWeight: 700 },
  SB_24: { fontSize: "24px", lineHeight: "32px", fontWeight: 600 },
  M_24: { fontSize: "24px", lineHeight: "32px", fontWeight: 500 },
  R_24: { fontSize: "24px", lineHeight: "32px", fontWeight: 400 },
  B_20: { fontSize: "20px", lineHeight: "32px", fontWeight: 700 },
  SB_20: { fontSize: "20px", lineHeight: "32px", fontWeight: 600 },
  M_20: { fontSize: "20px", lineHeight: "32px", fontWeight: 500 },
  R_20: { fontSize: "20px", lineHeight: "32px", fontWeight: 400 },
  B_18: { fontSize: "18px", lineHeight: "26px", fontWeight: 700 },
  SB_18: { fontSize: "18px", lineHeight: "26px", fontWeight: 600 },
  M_18: { fontSize: "18px", lineHeight: "26px", fontWeight: 500 },
  R_18: { fontSize: "18px", lineHeight: "26px", fontWeight: 400 },
  B_16: { fontSize: "16px", lineHeight: "26px", fontWeight: 700 },
  SB_16: { fontSize: "16px", lineHeight: "26px", fontWeight: 600 },
  R_16: { fontSize: "16px", lineHeight: "26px", fontWeight: 500 },
  M_16: { fontSize: "16px", lineHeight: "26px", fontWeight: 400 },
  B_14: { fontSize: "14px", lineHeight: "24px", fontWeight: 700 },
  SB_14: { fontSize: "14px", lineHeight: "24px", fontWeight: 600 },
  M_14: { fontSize: "14px", lineHeight: "24px", fontWeight: 500 },
  R_14: { fontSize: "14px", lineHeight: "24px", fontWeight: 400 },
  SB_13: { fontSize: "13px", lineHeight: "22px", fontWeight: 600 },
  M_13: { fontSize: "13px", lineHeight: "22px", fontWeight: 500 },
  SB_12: { fontSize: "12px", lineHeight: "20px", fontWeight: 600 },
  M_12: { fontSize: "12px", lineHeight: "18px", fontWeight: 500 },
  R_12: { fontSize: "12px", lineHeight: "18px", fontWeight: 400 },
};
export const createAppTheme = (mode: "light" | "dark") => {
  const paletteColors = mode === "light" ? COLORS : DARK_COLORS;
  return createTheme({
    breakpoints: {
      values: {
        mobile: 375,
        tablet: 744,
        desktop: 1200,
      },
    },
    typography: sharedTypography,
    palette: {
      mode,
      primary: { main: paletteColors.PrimaryBlue[300] },
      background:
        mode === "light" ? { default: "#ffffff" } : { default: "#121212" },
      text:
        mode === "light"
          ? { primary: "#000000", secondary: "#555555" }
          : { primary: "#ffffff", secondary: "#aaaaaa" },
      Black: paletteColors.Black,
      Grayscale: paletteColors.Grayscale,
      PrimaryBlue: paletteColors.PrimaryBlue,
      White: paletteColors.White,
      SecondaryYellow: paletteColors.SecondaryYellow,
      SecondaryRed: paletteColors.SecondaryRed,
      Line: paletteColors.Line,
      Background: paletteColors.Background,
      NeutralGray: paletteColors.NeutralGray,
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: "contained" },
            style: {
              backgroundColor:
                mode === "light"
                  ? COLORS.PrimaryBlue[300]
                  : COLORS.SecondaryYellow[100],
              borderRadius: "16px",
              ":hover": {
                backgroundColor:
                  mode === "light"
                    ? COLORS.PrimaryBlue[200]
                    : COLORS.SecondaryYellow[100],
              },
              "&.Mui-disabled": {
                backgroundColor:
                  mode === "light"
                    ? COLORS.Grayscale[100]
                    : COLORS.Grayscale[300],
              },
            },
          },
          {
            props: { variant: "outlined" },
            style: {
              borderColor:
                mode === "light"
                  ? COLORS.PrimaryBlue[300]
                  : COLORS.SecondaryYellow[100],
              color:
                mode === "light"
                  ? COLORS.PrimaryBlue[200]
                  : COLORS.SecondaryYellow[100],
              borderRadius: "16px",
              ":hover": {
                backgroundColor: "white",
                borderColor:
                  mode === "light"
                    ? COLORS.PrimaryBlue[300]
                    : COLORS.SecondaryYellow[100],
              },
              hover: { backgroundColor: COLORS.Grayscale[50] },
              "&.Mui-disabled": {
                cursor: "not-allowed",
                borderColor:
                  mode === "light"
                    ? COLORS.Grayscale[100]
                    : COLORS.Grayscale[400],
                color: COLORS.Grayscale[300],
              },
            },
          },
          {
            props: { variant: "text" },
            style: {
              color:
                mode === "light"
                  ? COLORS.PrimaryBlue[300]
                  : COLORS.SecondaryYellow[100],
              borderRadius: "16px",
            },
          },
        ],
      },
    },
  });
};
