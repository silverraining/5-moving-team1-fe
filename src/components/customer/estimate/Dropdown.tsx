"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DropDownButton from "../../shared/components/drop-down/filter-drop-down/DropDownButton";

export interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  options: SortOption[];
  onChange?: (option: SortOption) => void;
}

export default function SortDropdown({ options, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption>(options[0]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const isTablet = useMediaQuery(
    theme.breakpoints.between("tablet", "desktop")
  );

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: SortOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        marginBottom: ["16px", "16px", "32px"],
      }}
    >
      {/* DropDownButton으로 드롭다운 헤더 */}
      <Box
        width={["127px", "127px", "190px"]}
        height={["36px", "36px", "64px"]}
      >
        <DropDownButton
          label={selectedOption.label}
          isSelected={isOpen}
          onClick={handleToggle}
          width={"100%"}
          height="100%"
          padding={{ mobile: "10px", tablet: "10px", desktop: "15px" }}
          typographyVariant={isMobile ? "M_14" : isTablet ? "M_14" : "M_18"}
          Radius={{ mobile: "8px", tablet: "8px", desktop: "16px" }}
          iconSize={true}
        />
      </Box>

      {/* 드롭다운 목록 */}
      {isOpen && (
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: ["44px", "44px", "72px"],
            left: 0,
            width: ["127px", "127px", "328px"],
            height: ["36px", "36px", "64px"],
            bgcolor: theme.palette.White[100],
            border: "1px solid #eee",
            borderColor: theme.palette.Line[200],
            borderRadius: 16,
            boxShadow: "2px 2px 8px rgba(0,0,0,0.08)",
          })}
        >
          {options.map((option, idx) => (
            <Button
              key={option.value}
              onClick={() => handleSelect(option)}
              sx={{
                justifyContent: "flex-start",
                width: ["127px", "127px", "328px"],
                height: ["36px", "36px", "64px"],
                padding: ["10px", "10px", "15px"],
                cursor: "pointer",
                border:
                  selectedOption.value === option.value
                    ? `1px solid ${theme.palette.PrimaryBlue[300]}`
                    : `1px solid ${theme.palette.Line[200]}`,
                backgroundColor:
                  selectedOption.value === option.value
                    ? theme.palette.PrimaryBlue[50]
                    : theme.palette.White[100],
                borderLeft: `1px solid ${theme.palette.Line[200]}`,
                borderRight: `1px solid ${theme.palette.Line[200]}`,
                borderTop:
                  idx === 0 ? `1px solid ${theme.palette.Line[200]}` : "none",
                borderBottom:
                  idx === options.length - 1
                    ? `1px solid ${theme.palette.Line[200]}`
                    : "none",
                borderRadius:
                  idx === 0
                    ? "8px 8px 0 0"
                    : idx === options.length - 1
                      ? "0 0 8px 8px"
                      : 0,
              }}
            >
              <Typography
                fontSize={["14px", "14px", "18px"]}
                lineHeight={["24px", "24px", "26px"]}
                sx={(theme) => ({
                  color:
                    selectedOption.value === option.value
                      ? theme.palette.PrimaryBlue[300]
                      : theme.palette.Black[400],
                })}
                fontWeight={500}
              >
                {option.label}
              </Typography>
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}
