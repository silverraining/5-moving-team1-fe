"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";

type VariantType = "small" | "office" | "home";

interface CardListProps {
  variant: VariantType;
}

const CARD_CONTENT: Record<
  VariantType,
  { title: string; subTitle: string; img: string }
> = {
  small: {
    title: "소형이사",
    subTitle: "원룸, 투룸, 20평대 미만",
    img: "/Images/landing/hand.svg",
  },
  home: {
    title: "가정이사",
    subTitle: "쓰리룸, 20평대 미만",
    img: "/Images/landing/car.svg",
  },
  office: {
    title: "기업, 사무실 이사",
    subTitle: "사무실 , 상업공간",
    img: "/Images/landing/building.svg",
  },
};

const IMAGE_RATIO: Record<VariantType, number> = {
  small: 284.16 / 182.4,
  home: 291.6 / 174,
  office: 316.92 / 131.14,
};

export const CardList = ({ variant }: CardListProps) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }

    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const { title, subTitle, img } = CARD_CONTENT[variant];

  // isSmall일 때 무조건 최소 이미지 사이즈 지정, 아닐 때는 containerWidth 기준
  const imageWidth = isSmall
    ? variant === "small"
      ? 284 // small은 고정 최소값
      : 290 // 다른 variant들은 적당히 고정값 지정 가능
    : containerWidth
      ? containerWidth * 0.5
      : 0;

  const imageHeight = imageWidth / IMAGE_RATIO[variant];

  const baseHeight = variant === "small" ? 598 : 287;
  const height = isSmall ? 240 : baseHeight;

  const baseSx = {
    bgcolor:
      variant === "small"
        ? theme.palette.PrimaryBlue[100]
        : theme.palette.White[100],
    borderRadius: "32px",
    overflow: "hidden",
    position: "relative",
    pl: 4,
    pt: 6,
    width: "100%",
    maxWidth: variant === "small" ? (isSmall ? "100%" : 432) : 764,
    minWidth: 327,
    height,
    boxSizing: "border-box",
    cursor: "pointer",
    "&:hover .slide-in": {
      transform: variant === "office" ? "translateY(0)" : "translateX(0)",
      opacity: 1,
      transition: "all 1s ease",
    },
  };

  const imageSx = {
    position: "absolute" as const,
    bottom: variant === "small" ? 0 : variant === "home" ? -15 : -0,
    right: variant === "small" ? -imageWidth * 0.3 : 0,
    transform: variant === "office" ? "translateY(60%)" : "translateX(50%)",
    opacity: 1,
    transition: "all 1s ease",
  };

  return (
    <Box sx={baseSx} ref={containerRef}>
      <Stack spacing={1}>
        <Typography variant="B_20">{title}</Typography>
        <Typography variant="R_14" sx={{ color: theme.palette.Grayscale[400] }}>
          {subTitle}
        </Typography>
      </Stack>

      <Box className="slide-in" sx={imageSx}>
        {imageWidth > 0 && (
          <Image
            src={img}
            alt={title}
            width={imageWidth}
            height={imageHeight}
            loading="lazy"
            style={{ pointerEvents: "none", userSelect: "none" }}
          />
        )}
      </Box>
    </Box>
  );
};
