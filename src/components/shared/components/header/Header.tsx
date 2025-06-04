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
import { PATH } from "@/src/lib/constants";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/src/hooks/snackBarHooks";
import {
  CUSTOMER_MENU,
  GUEST_MENU,
  MOVER_MENU,
} from "@/src/lib/headerConstants";
import Link from "next/link";

export const Header = () => {
  const router = useRouter();
  const { openSnackbar } = useSnackbar();
  const { open, toggleDrawer } = useDrawer();
  const { user, isLogin, logout } = AuthStore();
  const isCustomer = user?.role === "CUSTOMER";
  const isMover = user?.role === "MOVER";
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

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
    logout();
    router.replace(PATH.main);
    openSnackbar("로그아웃 되었습니다", "success", 2000, "standard");
  };
  return (
    <Box
      display={"flex"}
      px={["24px", "72px", "260px"]}
      height={["54px", "54px", "88px"]}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgcolor={theme.palette.White[100]}
    >
      <Stack direction={"row"} alignItems="center" spacing={2}>
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
        <Stack direction={"row"} alignItems={"center"} gap={"24px"}>
          {isLogin && (
            <UserTabs isSmall={isSmall} user={user} logout={hendleLogout} />
          )}
          <Image
            src={"/Images/header/menu.svg"}
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
