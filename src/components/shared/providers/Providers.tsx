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

  // 초기값은 light로 설정 (서버 사이드 렌더링 대응)
  const [mode, setMode] = useState<"light" | "dark">("light");

  // 마운트 시 로컬스토리지 값 읽어서 mode 설정
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode");

    if (savedMode === "light" || savedMode === "dark") {
      setMode(savedMode);
    } else {
      // 저장된 값 없으면 OS 선호도 사용
      setMode(prefersDark ? "dark" : "light");
    }
  }, [prefersDark]);

  // mode가 바뀔 때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const queryClient = new QueryClient();
  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={theme}>
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
