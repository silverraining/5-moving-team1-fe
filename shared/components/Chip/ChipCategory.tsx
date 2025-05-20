import { COLORS } from "@/public/theme/colors";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

export interface ChipProps {
  type: "small" | "home" | "office" | "designation" | "wait" | "complete";
}

const categoryData = {
  small: {
    label: "소형이사",
    bg: COLORS.PrimaryBlue[100],
    text: COLORS.PrimaryBlue[300],
    img: "/images/chip/box.svg",
    alt: "소형이사",
  },
  home: {
    label: "가정이사",
    bg: COLORS.PrimaryBlue[100],
    text: COLORS.PrimaryBlue[300],
    img: "/images/chip/home.svg",
    alt: "가정이사",
  },
  office: {
    label: "사무실이사",
    bg: COLORS.PrimaryBlue[100],
    text: COLORS.PrimaryBlue[300],
    img: "/images/chip/company.svg",
    alt: "사무실이사",
  },
  designation: {
    label: "지정 견적 요청",
    bg: COLORS.SecondaryRed[100],
    text: COLORS.SecondaryRed[200],
    img: "/images/chip/document.svg",
    alt: "지정 견적 요청",
  },
  wait: {
    label: "견적 대기",
    bg: "#F2F3F8",
    text: COLORS.PrimaryBlue[400],
    img: null,
    alt: "견적 대기",
  },
  complete: {
    label: "견적 확정",
    bg: "#F2F3F8",
    text: COLORS.PrimaryBlue[400],
    img: null,
    alt: "견적 확정",
  },
} as const;

export const ChipCategory = ({ type = "small" }: ChipProps) => {
  const data = categoryData[type];
  const theme = useTheme();

  const isMobile = useMediaQuery(
    `(max-width:${theme.breakpoints.values.tablet - 1}px)`
  );
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const size = isMobile ? "sm" : isDesktop ? "xl" : "md";

  const sizeMap = {
    sm: { img: 20, height: 24, borderRadius: 4 },
    md: {
      img: 20,
      font: 13,
      height: 26,
      lineHeight: 22,
      borderRadius: 4,
      gap: 0.25,
      px: "6px",
    },
    xl: {
      img: 24,
      font: 18,
      height: 34,
      lineHeight: 24,
      borderRadius: 8,
      gap: 0.5,
      px: "8px",
    },
  } as const;

  if (!data) return null;

  if (size === "sm") {
    const sizeStyle = sizeMap[size];
    return (
      <Box
        sx={{
          width: "fit-content",
          height: sizeStyle.height,
          borderRadius: sizeStyle.borderRadius,
          backgroundColor: data.bg,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "4px 4px 8px 0px #D9D9D91A",
        }}
      >
        {data.img && (
          <Image
            src={data.img}
            alt={data.alt}
            width={sizeStyle.img}
            height={sizeStyle.img}
          />
        )}
      </Box>
    );
  }

  const sizeInfo = sizeMap[size];
  return (
    <Box
      sx={{
        width: "fit-content",
        height: sizeInfo.height,
        borderRadius: sizeInfo.borderRadius,
        backgroundColor: data.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: sizeInfo.gap,
        px: sizeInfo.px,
        boxShadow: "4px 4px 8px 0px #D9D9D91A",
      }}
    >
      {data.img && (
        <Image
          src={data.img}
          alt={data.alt}
          width={sizeInfo.img}
          height={sizeInfo.img}
        />
      )}
      <Typography
        sx={{
          fontSize: sizeInfo.font,
          lineHeight: `${sizeInfo.lineHeight}px`,
          fontWeight: 600,
          color: data.text,
        }}
      >
        {data.label}
      </Typography>
    </Box>
  );
};
