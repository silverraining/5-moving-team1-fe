"use client";

import { Box, BoxProps, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

interface IconBtnProps {
  onClick?: () => void;
}
export const Like = ({ onClick }: IconBtnProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  return (
    <Box
      {...IconBtnOptions}
      onClick={onClick}
      bgcolor={"white"}
      sx={{ ":hover": { bgcolor: "#E6E6E6" }, ...IconBtnOptions.sx }}
    >
      <Image
        src={"/images/icon-btn/like.svg"}
        alt="Like"
        width={isSmall ? 24 : 36}
        height={isSmall ? 24 : 36}
      />
    </Box>
  );
};

export const Clip = ({ onClick }: IconBtnProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  return (
    <Box
      {...IconBtnOptions}
      onClick={onClick}
      bgcolor={"white"}
      sx={{ ":hover": { bgcolor: "#E6E6E6" }, ...IconBtnOptions.sx }}
    >
      <Image
        src={"/images/icon-btn/clip.svg"}
        alt="Clip"
        width={isSmall ? 24 : 36}
        height={isSmall ? 24 : 36}
      />
    </Box>
  );
};

export const FaceBook = ({ onClick }: IconBtnProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  return (
    <Box
      {...IconBtnOptions}
      bgcolor={"#4285F4"}
      sx={{ ":hover": { bgcolor: "#357AE8" }, ...IconBtnOptions.sx }}
      onClick={onClick}
    >
      <Image
        src={"/images/icon-btn/facebook.svg"}
        alt="Facebook"
        width={isSmall ? 24 : 28}
        height={isSmall ? 24 : 28}
      />
    </Box>
  );
};

export const Kakao = ({ onClick }: IconBtnProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  return (
    <Box
      {...IconBtnOptions}
      onClick={onClick}
      bgcolor={"#FAE100"}
      sx={{ ":hover": { bgcolor: "#F9D000" }, ...IconBtnOptions.sx }}
    >
      <Image
        src={"/images/icon-btn/kakao.svg"}
        alt="Kakao"
        width={isSmall ? 24 : 28}
        height={isSmall ? 24 : 28}
      />
    </Box>
  );
};

const IconBtnOptions: BoxProps = {
  width: ["40px", "54px", "64px"],
  height: ["40px", "54px", "64px"],
  borderRadius: "16px",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  sx: {
    cursor: "pointer",
  },
};
