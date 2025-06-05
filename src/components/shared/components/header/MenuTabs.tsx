import { Box, Tab, Tabs, useTheme } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MenuTabs {
  menu: { label: string; href: string }[];
  showIndicator?: boolean;
}

export const MenuTabs = ({ menu, showIndicator = true }: MenuTabs) => {
  const theme = useTheme();
  const pathname = usePathname();

  const validValues = menu.map((item) => item.href);
  const currentValue = validValues.includes(pathname) ? pathname : false;

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
        {menu.map((d, index) => (
          <Tab
            key={index}
            label={d.label}
            value={d.href}
            href={d.href}
            component={Link}
            sx={{
              color:
                pathname === d.href
                  ? theme.palette.Black[500] // 선택된 탭
                  : theme.palette.Grayscale[400], // 비활성 탭
              fontSize: "18px",
              fontWeight: 700,
              textTransform: "none",
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};
