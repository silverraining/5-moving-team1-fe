import { COLORS } from "@/public/theme/colors";
import { Box, Typography } from "@mui/material";

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const ChipArea = ({
  label = "서울",
  selected = false,
  onClick,
}: ChipProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "inline-block",
        backgroundColor: selected ? COLORS.PrimaryBlue[50] : "#FAFAFA",
        borderColor: selected ? COLORS.PrimaryBlue[300] : COLORS.Grayscale[100],
        border: "1px solid",
        padding: "10px 20px",
        borderRadius: "100px",
        cursor: "pointer",
      }}
    >
      <Typography
        sx={{
          fontSize: [14, 18],
          lineHeight: ["24px", "26px"],
          fontWeight: 500,
          color: selected ? COLORS.PrimaryBlue[300] : COLORS.PrimaryBlue[400],
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};
