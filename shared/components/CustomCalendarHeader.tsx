"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { PickersCalendarHeaderProps } from "@mui/x-date-pickers/PickersCalendarHeader";

export const CustomCalendarHeader = (props: PickersCalendarHeaderProps) => {
  const { currentMonth, onMonthChange } = props;

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
      py={"12px"}
    >
      <IconButton onClick={handlePrevMonth}>
        <ArrowBackIos fontSize="small" />
      </IconButton>
      <Typography variant="SB_20">{currentMonth.format("YYYY. MM")}</Typography>
      <IconButton onClick={handleNextMonth}>
        <ArrowForwardIos fontSize="small" />
      </IconButton>
    </Box>
  );
};
