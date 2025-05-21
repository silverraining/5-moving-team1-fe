import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar";
import { Box, Button } from "@mui/material";

interface CustomActionBarProps extends PickersActionBarProps {
  onAccept?: () => void;
}

export const CustomActionBar = ({ onAccept }: CustomActionBarProps) => {
  return (
    <Button variant="contained" onClick={onAccept}>
      확인
    </Button>
  );
};
