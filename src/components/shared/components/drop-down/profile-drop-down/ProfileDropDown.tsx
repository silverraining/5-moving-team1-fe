"use client";

import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import ProfileMenuItem from "./ProfileMenuItem";

export default function ProfileDropDown() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));

  return (
    <Box
      sx={(theme) => ({
        width: isTablet ? "152px" : "248px",
        height: isTablet ? "224px" : "296px",
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
      <ProfileMenuItem nickname="김가나" bold type="nickname" />
      <ProfileMenuItem label="프로필 수정" type="menu" />
      <ProfileMenuItem label="찜한 기사님" type="menu" />
      <ProfileMenuItem label="이사 리뷰" type="menu" />

      <Divider
        sx={(theme) => ({
          width: "100%",
          my: "4px",
          borderColor: theme.palette.Line[200],
        })}
      />

      <ProfileMenuItem label="로그아웃" type="logout" />
    </Box>
  );
}
