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
import { AuthStore } from "@/src/store/authStore";
import { CustomerProfileResponse } from "@/src/api/customer/api";
import { MoverProfileRequest } from "@/src/api/mover/api";
import { ServiceRegion, ServiceType } from "@/src/types/common";

export interface UnifiedProfile {
  name: string;
  imageUrl: string | null;
  serviceType: Record<ServiceType, boolean>;
  serviceRegion: Record<ServiceRegion, boolean>;
  intro?: string;
  description?: string;
  experience?: number;
  email?: string;
  phone?: string;
  role: "CUSTOMER" | "MOVER";
}
interface UserTab {
  user?: User | null;
  isSmall: boolean;
  logout?: () => void;
}

export const UserTabs = ({ user, isSmall, logout }: UserTab) => {
  const { profile: userProfile } = AuthStore();
  const size = isSmall ? 24 : 36;
  const alram = useDropdown();
  const profile = useDropdown();
  const { notifications, markAsRead, setMarkAsRead } = useNotificationStore();

  const toUnifiedProfile = (
    data: CustomerProfileResponse | MoverProfileRequest | null | undefined,
    role?: "CUSTOMER" | "MOVER"
  ): UnifiedProfile | null => {
    if (!data) return null;

    if (role === "CUSTOMER") {
      const customer = data as CustomerProfileResponse;
      return {
        role: "CUSTOMER",
        name: customer.name,
        imageUrl: customer.imageUrl ?? null,
        serviceType: customer.serviceType,
        serviceRegion: customer.serviceRegion,
        email: customer.email,
        phone: customer.phone,
      };
    } else {
      const mover = data as MoverProfileRequest;
      return {
        role: "MOVER",
        name: mover.nickname,
        imageUrl: mover.imageUrl ?? null,
        serviceType: mover.serviceType,
        serviceRegion: mover.serviceRegion,
        intro: mover.intro,
        description: mover.description,
        experience: mover.experience,
      };
    }
  };

  const unifiedProfile = toUnifiedProfile(userProfile, user?.role);

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
          src={
            // user.imageUrl이 빈 문자열일 경우 기본Images 적용하도록
            userProfile &&
            userProfile.imageUrl &&
            userProfile.imageUrl.trim() !== ""
              ? userProfile.imageUrl
              : "/Images/header/Profile.svg"
          }
          alt="profile"
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
                user={unifiedProfile || null}
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
            {unifiedProfile?.name}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
