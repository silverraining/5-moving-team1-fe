"use client";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { CustomCalendarHeader } from "./components/CustomCalendarHeader";
import { CustomActionBar } from "./components/CustomCalendarBtn";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface CalendarProps {
  onChange: (date: Dayjs | null) => void;
  value: Dayjs | null;
  onAccept?: (value: Dayjs | null) => void;
}
export const Calendar = ({ onChange, value, onAccept }: CalendarProps) => {
  const handleAccept = () => {
    onAccept?.(value);
  };
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  // const calendarHeight = isSmall ? 410 : 612;

  return (
    <Box
      sx={{
        width: isSmall ? "327px" : "640px",
        overflow: "visible", // 잘림 방지

        // 캘린더 레이아웃
        ".MuiPickersLayout-root": {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: isSmall ? "8px" : "16px",
          backgroundColor: theme.palette.White[100],
          py: isSmall ? "14px" : "24px",
          borderRadius: isSmall ? "16px" : "32px",
          boxShadow: "2px 2px 10px rgba(224, 224, 224, 0.2)",
          overflow: "hidden",
        },

        ".MuiDateCalendar-root": {
          width: "100%",
          height: "auto",
          flexGrow: 0,
          minHeight: "unset",
          overflow: "hidden",
          maxHeight: "none",
          mb: isSmall ? "16px" : "24px", // 달력과 버튼 사이 간격 조정
        },

        ".MuiPickersLayout-contentWrapper": {
          width: "100%",
          flexGrow: 0, // 자동 확장 방지
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        },

        ".MuiDayCalendar-root": {
          width: "100%",
          overflow: "hidden",
          height: "auto",
        },

        ".MuiDayCalendar-monthContainer": {
          width: "100%",
          minHeight: isSmall ? "280px" : "420px",
          display: "grid",
          gridTemplateRows: "repeat(6, 1fr)",
          justifyItems: "center",
          alignItems: "center",
          overflow: "hidden",
        },

        ".MuiDayCalendar-weekContainer": {
          width: isSmall ? 309 : 640,
          height: isSmall ? 42 : 68,
          justifyItems: "center",
          alignItems: "center",
          overflow: "hidden",
        },

        // 요일 헤더
        ".MuiDayCalendar-weekDayLabel": {
          width: isSmall ? 40 : 64,
          height: isSmall ? 42 : 64,
          ...(isSmall ? theme.typography.M_13 : theme.typography.M_20),
        },

        // 날짜 버튼
        ".MuiPickersDay-root": {
          width: isSmall ? "44px" : "64px",
          height: isSmall ? "42px" : "64px",
          ...(isSmall ? theme.typography.M_13 : theme.typography.M_20),
          color: "black",
          border: "none",
          "&.Mui-selected": {
            backgroundColor: theme.palette.PrimaryBlue[300],
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

        // 액션바 스타일링
        ".MuiPickersLayout-actionBar": {
          flexShrink: 0,
          overflow: "hidden",
          marginTop: 0, // 상단 마진 제거
        },
      }}
    >
      <StaticDatePicker
        value={value}
        onChange={onChange}
        displayStaticWrapperAs="desktop"
        minDate={dayjs()} // 오늘 이전 날짜 비활성화
        slotProps={{
          layout: {
            sx: {
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              overflow: "hidden",
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
