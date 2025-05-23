"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
interface ProgressProps {
  value: 1 | 2 | 3 | 4;
}

export const Progress = ({ value }: ProgressProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant={isSmall ? "SB_18" : "SB_24"}>견적요청</Typography>
      <LinearProgress
        variant="determinate"
        value={value * 25}
        sx={(theme) => ({
          backgroundColor: theme.palette.Line[200],
          "& .MuiLinearProgress-bar": {
            backgroundColor: theme.palette.PrimaryBlue[300],
          },
          height: ["6px", "6px", "8px"],
          borderRadius: "30px",
          mt: ["16px", "16px", "24px"],
        })}
      />
    </Box>
  );
};
