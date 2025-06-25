import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { ChipData } from "@/src/types/card";

interface ChipCategoryProps {
  data: ChipData;
  forceMobileSize?: boolean;
}

export const ChipCategory = ({
  data,
  forceMobileSize = false,
}: ChipCategoryProps) => {
  const theme = useTheme();

  const categoryData = {
    SMALL: {
      label: "소형이사",
      bg: theme.palette.PrimaryBlue[100],
      text: theme.palette.PrimaryBlue[300],
      img: "/Images/chip/box.svg",
      alt: "소형이사",
    },
    HOME: {
      label: "가정이사",
      bg: theme.palette.PrimaryBlue[100],
      text: theme.palette.PrimaryBlue[300],
      img: "/Images/chip/home.svg",
      alt: "가정이사",
    },
    OFFICE: {
      label: "사무실이사",
      bg: theme.palette.PrimaryBlue[100],
      text: theme.palette.PrimaryBlue[300],
      img: "/Images/chip/company.svg",
      alt: "사무실이사",
    },
    TARGET: {
      label: "지정 견적 요청",
      bg: theme.palette.SecondaryRed[100],
      text: theme.palette.SecondaryRed[200],
      img: "/Images/chip/document.svg",
      alt: "지정 견적 요청",
    },
    PENDING: {
      label: "견적 대기",
      bg: theme.palette.Background[100],
      text: theme.palette.PrimaryBlue[400],
      img: null,
      alt: "견적 대기",
    },
    CONFIRMED: {
      label: "견적 확정",
      bg: theme.palette.Background[100],
      text: theme.palette.PrimaryBlue[400],
      img: null,
      alt: "견적 확정",
    },
    COMPLETED: {
      label: "견적 확정",
      bg: theme.palette.Background[100],
      text: theme.palette.PrimaryBlue[400],
      img: null,
      alt: "견적 확정",
    },
  } as const;

  const sizeMap = {
    xs: { img: 20, height: 24, borderRadius: "4px" },
    sm: {
      img: 20,
      font: 13,
      height: 26,
      lineHeight: "22px",
      borderRadius: "4px",
      gap: 0.25,
      px: "6px",
    },
    md: {
      img: 24,
      font: 18,
      height: 34,
      lineHeight: "24px",
      borderRadius: "8px",
      gap: 0.5,
      px: "8px",
    },
  } as const;

  //  모바일 사이즈 강제 적용
  const isSmall = useMediaQuery(`(max-width:400px)`);
  const isMobile = useMediaQuery(theme.breakpoints.down("desktop"));
  const size = forceMobileSize ? "sm" : isSmall ? "xs" : isMobile ? "sm" : "md";
  const sizeStyle = sizeMap[size as "xs" | "sm" | "md"];

  const chipTypes = Array.isArray(data.chipType)
    ? data.chipType
    : data.chipType
      ? [data.chipType]
      : [];

  // ✅ category를 배열로 설정
  const categories: (keyof typeof categoryData)[] = [];
  console.log("chip이 받은 데이터", categories);

  // 상태 값 하나만 나오게 설정
  if (data.status === "PENDING") categories.push("PENDING");
  else if (data.status === "COMPLETED") categories.push("COMPLETED");
  else if (data.status === "CONFIRMED") categories.push("CONFIRMED");

  // 서비스 타입 배열도 가능하게 설정
  chipTypes.forEach((type) => {
    if (type === "SMALL" || type === "HOME" || type === "OFFICE") {
      categories.push(type);
    }
  });
  if (data.isTargeted) categories.push("TARGET");

  if (!data || categories.length === 0) return null;

  return (
    <Box display="flex" flexWrap="wrap" gap="8px">
      {categories.map((key) => {
        const cat = categoryData[key];

        return (
          <Box
            key={key}
            sx={{
              width: "fit-content",
              height: sizeStyle.height,
              borderRadius: sizeStyle.borderRadius,
              backgroundColor: cat.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: size === "xs" ? 0 : "gap" in sizeStyle ? sizeStyle.gap : 0,
              px: size === "xs" ? 0 : "px" in sizeStyle ? sizeStyle.px : 0,
              boxShadow: "4px 4px 8px 0px #D9D9D91A",
            }}
          >
            {cat.img && (
              <Image
                src={cat.img}
                alt={cat.alt}
                width={sizeStyle.img}
                height={sizeStyle.img}
              />
            )}
            {size !== "xs" && (
              <Typography
                sx={{
                  fontSize: "font" in sizeStyle ? sizeStyle.font : "13px",
                  lineHeight:
                    "lineHeight" in sizeStyle ? sizeStyle.lineHeight : "18px",
                  fontWeight: 600,
                  color: cat.text,
                }}
              >
                {cat.label}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
