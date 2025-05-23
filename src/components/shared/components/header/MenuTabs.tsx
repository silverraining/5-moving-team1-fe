import { useTab } from "@/src/hooks/utill";
import { Box, Tab, Tabs, useTheme } from "@mui/material";
import React from "react";

interface MenuTabs {
  menu: string[];
}

export const MenuTabs = ({ menu }: MenuTabs) => {
  const theme = useTheme();
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
              backgroundColor: theme.palette.Black[500],
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
                  ? theme.palette.Black[500] // 초기 상태: 모두 동일하게
                  : value === index
                    ? theme.palette.Black[500] // 선택된 탭
                    : theme.palette.Grayscale[400], // 비활성 탭
              fontSize: "18px",
              fontWeight: 700,
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};
