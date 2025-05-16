"use client";

import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CacheProvider } from "@emotion/react";
import { clientSideEmotionCache } from "../../lib/CreateEmotionCache";
import { darkTheme, lightTheme } from "@/public/theme/theme";

interface ThemeModeContextType {
  mode: "light" | "dark";
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: "light",
  toggleMode: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

export const Providers = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </ThemeModeContext.Provider>
  );
};
