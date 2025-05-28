import { Box, Typography, useTheme } from "@mui/material";

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
  const theme = useTheme();
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "inline-block",
        backgroundColor: selected
          ? theme.palette.PrimaryBlue[50]
          : theme.palette.NeutralGray[100],
        border: `1px solid ${selected ? theme.palette.PrimaryBlue[300] : theme.palette.Grayscale[100]}`,
        "&:hover": {
          backgroundColor: theme.palette.PrimaryBlue[50],
          border: `1px solid ${theme.palette.PrimaryBlue[300]}`,
        },
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
          color: selected
            ? theme.palette.PrimaryBlue[300]
            : theme.palette.PrimaryBlue[400],
          "&:hover": {
            color: theme.palette.PrimaryBlue[300],
          },
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};
