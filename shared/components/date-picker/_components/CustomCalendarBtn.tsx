import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar";
import { Button, useTheme, useMediaQuery } from "@mui/material";
import { COLORS } from "@/public/theme/colors";

interface CustomActionBarProps extends PickersActionBarProps {
  onAccept?: () => void;
  disabled?: boolean;
}

export const CustomActionBar = ({
  onAccept,
  disabled,
}: CustomActionBarProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  return (
    <Button
      variant="contained"
      onClick={onAccept}
      disabled={disabled}
      fullWidth
      sx={{
        width: isSmall ? 279 : 560,
        height: isSmall ? 54 : 64,
        padding: "16px",
        mx: isSmall ? "24px" : "40px",
        backgroundColor: disabled ? COLORS.Grayscale[100] : undefined,
        borderRadius: "16px",
        fontWeight: 600,
        fontSize: isSmall ? "16px" : "20px",
        lineHeight: isSmall ? "26px" : "32px",

        "&.Mui-disabled": {
          backgroundColor: COLORS.Grayscale[100],
          color: "#ffffff",
        },
      }}
    >
      선택완료
    </Button>
  );
};
