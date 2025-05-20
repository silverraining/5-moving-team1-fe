import { COLORS } from "@/public/theme/colors";
import { Box, Typography } from "@mui/material";

interface ChipProps {
  label: string;
  size?: "sm" | "md";
}
// 도로명

export const ChipAddress = ({ label = "도로명", size = "md" }: ChipProps) => {
  return (
    <Box
      sx={{
        display: "inline-block",
        backgroundColor: COLORS.PrimaryBlue[50],
        color: COLORS.PrimaryBlue[300],
        border: "0px",
        padding: size === "md" ? "2px 8.5px" : "2px 6px",
        borderRadius: "16px",
        fontSize: size === "md" ? "14px" : "12px",
        lineHeight: size === "md" ? "24px" : "20px",
        fontWeight: 600,
        boxShadow: "4px 4px 10px 0px #E6E6E640",
      }}
    >
      <Typography
        variant={size === "md" ? "SB_18" : "SB_14"}
        color={COLORS.PrimaryBlue[300]}
      >
        {label}
      </Typography>
    </Box>
  );
};
