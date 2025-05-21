import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    B_36: React.CSSProperties;
    B_32: React.CSSProperties;
    SB_32: React.CSSProperties;
    B_24: React.CSSProperties;
    SB_24: React.CSSProperties;
    M_24: React.CSSProperties;
    R_24: React.CSSProperties;
    B_20: React.CSSProperties;
    SB_20: React.CSSProperties;
    M_20: React.CSSProperties;
    R_20: React.CSSProperties;
    B_18: React.CSSProperties;
    SB_18: React.CSSProperties;
    M_18: React.CSSProperties;
    R_18: React.CSSProperties;
    B_16: React.CSSProperties;
    SB_16: React.CSSProperties;
    M_16: React.CSSProperties;
    R_16: React.CSSProperties;
    B_14: React.CSSProperties;
    SB_14: React.CSSProperties;
    M_14: React.CSSProperties;
    R_14: React.CSSProperties;
    SB_13: React.CSSProperties;
    M_13: React.CSSProperties;
    SB_12: React.CSSProperties;
    M_12: React.CSSProperties;
    R_12: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    B_36?: React.CSSProperties;
    B_32?: React.CSSProperties;
    SB_32?: React.CSSProperties;
    B_24?: React.CSSProperties;
    SB_24?: React.CSSProperties;
    M_24?: React.CSSProperties;
    R_24?: React.CSSProperties;
    B_20?: React.CSSProperties;
    SB_20?: React.CSSProperties;
    M_20?: React.CSSProperties;
    R_20?: React.CSSProperties;
    B_18?: React.CSSProperties;
    SB_18?: React.CSSProperties;
    M_18?: React.CSSProperties;
    R_18?: React.CSSProperties;
    B_16?: React.CSSProperties;
    SB_16?: React.CSSProperties;
    M_16?: React.CSSProperties;
    R_16?: React.CSSProperties;
    B_14?: React.CSSProperties;
    SB_14?: React.CSSProperties;
    M_14?: React.CSSProperties;
    R_14?: React.CSSProperties;
    SB_13?: React.CSSProperties;
    M_13?: React.CSSProperties;
    SB_12?: React.CSSProperties;
    M_12?: React.CSSProperties;
    R_12?: React.CSSProperties;
  }
}

// 이걸로 `Typography` 컴포넌트에서 prop으로 쓸 수 있게 함
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    B_36: true;
    B_32: true;
    SB_32: true;
    B_24: true;
    SB_24: true;
    M_24: true;
    R_24: true;
    B_20: true;
    SB_20: true;
    M_20: true;
    R_20: true;
    B_18: true;
    SB_18: true;
    M_18: true;
    R_18: true;
    B_16: true;
    SB_16: true;
    M_16: true;
    R_16: true;
    B_14: true;
    SB_14: true;
    M_14: true;
    R_14: true;
    SB_13: true;
    M_13: true;
    SB_12: true;
    M_12: true;
    R_12: true;
  }
}
