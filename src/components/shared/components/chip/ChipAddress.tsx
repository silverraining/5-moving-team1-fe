import { Box, Typography } from "@mui/material";

interface ChipProps {
  label: string;
}
// 도로명

export const ChipAddress = ({ label = "도로명" }: ChipProps) => {
  return (
    <Box
      sx={(theme) => ({
        display: "inline-block",
        backgroundColor: theme.palette.PrimaryBlue[50],
        color: theme.palette.PrimaryBlue[300],
        border: "0px",
        padding: ["2px 6px", "2px 8.5px"],
        borderRadius: "16px",
        fontSize: ["12px", "14px"],
        lineHeight: ["20px", "24px"],
        fontWeight: 600,
        boxShadow: "4px 4px 10px 0px #E6E6E640",
      })}
    >
      <Typography
        sx={(theme) => ({
          fontSize: [14, 18],
          lineHeight: ["24px", "26px"],
          fontWeight: 600,
          color: theme.palette.PrimaryBlue[300],
        })}
      >
        {label}
      </Typography>
    </Box>
  );
};
