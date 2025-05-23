"use client";

import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

type MenuItemType = "nickname" | "menu" | "logout";

interface ProfileMenuItemProps {
  label?: string;
  nickname?: string;
  height?: number;
  bold?: boolean;
  type?: MenuItemType;
}

export default function ProfileMenuItem({
  label,
  nickname,
  height = 54,
  bold = false,
  type,
}: ProfileMenuItemProps) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));

  const content = nickname ? `${nickname} 고객님` : label;
  const itemType: MenuItemType = nickname ? "nickname" : (type ?? "menu");

  const getVariant = () => {
    if (itemType === "nickname") return isTablet ? "M_16" : "M_18";
    if (itemType === "logout") return isTablet ? "M_12" : "M_14";
    return isTablet ? "M_14" : "M_16";
  };

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        maxWidth: "100%",
        height: itemType === "logout" ? "auto" : `${height}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: itemType === "logout" ? "center" : "flex-start",
        paddingY: itemType === "logout" ? (isTablet ? "12px" : "14px") : 0,
        paddingLeft: itemType === "logout" ? 0 : isTablet ? "18px" : "28px",
        boxSizing: "border-box",
        gap: itemType === "logout" ? "2px" : 0,
        cursor: label ? "pointer" : "default",
        "&:hover": {
          ...(itemType === "logout"
            ? {}
            : label
              ? { backgroundColor: theme.palette.PrimaryBlue[50] }
              : undefined),
        },
        overflow: "hidden",
      })}
    >
      <Typography
        variant={getVariant()}
        fontWeight={bold ? "bold" : "normal"}
        whiteSpace="nowrap"
        minWidth={0}
        sx={(theme) => ({
          color:
            itemType === "logout"
              ? theme.palette.Grayscale[500]
              : theme.palette.Black[300],
          display: "flex",
          alignItems: "center",
          transition: "font-weight 0.2s",
          ...(itemType === "logout" && {
            "&:hover": {
              fontWeight: "bold", //로그아웃 hover 시
            },
          }),
        })}
      >
        {content}
      </Typography>
    </Box>
  );
}
