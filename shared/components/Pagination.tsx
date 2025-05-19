"use client";

import React from "react";
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

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= (isSmall ? 4 : 6)) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (isSmall) {
        // sm 이하일 때: 1 2 3 ... 10
        if (currentPage <= 3) {
          pages.push(1, 2, 3, "...", totalPages);
        } else if (currentPage >= totalPages - 1) {
          pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, "...", currentPage, "...", totalPages);
        }
      } else {
        // lg 이상일 때: 1 2 3 4 5 ... 10
        if (currentPage <= 4) {
          pages.push(1, 2, 3, 4, 5, "...", totalPages);
        } else if (currentPage >= totalPages - 3) {
          pages.push(
            1,
            "...",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
          );
        } else {
          pages.push(
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages
          );
        }
      }
    }

    return pages;
  };

  const buttonSize = isSmall ? 34 : 48;
  const pages = getPages();

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <IconButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{
          width: buttonSize,
          height: buttonSize,
          borderRadius: "6px",
          backgroundColor: "#FFFFFF",
          color: currentPage === 1 ? COLORS.Grayscale[300] : COLORS.Black[400],
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      {pages.map((page, idx) =>
        typeof page === "number" ? (
          <Button
            key={idx}
            onClick={() => onPageChange(page)}
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
          <Typography
            key={idx}
            sx={{
              width: buttonSize,
              height: buttonSize,
              textAlign: "center",
              lineHeight: `${buttonSize}px`,
              color: COLORS.Grayscale[300],
              ...(isSmall
                ? {
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "26px",
                  }
                : {}),
            }}
          >
            {page}
          </Typography>
        )
      )}

      <IconButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{
          width: buttonSize,
          height: buttonSize,
          borderRadius: "6px",
          backgroundColor: "#FFFFFF",
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
