import { User } from "@/src/types/auth";
import {
  Box,
  ClickAwayListener,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NotificationDropDown from "../drop-down/notifications/NotificationDropDown";
import ProfileDropDown from "../drop-down/profile-drop-down/ProfileDropDown";
import { useDropdown } from "@/src/hooks/utill";
import { useNotificationStore } from "@/src/store/notification";

interface UserTab {
  user?: User | null;
  isSmall: boolean;
  logout?: () => void;
}

export const UserTabs = ({ user, isSmall, logout }: UserTab) => {
  const size = isSmall ? 24 : 36;
  const alram = useDropdown();
  const profile = useDropdown();
  const { notifications, markAsRead, setMarkAsRead } = useNotificationStore();

  const alramOpen = () => {
    alram.toggle();
    if (!markAsRead) {
      setMarkAsRead(true);
      return;
    }
  };
  return (
    <Stack
      position="relative"
      direction={"row"}
      alignItems={"center"}
      gap={isSmall ? "24px" : "32px"}
    >
      <Image
        ref={alram.anchorRef}
        width={size}
        height={size}
        src={"/Images/header/alram.svg"}
        alt="alram"
        style={{ position: "relative", cursor: "pointer" }}
        onClick={alramOpen}
      />
      {!markAsRead && (
        <Box
          bgcolor={"red"}
          borderRadius={"50%"}
          width={14}
          height={14}
          left={"20px"}
          bottom={"4px"}
          position={"absolute"}
          color={"white"}
          fontSize={"10px"}
          alignContent={"center"}
          textAlign={"center"}
          fontWeight={700}
        >
          {notifications?.length}
        </Box>
      )}
      <Popper
        open={alram.open}
        anchorEl={alram.anchorRef.current}
        placement="bottom" // 자동으로 오른쪽 정렬
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [-360, -20], // 위/아래 간격 (X, Y)
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={alram.close}>
          <div>
            <NotificationDropDown onClose={alram.close} />
          </div>
        </ClickAwayListener>
      </Popper>
      <Stack direction={"row"} gap={"6px"}>
        <Image
          ref={profile.anchorRef}
          width={size}
          height={size}
          src={user ? user.imageUrl : "/Images/header/profile.svg"}
          alt="alram"
          style={{ cursor: "pointer", borderRadius: "50%" }}
          onClick={profile.toggle}
        />
        <Popper
          open={profile.open}
          anchorEl={profile.anchorRef.current}
          placement="bottom"
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [-100, 0],
              },
            },
            {
              name: "preventOverflow",
              options: {
                boundary: "viewport",
              },
            },
          ]}
        >
          <ClickAwayListener onClickAway={profile.close}>
            <div>
              <ProfileDropDown
                user={user || null}
                logout={logout}
                close={profile.close}
              />
            </div>
          </ClickAwayListener>
        </Popper>
        {!isSmall && (
          <Typography
            variant="M_18"
            sx={(theme) => ({
              color: theme.palette.Black[400],
              alignContent: "center",
            })}
          >
            {user?.name}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
