"use client";

import { useEffect, useState } from "react";

export const usePrefersDarkMode = (): boolean => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    setPrefersDarkMode(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersDarkMode;
};
