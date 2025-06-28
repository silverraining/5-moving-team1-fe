import { PATH } from "@/src/lib/constants";
import { Box, Tab, Tabs, useTheme } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
interface MenuTabs {
  menu: { label: string; href: string; baseUrl?: string }[];
  showIndicator?: boolean;
}

export const MenuTabs = ({ menu, showIndicator = true }: MenuTabs) => {
  const theme = useTheme();
  const pathname = usePathname();
  const pathWithoutLocale = (() => {
    const parts = pathname.split("/");
    if (["ko", "en", "zh"].includes(parts[1])) {
      return "/" + parts.slice(2).join("/");
    }
    return pathname; // locale 없는 경우 그대로 반환
  })();
  const validValues = menu.map((item) => item.href);
  const currentValue = validValues.includes(pathWithoutLocale)
    ? pathWithoutLocale
    : false;
  const { t } = useTranslation();
  return (
    <Box>
      <Tabs
        value={currentValue}
        textColor="inherit"
        slotProps={{
          indicator: {
            style: showIndicator
              ? { backgroundColor: theme.palette.Black[500] }
              : { display: "none" },
          },
        }}
      >
        {menu.map((d, index) => {
          let isSelect = pathWithoutLocale === d.href;
          if (d.baseUrl) {
            isSelect = pathWithoutLocale.startsWith(d.baseUrl);
          }
          if (d.label === t("내 견적 관리")) {
            isSelect =
              pathWithoutLocale === PATH.moverEstimateConfirm ||
              pathWithoutLocale === PATH.moverEstimateReject ||
              pathWithoutLocale === PATH.userEstimate ||
              pathWithoutLocale === PATH.userEstimateHistory;
          }
          return (
            <Tab
              key={index}
              label={d.label}
              value={d.href}
              href={d.href}
              component={Link}
              sx={{
                color: isSelect
                  ? theme.palette.Black[500]
                  : theme.palette.Grayscale[400],
                fontSize: "18px",
                fontWeight: 700,
                textTransform: "none",
              }}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};
