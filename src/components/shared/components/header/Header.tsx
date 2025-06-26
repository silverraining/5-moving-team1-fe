"use client";

import {
  Box,
  Button,
  Drawer,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { DrawerList } from "../DrawerList";
import { useDrawer } from "@/src/hooks/utill";
import { UserTabs } from "./UserTabs";
import { MenuTabs } from "./MenuTabs";
import { AuthStore } from "@/src/store/authStore";
import { API_BASE_URL, PATH } from "@/src/lib/constants";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/src/hooks/snackBarHooks";
import {
  CUSTOMER_MENU,
  GUEST_MENU,
  MOVER_MENU,
} from "@/src/lib/headerConstants";
import Link from "next/link";
import Cookies from "js-cookie";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useEffect, useRef } from "react";
import { useNotificationAll } from "@/src/api/notification/hooks";
import { useNotificationStore } from "@/src/store/notification";

export const Header = () => {
  const router = useRouter();
  const { openSnackbar } = useSnackbar();
  const { open, toggleDrawer } = useDrawer();
  const { user, isLogin, logout } = AuthStore();
  const isCustomer = user?.role === "CUSTOMER";
  const isMover = user?.role === "MOVER";
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  const token = Cookies.get("accessToken");
  const { refetch } = useNotificationAll(!!token);
  const { setNotifications, setMarkAsRead } = useNotificationStore();

  const TabMenu = isCustomer
    ? CUSTOMER_MENU
    : isMover
      ? MOVER_MENU
      : GUEST_MENU;

  const DrawerMenu = isCustomer
    ? CUSTOMER_MENU
    : isMover
      ? MOVER_MENU
      : [{ label: "로그인", href: PATH.userLogin }, ...GUEST_MENU];

  const hendleLogout = () => {
    try {
      openSnackbar("로그아웃 되었습니다", "success", 1000, "standard");
      logout();
      router.replace(PATH.main);
    } catch (error) {
      openSnackbar(
        error instanceof Error ? error.message : "로그아웃 실패",
        "error",
        1000,
        "standard"
      );
    }
  };

  // SSE 연결 관리용 ref와 타이머
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectIntervalRef = useRef<number>(1000); // 초기 1초

  const connectSSE = () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      console.warn("No accessToken, SSE 연결 스킵");
      return;
    }
    const eventSource = new EventSourcePolyfill(
      `${API_BASE_URL}/notifications/stream`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    );

    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      reconnectIntervalRef.current = 1000; // 성공시 간격 초기화
    };

    eventSource.onmessage = (event) => {
      if (event.data === "dummy") {
        return;
      }
      try {
        const notification = JSON.parse(event.data);
        setMarkAsRead(false);
        setNotifications(notification);
      } catch {
        console.log("SSE message (non-JSON):", event.data);
      }
    };

    eventSource.onerror = (err) => {
      console.error("❌ SSE 에러 발생", err);
      refetch();
      eventSource.close();
      scheduleReconnect();
    };
  };

  const scheduleReconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    reconnectTimeoutRef.current = setTimeout(() => {
      console.log(
        `🔄 재연결 시도 (${reconnectIntervalRef.current / 1000}s 후)`
      );
      connectSSE();
      reconnectIntervalRef.current = Math.min(
        reconnectIntervalRef.current * 2,
        10000
      ); // 최대 10초까지 증가
    }, reconnectIntervalRef.current);
  };

  // 로그인 상태 또는 토큰 변경 시 SSE 재연결 처리
  const accessToken = Cookies.get("accessToken");
  useEffect(() => {
    if (!accessToken && user) {
      logout();
    }
    if (!accessToken) {
      // 토큰 없으면 기존 연결 종료 및 타이머 정리
      console.log("토큰 없음. SSE 연결 종료");

      eventSourceRef.current?.close();
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      return;
    }

    // 기존 연결 있으면 종료
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    // 새 연결 생성
    connectSSE();

    // 컴포넌트 언마운트 시 연결 종료 및 타이머 정리
    return () => {
      console.log("🛑 SSE 연결 종료");
      eventSourceRef.current?.close();
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [accessToken, isLogin]);

  return (
    <Box
      display="flex"
      px={["24px", "72px", "260px"]}
      height={["54px", "54px", "88px"]}
      alignItems="center"
      justifyContent="space-between"
      bgcolor={theme.palette.White[100]}
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.palette.Line[100]}`,
      })}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Link href={PATH.main} passHref>
          <Image
            src={"/Images/logo/logo.svg"}
            width={88}
            height={34}
            alt="logo"
          />
        </Link>
        {!isSmall && <MenuTabs menu={TabMenu} showIndicator={false} />}
      </Stack>
      {!isSmall ? (
        isLogin ? (
          <UserTabs isSmall={isSmall} user={user} logout={hendleLogout} />
        ) : (
          <Link href={PATH.userLogin} passHref>
            <Button variant="contained" sx={{ width: "116px", height: "44px" }}>
              로그인
            </Button>
          </Link>
        )
      ) : (
        <Stack direction="row" alignItems="center" gap="24px">
          {isLogin && (
            <UserTabs isSmall={isSmall} user={user} logout={hendleLogout} />
          )}
          <Image
            src={"/Images/header/menu.svg"}
            width={24}
            height={24}
            alt="menu"
            onClick={toggleDrawer(true)}
            style={{ cursor: "pointer" }}
          />
        </Stack>
      )}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <DrawerList menu={DrawerMenu} toggleDrawer={toggleDrawer} />
      </Drawer>
    </Box>
  );
};
