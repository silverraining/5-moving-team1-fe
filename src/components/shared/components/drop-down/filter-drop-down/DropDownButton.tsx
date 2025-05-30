"use client";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";

interface DropDownButtonProps {
  label: string;
  isSelected: boolean;
  onClick?: () => void;
  width?: string | { mobile?: string; tablet?: string; desktop?: string };
  height?: string | { mobile?: string; tablet?: string; desktop?: string };
  padding?: string | { mobile?: string; tablet?: string; desktop?: string };
  gap?: string | { mobile?: string; tablet?: string; desktop?: string };
  iconSize?: string | { mobile?: string; tablet?: string; desktop?: string };
  typographyVariant?: "M_14" | "M_18" | "SB_16" | "B_16"; // 필요에 따라 확장 가능
  Radius?: string | { mobile?: string; tablet?: string; desktop?: string };
}

export default function DropDownButton({
  label,
  isSelected,
  onClick,
  width,
  height,
  padding,
  gap,
  iconSize,
  typographyVariant,
  Radius,
}: DropDownButtonProps) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));

  const resolvedWidth = width ?? (isTablet ? "fit-content" : "328px");
  const resolvedHeight = height ?? (isTablet ? "36px" : "64px");
  const resolvedPadding =
    padding ?? (isTablet ? "6px 10px 6px 14px" : "16px 24px");
  const resolvedGap = gap ?? (isTablet ? "6px" : "12px");
  const resolvedIconSize = iconSize ?? (isTablet ? 10 : 15);
  const resolvedTypography = typographyVariant ?? (isTablet ? "M_14" : "M_18");
  const resolvedRadius = Radius ?? (isTablet ? "8px" : "16px");

  const buttonStyle = {
    justifyContent: "space-between",
    alignItems: "center",
    textTransform: "none",
    display: "flex",
    width: resolvedWidth,
    height: resolvedHeight,
    padding: resolvedPadding,
    gap: resolvedGap,
    border: `1px solid ${
      isSelected
        ? theme.palette.PrimaryBlue[300]
        : isTablet
          ? theme.palette.Line[200]
          : theme.palette.Grayscale[100]
    }`,
    borderRadius: resolvedRadius,
    backgroundColor: isSelected
      ? theme.palette.PrimaryBlue[50]
      : theme.palette.White[100],
    boxShadow: "4px 4px 10px rgba(238, 238, 238, 0.1)",
  };

  const iconSrc = isSelected
    ? "/images/drop-down/chevron-down-blue-lg.svg"
    : "/images/drop-down/chevron-down-lg.svg";

  return (
    <Button onClick={onClick} sx={buttonStyle}>
      <Typography
        variant={resolvedTypography}
        sx={{
          color: isSelected
            ? theme.palette.PrimaryBlue[300]
            : theme.palette.Grayscale[50],
        }}
        paddingRight={isTablet ? "5px" : "0px"}
      >
        {label}
      </Typography>
      <Box
        width={resolvedIconSize}
        height={resolvedIconSize}
        position={"relative"}
      >
        <Image src={iconSrc} alt="드롭다운" fill />
      </Box>
    </Button>
  );
}
