import { createTheme } from "@mui/material/styles";

export const COLORS = {
  Black: {
    100: "#6B6B6B",
    200: "#525252",
    300: "#373737",
    400: "#1F1F1F",
    500: "#040404",
    600: "#000",
  },
  Grayscale: {
    50: "#000000",
    100: "#DEDEDE",
    200: "#C4C4C4",
    300: "#ABABAB",
    400: "#999999",
    500: "#808080",
  },
  PrimaryBlue: {
    50: "#F5FAFF",
    100: "#E9F4FF",
    200: "#4DA9FF",
    300: "#1B92FF",
    400: "#242945",
    500: "#1976d2",
    600: "#4285F4",
    700: "#357AE8",
  },
  White: {
    100: "#FFFFFF",
  },
  SecondaryYellow: {
    100: "#FFC149",
    200: "#F9D000",
    300: "#FAE100",
  },
  SecondaryRed: {
    100: "#FFEEF0",
    200: "#FF4F64",
  },
  Line: {
    100: "#F2f2f2",
    200: "#E6E6E6",
  },
  Background: {
    100: "#F2F3F8",
    400: "#F4F7FB",
  },
  NeutralGray: {
    50: "#F5F5F5",
    100: "#FAFAFA",
    200: "#F7F7F7",
    300: "#EFEFEF",
  },
};

export const DARK_COLORS = {
  Black: {
    100: "#A0A0A0",
    200: "#7A7A7A",
    300: "#707070",
    400: "#505050",
    500: "#1C1C1C",
    600: "#000",
  },
  Grayscale: {
    50: "#FAFAFA",
    100: "#444444",
    200: "#555555",
    300: "#666666",
    400: "#777777",
    500: "#888888",
  },
  PrimaryBlue: {
    50: "#1B1F26",
    100: "#223344",
    200: "#3D8BDA",
    300: "#5DB0FF",
    400: "#A0CFFF",
    500: "#90C2FF",
    600: "#A7D3FF",
    700: "#8ABEFF",
  },
  White: {
    100: "#1E1E1E",
  },
  SecondaryYellow: {
    100: "#FFD666",
    200: "#4F3B00",
    300: "#C2A100",
  },
  SecondaryRed: {
    100: "#3B1B1D",
    200: "#FF6B81",
  },
  Line: {
    100: "#292929",
    200: "#3C3C3C",
  },
  Background: {
    100: "#2B2D31",
    400: "#393B40",
  },
  NeutralGray: {
    50: "#2C2C2C",
    100: "#2E2E2E", // Light "#FAFAFA" 대응
    200: "#333333", // Light "#F7F7F7" 대응
    300: "#3D3D3D", // Light "#EFEFEF" 대응
  },
};

declare module "@mui/material/styles" {
  interface Palette {
    Black: typeof COLORS.Black;
    Grayscale: typeof COLORS.Grayscale;
    PrimaryBlue: typeof COLORS.PrimaryBlue;
    White: typeof COLORS.White;
    SecondaryYellow: typeof COLORS.SecondaryYellow;
    SecondaryRed: typeof COLORS.SecondaryRed;
    Line: typeof COLORS.Line;
    Background: typeof COLORS.Background;
    NeutralGray: typeof COLORS.NeutralGray;
  }
  interface PaletteOptions {
    Black?: typeof COLORS.Black;
    Grayscale?: typeof COLORS.Grayscale;
    PrimaryBlue?: typeof COLORS.PrimaryBlue;
    White?: typeof COLORS.White;
    SecondaryYellow?: typeof COLORS.SecondaryYellow;
    SecondaryRed?: typeof COLORS.SecondaryRed;
    Line?: typeof COLORS.Line;
    Background?: typeof COLORS.Background;
    NeutralGray?: typeof COLORS.NeutralGray;
  }
}
