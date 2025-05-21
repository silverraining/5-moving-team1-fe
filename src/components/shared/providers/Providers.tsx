"use client";

import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CacheProvider } from "@emotion/react";

import { usePrefersDarkMode } from "./hooks";
import "dayjs/locale/ko";
import { koKR } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import { clientSideEmotionCache } from "@/src/hooks/createEmotionCache";
import { createAppTheme } from "@/public/theme/theme";
interface ThemeModeContextType {
  mode: "light" | "dark";
  toggleMode: () => void;
}

dayjs.locale("ko");

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: "light",
  toggleMode: () => {},
});
export const useThemeMode = () => useContext(ThemeModeContext);

export const Providers = ({ children }: { children: ReactNode }) => {
  const prefersDark = usePrefersDarkMode();
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDark ? "dark" : "light"
  );

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ko"
            localeText={
              koKR.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            {children}
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </ThemeModeContext.Provider>
  );
};
