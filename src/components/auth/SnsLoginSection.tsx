import { Stack, Typography } from "@mui/material";
import Image from "next/image";

interface SnsLoginSectionProps {
  title: string;
  isSmall: boolean;
}

export const SnsLoginSection = ({ isSmall, title }: SnsLoginSectionProps) => {
  const size = isSmall ? 54 : 72;
  return (
    <Stack spacing={[3, 3, 4]} alignItems={"center"}>
      <Typography variant={isSmall ? "R_12" : "R_20"}>{title}</Typography>
      <Stack direction={"row"} spacing={[3, 3, 4]}>
        <Image
          src={"/images/icon-btn/google_login.svg"}
          alt="google"
          width={size}
          height={size}
          style={{ cursor: "pointer" }}
        />
        <Image
          src={"/images/icon-btn/kakao_login.svg"}
          alt="kakao"
          width={size}
          height={size}
          style={{ cursor: "pointer" }}
        />
        <Image
          src={"/images/icon-btn/naver_login.svg"}
          alt="naver"
          width={size}
          height={size}
          style={{ cursor: "pointer" }}
        />
      </Stack>
    </Stack>
  );
};
