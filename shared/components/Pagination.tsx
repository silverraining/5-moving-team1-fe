// shared/components/Pagination.tsx

import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { COLORS } from "@/public/theme/colors"; // 상대경로는 프로젝트에 맞게 수정

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
  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 5) {
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

    return pages;
  };

  const pages = getPages();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={1}
      mt={3}
    >
      <IconButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{
          width: 34,
          height: 34,
          borderRadius: "6px",
          backgroundColor: "#FFFFFF",
          color: currentPage === 1 ? COLORS.Grayscale[300] : COLORS.Black[400],
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      {pages.map((page, idx) => {
        if (typeof page === "number") {
          const isCurrent = page === currentPage;
          return (
            <Button
              key={idx}
              onClick={() => onPageChange(page)}
              sx={{
                width: "34px",
                height: "34px",
                minWidth: "0",
                borderRadius: "6px",
                padding: 0,
                color: isCurrent ? COLORS.Black[400] : COLORS.Grayscale[300],
                fontWeight: isCurrent ? "bold" : "normal",
              }}
            >
              {page}
            </Button>
          );
        } else {
          return (
            <Typography
              key={idx}
              sx={{
                width: "34px",
                height: "34px",
                textAlign: "center",
                color: COLORS.Grayscale[300],
              }}
            >
              {page}
            </Typography>
          );
        }
      })}

      <IconButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{
          width: 34,
          height: 34,
          backgroundColor: "#FFFFFF",
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
