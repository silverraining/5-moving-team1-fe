import { useTab } from "@/lib/utill";
import { COLORS } from "@/public/theme/colors";
import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

interface MenuTabs {
  menu: string[];
}

export const MenuTabs = ({ menu }: MenuTabs) => {
  const { value, handleChange } = useTab();
  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        slotProps={{
          indicator: {
            style: {
              color: "black",
              backgroundColor: COLORS.Black[500],
            },
          },
        }}
      >
        {menu.map((d, index) => (
          <Tab
            key={d}
            label={d}
            sx={{
              color:
                value === index ? COLORS.Black[500] : COLORS.Grayscale[100], // 선택된 탭 텍스트 색상
              fontWeight: value === index + 1 ? "bold" : "normal",
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};
