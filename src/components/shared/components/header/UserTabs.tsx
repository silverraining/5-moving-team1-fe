import { User } from "@/src/types/auth";
import { ClickAwayListener, Popper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import NotificationDropDown from "../drop-down/notifications/NotificationDropDown";
import ProfileDropDown from "../drop-down/profile-drop-down/ProfileDropDown";
import { useDropdown } from "@/src/hooks/utill";
interface UserTab {
  user?: User | null;
  isSmall: boolean;
  logout?: () => void;
}

export const UserTabs = ({ user, isSmall, logout }: UserTab) => {
  const size = isSmall ? 24 : 36;

  const alram = useDropdown();
  const profile = useDropdown();

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
        style={{ cursor: "pointer" }}
        onClick={alram.toggle}
      />
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
          src={"/Images/header/profile.svg"}
          alt="alram"
          style={{ cursor: "pointer" }}
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
