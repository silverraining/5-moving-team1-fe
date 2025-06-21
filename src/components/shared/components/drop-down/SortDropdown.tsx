"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  options: readonly SortOption[] | SortOption[];
  defaultOption?: SortOption;
  onChange?: (option: SortOption) => void;
}

export default function SortDropdown({
  options,
  defaultOption,
  onChange,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption>(
    defaultOption || options[0]
  );

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: SortOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <Box sx={{ position: "relative", width: "fit-content" }}>
      {/* 드롭다운 헤더 */}
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
            fontSize: ["12px", "14px"],
            color: theme.palette.Black[300],
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

      {/* 드롭다운 목록 */}
      {isOpen && (
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            width: ["91px", "114px"],
            backgroundColor: "white",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            border: `1px solid ${theme.palette.Line[100]}`,
            borderRadius: "8px",
            zIndex: 10,
            marginTop: "4px",
          })}
        >
          {options.map((option) => (
            <Box
              key={option.value}
              onClick={() => handleSelect(option)}
              sx={(theme) => ({
                padding: "12px 16px",
                cursor: "pointer",
                backgroundColor:
                  selectedOption.value === option.value
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
                    selectedOption.value === option.value
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
