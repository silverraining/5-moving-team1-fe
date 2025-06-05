import { Box, Checkbox as MuiCheckbox, Typography } from "@mui/material";

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
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
        padding: "12px 16px",
        backgroundColor: checked
          ? theme.palette.PrimaryBlue[50]
          : "transparent",
        cursor: "pointer",
      })}
      onClick={(theme) => onChange(!checked)}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          sx={(theme) => ({
            fontWeight: checked ? 600 : 400,
            fontSize: "18px",
            color: theme.palette.Black[400],
          })}
        >
          {label}
        </Typography>
        {count !== undefined && (
          <Typography
            sx={(theme) => ({
              ml: 1,
              color: theme.palette.Black[400],
              fontSize: "18px",
              fontWeight: 400,
            })}
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
        sx={(theme) => ({
          color: theme.palette.Grayscale[100],
          "&.Mui-checked": {
            color: theme.palette.PrimaryBlue[300],
          },
        })}
      />
    </Box>
  );
};
