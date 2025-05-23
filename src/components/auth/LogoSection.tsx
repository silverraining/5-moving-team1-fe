import { PATH } from "@/src/hooks/constants";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface LogoSectionProps {
  description: string;
  link: { content: string; href: string };
  isSmall: boolean;
}

export const LogoSection = ({
  description,
  link,
  isSmall,
}: LogoSectionProps) => {
  const width = isSmall ? 112 : 140;
  const height = isSmall ? 64 : 80;
  return (
    <Stack width={"100%"} alignItems={"center"} spacing={"18px"}>
      <Link href={PATH.main}>
        <Image
          src={"/images/logo/logo_text.svg"}
          alt="Logo"
          width={width}
          height={height}
        />
      </Link>
      <Stack
        direction={"row"}
        spacing={"8px"}
        sx={(theme) => ({
          bgcolor: theme.palette.primary.main,
          color: theme.palette.common.white,
        })}
      >
        <Typography>{description}</Typography>
        <Link href={link.href}>{link.content}</Link>
      </Stack>
    </Stack>
  );
};
