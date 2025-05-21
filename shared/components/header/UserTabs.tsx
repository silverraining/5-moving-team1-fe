import { COLORS } from "@/public/theme/colors";
import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
interface UserTab {
  user?: {
    id: string;
    name: string;
    role: "customer" | "mover" | null;
    token: string | null;
  };
  isSmall: boolean;
}

export const UserTabs = ({ user, isSmall }: UserTab) => {
  const size = isSmall ? 24 : 36;
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      gap={isSmall ? "24px" : "32px"}
    >
      <Image
        width={size}
        height={size}
        src={"/images/header/alram.svg"}
        alt="alram"
        style={{ cursor: "pointer" }}
      />
      <Stack direction={"row"} gap={"6px"}>
        <Image
          width={size}
          height={size}
          src={"/images/header/profile.svg"}
          alt="alram"
          style={{ cursor: "pointer" }}
        />
        {!isSmall && (
          <Typography variant="M_18" color={COLORS.Black[400]}>
            {user?.name}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
