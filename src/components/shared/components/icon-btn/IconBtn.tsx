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
      sx={(theme) => ({
        ":hover": { bgcolor: theme.palette.Line[200] },
        ...IconBtnOptions.sx,
      })}
    >
      <Image
        src={"/Images/icon-btn/like.svg"}
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
      sx={(theme) => ({
        ":hover": { bgcolor: theme.palette.Line[200] },
        ...IconBtnOptions.sx,
      })}
    >
      <Image
        src={"/Images/icon-btn/clip.svg"}
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
      bgcolor={theme.palette.PrimaryBlue[600]}
      sx={{
        ":hover": { bgcolor: theme.palette.PrimaryBlue[700] },
        ...IconBtnOptions.sx,
      }}
      onClick={onClick}
    >
      <Image
        src={"/Images/icon-btn/facebook.svg"}
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
      bgcolor={theme.palette.SecondaryYellow[300]}
      sx={{
        ":hover": { bgcolor: theme.palette.SecondaryYellow[200] },
        ...IconBtnOptions.sx,
      }}
    >
      <Image
        src={"/Images/icon-btn/kakao.svg"}
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
