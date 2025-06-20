"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export interface MoveSortOption {
  label: string;
  sort: "move_date" | "created_at";
}

interface MoveSortDropdownProps {
  defaultOption?: MoveSortOption;
  onChange?: (option: MoveSortOption) => void;
}

const MOVE_SORT_OPTIONS: MoveSortOption[] = [
  { label: "이사 빠른순", sort: "move_date" },
  { label: "요청일 빠른순", sort: "created_at" },
];

export default function MoveSortDropdown({
  defaultOption,
  onChange,
}: MoveSortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<MoveSortOption>(
    defaultOption || MOVE_SORT_OPTIONS[0]
  );

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: MoveSortOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <Box sx={{ position: "relative", width: "fit-content" }}>
      <Box
        onClick={handleToggle}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: "8px 0",
        }}
      >
        <Typography
          sx={(theme) => ({
            fontWeight: 500,
            fontSize: ["12px", "12px", "14px"],
            color: theme.palette.Black[400],
          })}
        >
          {selectedOption.label}
        </Typography>
        <KeyboardArrowDownIcon
          sx={(theme) => ({
            fontSize: 20,
            marginLeft: "4px",
            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s ease",
            color: theme.palette.Grayscale[200],
          })}
        />
      </Box>

      {isOpen && (
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: "100%",
            left: "auto", // 왼쪽 위치 무시
            right: 0, // 트리거의 오른쪽 끝에 맞춤
            transform: "none", // 중앙 정렬 제거
            width: ["120px", "140px"],
            backgroundColor: "white",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            border: `1px solid ${theme.palette.Line[100]}`,
            borderRadius: "8px",
            zIndex: 10,
            marginTop: "4px",
          })}
        >
          {MOVE_SORT_OPTIONS.map((option) => (
            <Box
              key={option.sort}
              onClick={() => handleSelect(option)}
              sx={(theme) => ({
                padding: "12px 16px",
                cursor: "pointer",
                backgroundColor:
                  selectedOption.sort === option.sort
                    ? theme.palette.PrimaryBlue[100]
                    : theme.palette.White[100],
                "&:hover": {
                  backgroundColor: theme.palette.PrimaryBlue[100],
                },
                borderRadius: "8px",
              })}
            >
              <Typography
                sx={(theme) => ({
                  fontSize: ["12px", "14px"],
                  color:
                    selectedOption.sort === option.sort
                      ? theme.palette.PrimaryBlue[300]
                      : theme.palette.Black[400],
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                })}
              >
                {option.label}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
