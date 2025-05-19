"use client";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { CustomCalendarHeader } from "./_components/CustomCalendarHeader";
import { CustomActionBar } from "./_components/CustonCalendarBtn";
import { Box } from "@mui/material";
import { Dayjs } from "dayjs";

interface CalendarProps {
  onChange: (date: Dayjs | null) => void;
  value: Dayjs | null;
}
export const Calendar = ({ onChange, value }: CalendarProps) => {
  const handleAccept = () => {
    console.log("확인 클릭, 현재 선택값:", value);
  };

  return (
    <Box
      sx={{
        width: 640,
        height: 612,
        overflow: "hidden",

        ".MuiPickersLayout-root": {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },

        ".MuiDateCalendar-root": {
          width: "100%",
          flexGrow: 1,
          minHeight: 0,
        },

        ".MuiPickersLayout-contentWrapper": {
          width: "100%",
          height: "100%",
        },

        ".MuiDayCalendar-monthContainer": {
          width: "100%",
          height: "100%",
        },

        ".MuiDayCalendar-weekDayLabel": {
          width: 64,
          height: 64,
          fontWeight: 500,
          fontSize: 20,
        },

        ".MuiPickersDay-root": {
          width: 64,
          height: 64,
          fontWeight: 500,
          fontSize: 20,
          lineHeight: "32px",
          color: "black",
          "&.Mui-selected": {
            backgroundColor: "#1976d2",
            color: "white",
          },
        },
      }}
    >
      <StaticDatePicker
        value={value}
        onChange={onChange}
        displayStaticWrapperAs="desktop"
        slotProps={{
          layout: {
            sx: {
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            },
          },
          actionBar: {
            actions: ["accept"],
          },
        }}
        slots={{
          calendarHeader: CustomCalendarHeader,
          actionBar: (props) => (
            <CustomActionBar {...props} onAccept={handleAccept} />
          ),
        }}
      />
    </Box>
  );
};
