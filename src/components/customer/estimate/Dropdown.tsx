"use client";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import DropDownButton from "../../shared/components/drop-down/filter-drop-down/DropDownButton";

// 옵션 목록
const OPTIONS = [
  { label: "전체", value: "all" },
  { label: "확정한 견적서", value: "complete" },
];

export default function Dropdown() {
  const [open, setOpen] = useState(false); // 드롭다운 열림/닫힘
  const [selected, setSelected] = useState(OPTIONS[0]); // 기본값

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const isTablet = useMediaQuery(
    theme.breakpoints.between("tablet", "desktop")
  );

  // 옵션 선택 함수
  const handleSelect = (option: (typeof OPTIONS)[0]) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        marginBottom: ["16px", "16px", "32px"],
      }}
    >
      <Box
        width={["127px", "127px", "190px"]}
        height={["36px", "36px", "64px"]}
      >
        <DropDownButton
          label={selected.label}
          isSelected={open}
          onClick={() => setOpen((prev) => !prev)}
          width="100%"
          height="100%"
          padding={{ mobile: "10px", tablet: "10px", desktop: "15px" }}
          typographyVariant={isMobile ? "M_14" : isTablet ? "M_14" : "M_18"}
          Radius={{ mobile: "8px", tablet: "8px", desktop: "16px" }}
          iconSize={{ mobile: "10px", tablet: "10px", desktop: "15px" }}
        />
      </Box>
      {open && (
        // 전체 옵션 스타일
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
          {OPTIONS.map((option, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === OPTIONS.length - 1;
            return (
              <Button
                key={option.value}
                sx={(theme) => ({
                  justifyContent: "flex-start",
                  width: ["127px", "127px", "328px"],
                  height: ["36px", "36px", "64px"],
                  padding: ["10px", "10px", "15px"],
                  cursor: "pointer",
                  borderTopLeftRadius: isFirst ? "16px" : 0,
                  borderTopRightRadius: isFirst ? "16px" : 0,
                  borderBottomLeftRadius: isLast ? "16px" : 0,
                  borderBottomRightRadius: isLast ? "16px" : 0,
                  border:
                    selected.value === option.value
                      ? `1px solid ${theme.palette.PrimaryBlue[300]}`
                      : `1px solid ${theme.palette.Line[200]}`,
                  background:
                    selected.value === option.value
                      ? theme.palette.PrimaryBlue[50]
                      : theme.palette.White[100],
                })}
                onClick={() => handleSelect(option)}
              >
                <Typography
                  fontSize={["14px", "14px", "18px"]}
                  lineHeight={["24px", "24px", "26px"]}
                  fontWeight={500}
                  sx={(theme) => ({
                    color:
                      selected.value === option.value
                        ? theme.palette.PrimaryBlue[300]
                        : theme.palette.Black[400],
                  })}
                >
                  {option.label}
                </Typography>
              </Button>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
