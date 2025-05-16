"use client";
import { Box, Button, Link, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

export const Header = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"), {
    noSsr: true,
  });

  return (
    <Box
      display={"flex"}
      px={["24px", "24px", "120px"]}
      height={["54px", "54px", "88px"]}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Link href={"/"} display={"flex"} alignItems={"center"}>
        <Image
          src={"./images/logo/logo.svg"}
          width={88}
          height={34}
          alt="logo"
        />
      </Link>
      {!isSmall ? (
        <Button sx={{ width: "116px", height: "44px" }}>{"로그인"}</Button>
      ) : (
        <>menu</>
      )}
    </Box>
  );
};
