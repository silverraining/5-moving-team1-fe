import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar";
import { Button, useTheme, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <Button
      variant="contained"
      onClick={onAccept}
      disabled={disabled}
      fullWidth
      sx={(theme) => ({
        width: isSmall ? 279 : 560,
        height: isSmall ? 54 : 64,
        padding: "16px",
        mx: isSmall ? "24px" : "40px",
        backgroundColor: disabled ? theme.palette.Grayscale[100] : undefined,
        borderRadius: "16px",
        ...(isSmall ? theme.typography.SB_16 : theme.typography.SB_20),

        "&.Mui-disabled": {
          backgroundColor: theme.palette.Grayscale[100],
          color: theme.palette.White[100],
        },
      })}
    >
      {t("선택완료")}
    </Button>
  );
};
