import { Stack, Typography } from "@mui/material";
import { MenuTabs } from "./MenuTabs";
import { Progress } from "../progress/progress";
import { usePathname } from "next/navigation";
import { useEstimateStore } from "@/src/store/requestStore";
import { MOVER_REQUST, USER_REQUEST } from "@/src/lib/headerConstants";
import { PATH } from "@/src/lib/constants";
import { useEffect } from "react";

export const SubHeader = () => {
  const pathname = usePathname();
  const { step } = useEstimateStore();

  const isProgress = pathname === PATH.userRequest;
  const isLabel = pathname === PATH.userWishlist;
  const label = isLabel ? "찜한 기사님" : "견적요청";

  const isTabmenu =
    pathname.startsWith("/customer/estimate") ||
    pathname.startsWith("/mover/estimate");

  const tabMenu = isTabmenu ? USER_REQUEST : MOVER_REQUST;
  let tabMenuElement = null;
  let progressElement = null;
  let labelElement = null;

  if (!isProgress && !isLabel && isTabmenu) {
    tabMenuElement = <MenuTabs menu={tabMenu} />;
  }

  if (isProgress) {
    progressElement =
      step !== null ? (
        <Progress value={step} />
      ) : (
        <Typography
          variant="SB_24"
          sx={(theme) => ({ fontSize: ["18px", "18px", "24px"] })}
        >
          {label}
        </Typography>
      );
  }

  if (isLabel || step === null) {
    labelElement = (
      <Typography
        variant="SB_24"
        sx={(theme) => ({ fontSize: ["18px", "18px", "24px"] })}
      >
        {label}
      </Typography>
    );
  }

  return (
    <Stack
      justifyContent={isProgress || isLabel ? "center" : "end"}
      maxHeight={"128px"}
      minHeight={
        isProgress && step === null
          ? ["96px", "96px", "128px"]
          : ["96px", "74px", "74px"]
      }
      width={"100%"}
      px={["24px", "72px", "260px"]}
      sx={(theme) => ({ bgcolor: theme.palette.White[100] })}
    >
      {tabMenuElement}
      {progressElement}
      {labelElement}
    </Stack>
  );
};
