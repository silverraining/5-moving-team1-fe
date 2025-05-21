"use client";

import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { PickersCalendarHeaderProps } from "@mui/x-date-pickers/PickersCalendarHeader";
import { COLORS } from "@/src/public/theme/colors";

export const CustomCalendarHeader = (props: PickersCalendarHeaderProps) => {
  const { currentMonth, onMonthChange } = props;

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const handlePrevMonth = () => {
    onMonthChange(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    onMonthChange(currentMonth.add(1, "month"));
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={"14px"}
      py={isSmall ? "10px" : "12px"}
      height={isSmall ? "48px" : "60px"}
    >
      <IconButton onClick={handlePrevMonth}>
        <ArrowBackIos fontSize="small" />
      </IconButton>
      <Typography
        variant={isSmall ? "SB_16" : "SB_20"}
        sx={{ color: COLORS.Black[400] }}
      >
        {currentMonth.format("YYYY. MM")}
      </Typography>
      <IconButton onClick={handleNextMonth}>
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    </Box>
  );
};
