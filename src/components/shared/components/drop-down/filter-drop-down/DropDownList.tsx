"use client";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CustomScrollY from "@/src/lib/customScrollY";

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
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));

  const wrapperWidth = isTablet ? (isRegion ? 150 : 89) : 328;
  const wrapperHeight = isTablet
    ? isRegion
      ? 179
      : 144
    : isRegion
      ? 320
      : 256;

  const getItemStyle = (isSelected: boolean) => ({
    boxSizing: "border-box",
    height: isTablet ? "36px" : "64px",
    padding: isTablet ? "6px 14px" : "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    cursor: "pointer",
    backgroundColor: isSelected ? theme.palette.PrimaryBlue[50] : "transparent",
    "&:hover": {
      backgroundColor: theme.palette.PrimaryBlue[50],
    },
  });

  const listContent = items.map((item) => {
    const isSelected = selectedItem === item;
    return (
      <Box
        key={item}
        onClick={() => onSelect(item)}
        sx={getItemStyle(isSelected)}
      >
        <Typography variant={isTablet ? "M_14" : "M_16"} whiteSpace="nowrap">
          {item}
        </Typography>
      </Box>
    );
  });

  return (
    <Box
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        mt: "4px",
        width: wrapperWidth,
        height: wrapperHeight,
        backgroundColor: theme.palette.White[100],
        borderRadius: isTablet ? "8px" : "16px",
        boxShadow: "4px 4px 10px rgba(224, 224, 224, 0.25)",
        border: `1px solid ${theme.palette.Line[200]}`,
        overflow: "hidden",
        zIndex: 10,
        backgroundImage: isRegion
          ? "linear-gradient(to right, transparent calc(50% - 0.5px), #E0E0E0 0, transparent calc(50% + 0.5px))"
          : "none",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <Box
        sx={{
          height: "100%",
          overflowY: type === "region" ? "auto" : "hidden",
          overflowX: "hidden",
          ...CustomScrollY,
        }}
      >
        <Box
          sx={{
            display: isRegion ? "grid" : "block",
            gridTemplateColumns: isRegion ? "1fr 1fr" : "none",
          }}
        >
          {listContent}
        </Box>
      </Box>
    </Box>
  );
}
