"use client";

import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import ProfileMenuItem from "./ProfileMenuItem";
import { User } from "@/src/types/auth";
import Link from "next/link";
import { PATH } from "@/src/lib/constants";

interface ProfileDropDownProps {
  user: User | null;
  logout?: () => void;
  close?: () => void;
}

export default function ProfileDropDown({
  user,
  logout,
  close,
}: ProfileDropDownProps) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const profileHref =
    user?.role === "MOVER"
      ? PATH.moverProfileRegister
      : PATH.userProfileRegister;
  const rievewHref =
    user?.role === "MOVER" ? PATH.moverReview : PATH.userReviewPending;

  return (
    <Box
      sx={(theme) => ({
        width: isTablet ? "152px" : "248px",
        height: "100%",
        maxHeight: "296px",
        minHeight: "224px",
        padding: isTablet ? "10px 6px 6px" : "16px 4px 6px",
        backgroundColor: theme.palette.White[100],
        border: `1px solid ${theme.palette.Line[200]}`,
        boxShadow: "2px 2px 8px rgba(224, 224, 224, 0.2)",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
      })}
    >
      <ProfileMenuItem nickname={user?.name} bold type="nickname" />
      <Link
        href={profileHref}
        style={{ width: "100%", textDecoration: "none" }}
        onClick={close}
      >
        <ProfileMenuItem label="프로필 수정" type="menu" />
      </Link>
      {user?.role !== "MOVER" && (
        <Link
          href={PATH.userWishlist}
          style={{ width: "100%", textDecoration: "none" }}
          onClick={close}
        >
          <ProfileMenuItem label="찜한 기사님" type="menu" />
        </Link>
      )}
      <Link
        href={rievewHref}
        style={{ width: "100%", textDecoration: "none" }}
        onClick={close}
      >
        <ProfileMenuItem label="이사 리뷰" type="menu" />
      </Link>
      <Divider
        sx={(theme) => ({
          width: "100%",
          my: "4px",
          borderColor: theme.palette.Line[200],
        })}
      />

      <ProfileMenuItem label="로그아웃" type="logout" onClick={logout} />
    </Box>
  );
}
