"use client";

import { Box, Typography } from "@mui/material";

interface DropDownListProps {
  type: "region" | "service";
  items: readonly string[];
  selectedItem?: string;
  onSelect: (value: string) => void;
}

export default function DropDownList({
  type,
  items,
  selectedItem,
  onSelect,
}: DropDownListProps) {
  const isRegion = type === "region";

  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        width: 328,
        height: isRegion ? 320 : 256,
        backgroundColor: theme.palette.White[100],
        borderRadius: "16px",
        boxShadow: "4px 4px 10px rgba(224, 224, 224, 0.25)",
        display: "flex",
        flexDirection: isRegion ? "row" : "column",
        flexWrap: isRegion ? "wrap" : "nowrap",
        padding: 0,
        overflowY: isRegion ? "auto" : "visible",
        zIndex: 10,
      })}
    >
      {items.map((item) => {
        const isSelected = selectedItem === item;

        return (
          <Box
            key={item}
            onClick={() => onSelect(item)}
            sx={(theme) => ({
              width: isRegion ? "50%" : "100%",
              padding: isRegion ? "12px 16px" : "14px 24px",
              cursor: "pointer",
              backgroundColor: isSelected
                ? theme.palette.PrimaryBlue[50]
                : "transparent",
              "&:hover": {
                backgroundColor: theme.palette.PrimaryBlue[50],
              },
            })}
          >
            <Typography variant="M_16">{item}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}
