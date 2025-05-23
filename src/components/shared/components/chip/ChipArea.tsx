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
      sx={(theme) => ({
        display: "inline-block",
        backgroundColor: selected
          ? theme.palette.PrimaryBlue[50]
          : theme.palette.NeutralGray[100],
        borderColor: selected
          ? theme.palette.PrimaryBlue[300]
          : theme.palette.Grayscale[100],
        border: "1px solid",
        padding: "10px 20px",
        borderRadius: "100px",
        cursor: "pointer",
      })}
    >
      <Typography
        sx={(theme) => ({
          fontSize: [14, 18],
          lineHeight: ["24px", "26px"],
          fontWeight: 500,
          color: selected
            ? theme.palette.PrimaryBlue[300]
            : theme.palette.PrimaryBlue[400],
        })}
      >
        {label}
      </Typography>
    </Box>
  );
};
