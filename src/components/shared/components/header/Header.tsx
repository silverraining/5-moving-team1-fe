"use client";

import {
  Box,
  Button,
  Drawer,
  Link,
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

export const Header = () => {
  const { open, toggleDrawer } = useDrawer();
  const { user, isLogin } = AuthStore();
  const isCustomer = user?.role === "CUSTOMER";
  const isMover = user?.role === "MOVER";
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  const customerMenu = ["견적 요청", "기사님 찾기", "내 견적 관리"];
  const moverMenu = ["받은 요청", "내 견적 관리"];
  const guestMenu = ["기사님 찾기"];

  const TabMenu = isCustomer ? customerMenu : isMover ? moverMenu : guestMenu;
  const DrawerMenu = isCustomer
    ? customerMenu
    : isMover
      ? moverMenu
      : ["로그인", ...guestMenu];

  return (
    <Box
      display={"flex"}
      px={["24px", "24px", "120px"]}
      height={["54px", "54px", "88px"]}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgcolor={theme.palette.White[100]}
    >
      <Stack direction={"row"} alignItems="center" spacing={2}>
        <Link href={"/"} display={"flex"} alignItems={"center"}>
          <Image
            src={"/images/logo/logo.svg"}
            width={88}
            height={34}
            alt="logo"
          />
        </Link>
        {!isSmall && <MenuTabs menu={TabMenu} />}
      </Stack>
      {!isSmall ? (
        isLogin ? (
          <UserTabs isSmall={isSmall} user={user} />
        ) : (
          <Button variant="contained" sx={{ width: "116px", height: "44px" }}>
            로그인
          </Button>
        )
      ) : (
        <Stack direction={"row"} alignItems={"center"} gap={"24px"}>
          {isLogin && <UserTabs isSmall={isSmall} user={user} />}
          <Image
            src={"/images/header/menu.svg"}
            width={24}
            height={24}
            alt="menu"
            onClick={toggleDrawer(true)}
          />
        </Stack>
      )}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <DrawerList menu={DrawerMenu} toggleDrawer={toggleDrawer} />
      </Drawer>
    </Box>
  );
};
