"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "@/src/lib/i18n";

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

  const [mode, setMode] = useState<"light" | "dark" | null>(null); // 초기 null

  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as
      | "light"
      | "dark"
      | null;

    if (savedMode === "light" || savedMode === "dark") {
      setMode(savedMode);
    } else {
      const preferred = prefersDark ? "dark" : "light";
      setMode(preferred);
      localStorage.setItem("theme-mode", preferred);
    }
  }, [prefersDark]);

  useEffect(() => {
    if (mode) localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(
    () => (mode ? createAppTheme(mode) : undefined),
    [mode]
  );
  const queryClient = new QueryClient();

  if (!mode) return null; // hydration mismatch 방지: mode 초기 설정까지 렌더 안함

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={theme!}>
              <CssBaseline />
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ko"
                localeText={
                  koKR.components.MuiLocalizationProvider.defaultProps
                    .localeText
                }
              >
                {children}
              </LocalizationProvider>
            </ThemeProvider>
          </CacheProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </ThemeModeContext.Provider>
  );
};
