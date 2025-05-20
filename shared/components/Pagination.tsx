"use client";

import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { COLORS } from "@/public/theme/colors";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const [isExpanded, setIsExpanded] = useState(false);

  const buttonSize = isSmall ? 34 : 48;

  // < >버튼 클릭 시 자동 확장되도록 설정
  const handlePageChange = (page: number) => {
    if (isSmall && !isExpanded) {
      setIsExpanded(true); // 작은 화면에서는 넘기면 자동 확장
    }
    onPageChange(page);
  };

  const handleExpand = (direction: "left" | "right") => {
    setIsExpanded(true);

    const step = isSmall ? 3 : 5; // 화면 크기에 따라 다르게 이동
    const newPage =
      direction === "left"
        ? Math.max(currentPage - step, 1)
        : Math.min(currentPage + step, totalPages);

    onPageChange(newPage);
  };

  const getPages = () => {
    const pages: (number | string)[] = [];

    // 작은 화면(sm 이하)에서는 1, 2, 3으로 표시
    if (isSmall) {
      if (!isExpanded || currentPage <= 3) {
        if (totalPages <= 5) {
          for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1, 2, 3, "⋯", totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // ex: 1 ... 49 50
        pages.push(1, "⋯", totalPages - 2, totalPages - 1, totalPages);
      } else {
        // 확장 상태에서 currentPage 기준으로 보여줌
        if (currentPage >= totalPages - 2) {
          pages.push(
            1,
            "⋯",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
          );
        } else {
          pages.push(
            1,
            "⋯",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "⋯",
            totalPages
          );
        }
      }

      return pages;
    }

    if (!isExpanded) {
      // 초기 상태
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1, 2, 3, 4, 5, "⋯", totalPages);
      }
    } else {
      // 확장 상태
      if (currentPage <= 5) {
        pages.push(1, 2, 3, 4, 5, "⋯", totalPages);
      } else if (currentPage >= totalPages - 4) {
        pages.push(
          1,
          "⋯",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "⋯",
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          "⋯",
          totalPages
        );
      }
    }

    return pages;
  };
  // const buttonSize = isSmall ? 34 : 48;
  const pages = getPages();

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <IconButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{
          width: buttonSize,
          height: buttonSize,
          borderRadius: "6px",
          color: currentPage === 1 ? COLORS.Grayscale[300] : COLORS.Black[400],
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      {pages.map((page, idx) =>
        typeof page === "number" ? (
          <Button
            key={idx}
            onClick={() => handlePageChange(page)}
            sx={{
              width: buttonSize,
              height: buttonSize,
              minWidth: 0,
              borderRadius: "6px",
              padding: "10px",
              color:
                page === currentPage
                  ? COLORS.Black[400]
                  : COLORS.Grayscale[300],
            }}
          >
            <Typography
              sx={{
                fontWeight: page === currentPage ? 600 : 400,
                fontSize: isSmall ? "16px" : "14px",
                lineHeight: isSmall ? "26px" : "20px",
              }}
            >
              {page}
            </Typography>
          </Button>
        ) : (
          <Button
            key={idx}
            onClick={
              () =>
                idx === 1
                  ? handleExpand("left") // 앞쪽 ... 클릭
                  : handleExpand("right") // 뒤쪽 ... 클릭
            }
            sx={{
              width: buttonSize,
              height: buttonSize,
              minWidth: 0,
              borderRadius: "6px",
              padding: "10px",
              color: COLORS.Grayscale[300],
            }}
          >
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: isSmall ? "16px" : "14px",
                lineHeight: isSmall ? "26px" : "20px",
              }}
            >
              {page}
            </Typography>
          </Button>
        )
      )}

      <IconButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{
          width: buttonSize,
          height: buttonSize,
          borderRadius: "6px",
          color:
            currentPage === totalPages
              ? COLORS.Grayscale[300]
              : COLORS.Black[400],
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default Pagination;
