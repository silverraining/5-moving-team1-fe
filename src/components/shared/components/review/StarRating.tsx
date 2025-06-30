import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";

interface StarRatingProps {
  rating: number;
  size?: number;
  gap?: number;
}

export const StarRating = ({ rating, size = 16, gap = 4 }: StarRatingProps) => {
  return (
    <Box sx={{ display: "flex", gap: `${gap}px` }}>
      {Array.from({ length: rating }, (_, index) => (
        <Image
          key={index}
          src="/이미지/star/star_active.svg"
          alt="별점"
          width={size}
          height={size}
        />
      ))}
    </Box>
  );
};
