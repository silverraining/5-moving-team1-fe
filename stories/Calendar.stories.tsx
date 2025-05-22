import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { koKR } from "@mui/x-date-pickers/locales";
import { Calendar } from "@/src/components/shared/components/date-picker/Calendar";
import { createAppTheme } from "@/public/theme/theme";
import dayjs, { Dayjs } from "dayjs";
import { CssBaseline } from "@mui/material";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

// ✅ 별도 컴포넌트로 분리
const CalendarStoryComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const handleChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
    console.log("날짜 선택됨:", newDate?.format("YYYY-MM-DD"));
  };

  const handleAccept = (value: Dayjs | null) => {
    console.log("확인 버튼 클릭됨:", value?.format("YYYY-MM-DD"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={createAppTheme("light")}>
        <CssBaseline />
        <Calendar
          value={selectedDate}
          onChange={handleChange}
          onAccept={handleAccept}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export const Default: Story = {
  render: () => <CalendarStoryComponent />,
};
