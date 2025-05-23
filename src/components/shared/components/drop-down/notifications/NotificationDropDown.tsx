"use client";

import { Box, useTheme, useMediaQuery } from "@mui/material";
import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";
import CustomScrollY from "@/src/lib/customScrollY";
import { mockNotifications } from "./notifications.mock";

interface NotificationDropDownProps {
  onHighlightClick?: (highlight: string) => void;
}

export default function NotificationDropDown({
  onHighlightClick,
}: NotificationDropDownProps) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("tablet"));

  //TODO: 하이라이트 클릭 시 라우팅 처리, 콘솔로그 제거
  const handleHighlightClick = (highlight: string) => {
    if (onHighlightClick) {
      onHighlightClick(highlight);
      // router.push(`/notifications/${id}`)
      // <Link href={`/notifications/${id}`}>...</Link>
      // 이런 식으로 확장
    } else {
      //console.log(`"${highlight}" 클릭됨 (라우팅 예정)`);
    }
  };

  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        top: "20px",
        left: "20px",
        width: isTablet ? "312px" : "359px",
        height: isTablet ? "314px" : "352px",
        backgroundColor: theme.palette.White[100],
        border: `1px solid ${theme.palette.Line[200]}`,
        boxShadow: "2px 2px 16px rgba(0, 0, 0, 0.06)",
        borderRadius: "24px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      })}
    >
      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          pr: "2px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: isTablet ? "8px 12px" : "10px 16px",
          ...CustomScrollY,
        }}
      >
        <NotificationHeader />

        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {mockNotifications.map((item) => (
            <NotificationItem
              key={item.id}
              message={item.message}
              highlight={item.highlight}
              createdAt={item.createdAt}
              onHighlightClick={() => handleHighlightClick(item.highlight)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
