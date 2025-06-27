"use client";

import { IconButton, useTheme, Menu, MenuItem } from "@mui/material";
import { useThemeMode } from "../providers/Providers";
import { Brightness7, Brightness4, Language } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const locales = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
];

export const DarkModeToggle = () => {
  const theme = useTheme();
  const { toggleMode } = useThemeMode();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 현재 URL에서 locale 추출 (예: /ko/xxx → ko)
  const currentLocale = pathname.split("/")[1] || "ko";

  // Locale 선택 메뉴 상태
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLocaleChange = (locale: string) => {
    // URL에서 현재 locale 부분을 새 locale로 교체
    const segments = pathname.split("/");
    segments[1] = locale; // 두번째 슬래시 뒤가 locale
    const newPath = segments.join("/") || "/";
    router.push(newPath);
    handleClose();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 다크모드 토글 */}
      <IconButton
        onClick={toggleMode}
        color="inherit"
        sx={{
          bgcolor: "background.paper",
          position: "fixed",
          bottom: 16,
          right: 64,
          zIndex: 1300,
        }}
      >
        {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

      {/* 로케일 선택 버튼 */}
      <IconButton
        onClick={handleClick}
        color="inherit"
        sx={{
          bgcolor: "background.paper",
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1300,
        }}
      >
        <Language />
      </IconButton>

      {/* 로케일 선택 메뉴 */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {locales.map(({ code, label }) => (
          <MenuItem
            key={code}
            selected={code === currentLocale}
            onClick={() => handleLocaleChange(code)}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
