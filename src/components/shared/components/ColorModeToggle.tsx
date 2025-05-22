"use client";
import { IconButton, useTheme } from "@mui/material";
import { useThemeMode } from "../providers/Providers";
import { Brightness7, Brightness4 } from "@mui/icons-material";
import { useEffect, useState } from "react";

export const DarkModeToggle = () => {
  const theme = useTheme();
  const { toggleMode } = useThemeMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <IconButton
      onClick={toggleMode}
      color="inherit"
      sx={{
        bgcolor: "background.paper",
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1300,
      }}
    >
      {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};
