"use client";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { CustomCalendarHeader } from "./_components/CustomCalendarHeader";
import { CustomActionBar } from "./_components/CustomCalendarBtn";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Dayjs } from "dayjs";

interface CalendarProps {
  onChange: (date: Dayjs | null) => void;
  value: Dayjs | null;
  onAccept?: (value: Dayjs | null) => void;
}
export const Calendar = ({ onChange, value, onAccept }: CalendarProps) => {
  const handleAccept = () => {
    onAccept?.(value);
    console.log("확인 클릭, 현재 선택값:", value);
  };
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  // const calendarHeight = isSmall ? 410 : 612;

  return (
    <Box
      sx={{
        width: isSmall ? "327px" : "640px",
        minHeight: isSmall ? "410px" : "612px",
        height: isSmall ? "410px" : "612px",
        overflow: "visible", // 잘림 방지

        // 캘린더 레이아웃
        ".MuiPickersLayout-root": {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: isSmall ? "16px" : "24px",
          backgroundColor: "#ffffff",
          py: isSmall ? "14px" : "24px",
          borderRadius: isSmall ? "16px" : "32px",
          boxShadow: "2px 2px 10px rgba(224, 224, 224, 0.2)",
        },

        ".MuiDateCalendar-root": {
          width: "100%",
          height: "auto",
          flexGrow: 1,
          minHeight: "unset",
          overflow: "visible", //
          maxHeight: "none",
        },

        ".MuiPickersLayout-contentWrapper": {
          width: "100%",
          flexGrow: 1,
        },

        ".MuiDayCalendar-root": {
          width: "100%",
          overflow: "visible",
        },

        ".MuiDayCalendar-monthContainer": {
          width: "100%",
          height: "100%",
          justifyItems: "center",
          alignItems: "center",
        },
        ".MuiDayCalendar-weekContainer": {
          width: isSmall ? 309 : 640,
          height: isSmall ? 42 : 68,
          justifyItems: "center",
          alignItems: "center",
        },

        // 요일 헤더
        ".MuiDayCalendar-weekDayLabel": {
          width: isSmall ? 42 : 64,
          height: isSmall ? 42 : 64,
          fontWeight: 500,
          fontSize: isSmall ? 13 : 20,
          lineHeight: isSmall ? 22 : 32,
        },

        // 날짜 버튼
        ".MuiPickersDay-root": {
          width: isSmall ? "44px" : "64px",
          height: isSmall ? "42px" : "64px",
          fontWeight: 500,
          fontSize: isSmall ? 13 : 20,
          lineHeight: isSmall ? "22px" : "32px",
          color: "black",
          border: "none",
          "&.Mui-selected": {
            backgroundColor: "#1976d2",
            color: "white",
          },
        },
        // 오늘 날짜 테두리 없애기
        ".MuiPickersDay-today": {
          border: "none !important",
          boxShadow: "none !important",
        },
        ".MuiPickersDay-today.Mui-selected": {
          border: "none !important",
          boxShadow: "none !important",
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
            <CustomActionBar
              {...props}
              onAccept={handleAccept}
              disabled={!value}
            />
          ),
        }}
      />
    </Box>
  );
};
