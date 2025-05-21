import { COLORS } from "@/public/theme/colors";
import { Box, BoxProps, Stack, Typography } from "@mui/material";
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
    img: "/images/landing/hand.svg",
  },
  home: {
    title: "가정이사",
    subTitle: "쓰리룸, 20평대 미만",
    img: "/images/landing/car.svg",
  },
  office: {
    title: "기업, 사무실 이사",
    subTitle: "사무실 , 상업공간",
    img: "/images/landing/building.svg",
  },
};

export const CardList = ({ variant }: CardListProps) => {
  const { title, subTitle, img } = CARD_CONTENT[variant];
  const Style =
    variant === "small"
      ? SmallStyle
      : variant === "home"
        ? HomeStyle
        : OfficeStyle;

  const imageStyle =
    variant === "small"
      ? SmallImageStyle
      : variant === "home"
        ? HomeImageStyle
        : OfficeImageStyle;

  return (
    <Box {...Style}>
      <Stack>
        <Typography variant="B_20">{title}</Typography>
        <Typography variant="R_14" color={COLORS.Grayscale[400]}>
          {subTitle}
        </Typography>
      </Stack>

      <Box {...imageStyle}>
        <Image src={img} alt="hand" width={486} height={290} />
      </Box>
    </Box>
  );
};

const SmallStyle: BoxProps = {
  width: ["327px", "327px", "432px"],
  height: ["240px", "240px", "598px"],
  bgcolor: COLORS.PrimaryBlue[100],
  pl: 4,
  pt: 6,
  sx: {
    borderRadius: "32px",
    overflow: "hidden",
    position: "relative",
    "&:hover .slide-in": {
      transform: "translateX(0)",
      opacity: 1,
    },
  },
};

const SmallImageStyle: BoxProps = {
  className: "slide-in",
  sx: {
    position: "absolute",
    bottom: 0,
    right: -100,
    transform: "translateX(50%)",
    opacity: 0,
    transition: "all 1s ease",
  },
};

const HomeStyle: BoxProps = {
  width: ["327px", "327px", "764px"],
  height: ["240px", "240px", "287px"],
  pl: 4,
  pt: 6,
  sx: {
    borderRadius: "32px",
    overflow: "hidden",
    position: "relative",
    "&:hover .slide-in": {
      transform: "translateX(0)",
      opacity: 1,
    },
  },
};

const HomeImageStyle: BoxProps = {
  className: "slide-in",
  sx: {
    position: "absolute",
    bottom: -15,
    right: 0,
    transform: "translateX(60%) ", // 초기 상태
    opacity: 0,
    transition: "all 1s ease",
  },
};
const OfficeStyle: BoxProps = {
  width: ["327px", "327px", "764px"],
  height: ["240px", "240px", "287px"],
  pl: 4,
  pt: 6,
  sx: {
    borderRadius: "32px",
    overflow: "hidden",
    position: "relative",
    "&:hover .slide-in": {
      opacity: 1,
    },
  },
};
const OfficeImageStyle: BoxProps = {
  className: "slide-in",
  sx: {
    position: "absolute",
    bottom: -48,
    right: 0,
    opacity: 0,
    transition: "all 1.5s ease",
  },
};
