import { Box, Checkbox as MuiCheckbox, Typography } from "@mui/material";
import { COLORS } from "@/public/theme/colors";

interface CheckboxProps {
  label: string;
  count?: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({
  label,
  count,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
        padding: "12px 16px",
        backgroundColor: checked ? COLORS.PrimaryBlue[50] : "transparent",
        cursor: "pointer",
      }}
      onClick={() => onChange(!checked)}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            fontWeight: checked ? 600 : 400,
            fontSize: "18px",
            color: COLORS.Black[400],
          }}
        >
          {label}
        </Typography>
        {count !== undefined && (
          <Typography
            sx={{
              ml: 1,
              color: COLORS.Black[400],
              fontSize: "18px",
              fontWeight: 400,
            }}
          >
            ({count})
          </Typography>
        )}
      </Box>
      <MuiCheckbox
        checked={checked}
        onChange={(e) => {
          e.stopPropagation();
          onChange(!checked);
        }}
        sx={{
          color: COLORS.Grayscale[100],
          "&.Mui-checked": {
            color: COLORS.PrimaryBlue[300],
          },
        }}
      />
    </Box>
  );
};
