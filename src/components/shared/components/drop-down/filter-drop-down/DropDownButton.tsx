"use client";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";

export interface DropDownButtonProps {
  label: string;
  isSelected: boolean;
  onClick?: () => void;
  width?: string | { mobile?: string; tablet?: string; desktop?: string };
  height?: string | { mobile?: string; tablet?: string; desktop?: string };
  padding?: string | { mobile?: string; tablet?: string; desktop?: string };
  typographyVariant?: "M_14" | "M_18" | "SB_16" | "B_16";
  radius?: string | { mobile?: string; tablet?: string; desktop?: string };
  iconSize?: boolean;
  forceMobileSize?: boolean;
}
export default function DropDownButton({
  label,
  isSelected,
  onClick,
  typographyVariant,
  iconSize,
  forceMobileSize = false,
  ...props
}: DropDownButtonProps) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const isMobileMode = forceMobileSize || isTablet;

  const resolvedIconSize = iconSize
    ? isDesktop && !forceMobileSize
      ? 15
      : 10
    : isMobileMode
    ? 10
    : 15;
  const resolvedTypography =
    typographyVariant ?? (isMobileMode ? "M_14" : "M_18");

  const buttonStyle = {
    justifyContent: "space-between",
    alignItems: "center",
    textTransform: "none",
    display: "flex",
    width: isMobileMode ? "fit-content" : "328px",
    height: isMobileMode ? "36px" : "64px",
    padding: isMobileMode ? "6px 10px 6px 14px" : "16px 24px",
    gap: isMobileMode ? "6px" : "12px",
    border: `1px solid ${
      isSelected
        ? theme.palette.PrimaryBlue[300]
        : isMobileMode
        ? theme.palette.Line[200]
        : theme.palette.Grayscale[100]
    }`,
    borderRadius: isMobileMode ? "8px" : "16px",
    backgroundColor: isSelected
      ? theme.palette.PrimaryBlue[50]
      : theme.palette.White[100],
    boxShadow: "4px 4px 10px rgba(238, 238, 238, 0.1)",
  };

  const iconSrc = isSelected
    ? "/images/drop-down/chevron-down-blue-lg.svg"
    : "/images/drop-down/chevron-down-lg.svg";

  return (
    <Button onClick={onClick} sx={buttonStyle} {...props}>
      <Typography
        variant={resolvedTypography}
        sx={{
          color: isSelected
            ? theme.palette.PrimaryBlue[300]
            : theme.palette.Grayscale[50],
        }}
        paddingRight={isMobileMode ? "5px" : "0px"}
      >
        {label}
      </Typography>
      <Image
        src={iconSrc}
        alt="드롭다운"
        width={resolvedIconSize}
        height={resolvedIconSize}
      />
    </Button>
  );
}
