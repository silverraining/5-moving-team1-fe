"use client";

/**
 * SortDropdown 컴포넌트 사용 방법
 *
 * 1. 정렬 옵션 정의
 * const sortOptions: SortOption[] = [
 *   { label: "리뷰 많은순", value: "review-desc" },
 *   { label: "평점 높은순", value: "rating-desc" },
 *   { label: "평점 낮은순", value: "rating-asc" },
 *   { label: "경력 높은순", value: "career-desc" },
 *   { label: "확정 많은순", value: "confirmed-desc" },
 * ];
 *
 * 2. 컴포넌트 사용
 * <SortDropdown
 *   options={sortOptions}
 *   defaultOption={sortOptions[0]}
 *   onChange={(option) => {
 *     console.log("선택된 옵션:", option);
 *     // 여기에서 정렬 로직 구현
 *   }}
 * />
 */

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { COLORS } from "@/public/theme/colors";

export interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  options: SortOption[];
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
          sx={{
            fontWeight: 500,
            fontSize: ["12px", "14px"],
            color: COLORS.Black[300],
          }}
        >
          {selectedOption.label}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            fontSize: 20,
            marginLeft: "4px",
            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s ease",
            color: COLORS.Grayscale[200],
          }}
        />
      </Box>

      {/* 드롭다운 목록 */}
      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            width: ["91px", "114px"],
            backgroundColor: "white",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            border: `1px solid ${COLORS.Line[100]}`,
            borderRadius: "8px",
            zIndex: 10,
            marginTop: "4px",
          }}
        >
          {options.map((option) => (
            <Box
              key={option.value}
              onClick={() => handleSelect(option)}
              sx={{
                padding: "12px 16px",
                cursor: "pointer",
                backgroundColor:
                  selectedOption.value === option.value
                    ? COLORS.PrimaryBlue[100]
                    : COLORS.White[100],
                "&:hover": {
                  backgroundColor: COLORS.PrimaryBlue[100],
                },
                borderRadius: "8px",
              }}
            >
              <Typography
                sx={{
                  fontSize: ["12px", "14px"],
                  color:
                    selectedOption.value === option.value
                      ? COLORS.PrimaryBlue[300]
                      : COLORS.Black[400],
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                }}
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
