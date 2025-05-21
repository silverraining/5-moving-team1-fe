import { useTab } from "@/src/hooks/utill";
import { COLORS } from "@/src/public/theme/colors";
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
                value === false
                  ? COLORS.Black[500] // 초기 상태: 모두 동일하게
                  : value === index
                    ? COLORS.Black[500] // 선택된 탭
                    : COLORS.Grayscale[400], // 비활성 탭
              fontSize: "18px",
              fontWeight: 700,
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};
