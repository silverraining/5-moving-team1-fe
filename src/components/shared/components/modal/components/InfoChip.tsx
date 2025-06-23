"use client";

import { Typography, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";

interface InfoBadgeProps {
  label: string; // 표시할 텍스트
}

export function InfoChip({ label }: InfoBadgeProps) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const Chip = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: isSmall ? "2px 4px" : "4px 6px",
    gap: "10px",
    width: isSmall ? "42px" : "59px",
    height: isSmall ? "26px" : "34px",
    background: theme.palette.PrimaryBlue[50],
    borderRadius: "4px",
  }));

  return (
    <Chip>
      <Typography
        variant={isSmall ? "M_13" : "R_18"}
        sx={{
          whiteSpace: "nowrap",
          color: theme.palette.Grayscale[500],
        }}
      >
        {label}
      </Typography>
    </Chip>
  );
}
