import { Stack, Typography, Box } from "@mui/material";
import { MenuTabs } from "./MenuTabs";
import { Progress } from "../progress/progress";
import { usePathname } from "next/navigation";
import { useEstimateStore } from "@/src/store/requestStore";
import {
  MOVER_REQUST,
  USER_REQUEST,
  USER_REVIEW,
} from "@/src/lib/headerConstants";
import { PATH } from "@/src/lib/constants";

export const SubHeader = () => {
  const pathname = usePathname();
  const { step } = useEstimateStore();

  const pathWithoutLocale = (() => {
    const parts = pathname.split("/");
    if (["ko", "en", "zh"].includes(parts[1])) {
      return "/" + parts.slice(2).join("/");
    }
    return pathname; // locale 없는 경우 그대로 반환
  })();
  const isProgress = pathWithoutLocale === PATH.userRequest;
  const isLabel = pathWithoutLocale === PATH.userWishlist;
  const label = isLabel ? "찜한 기사님" : "견적요청";

  const isTabmenu =
    pathWithoutLocale.startsWith("/customer/estimate") ||
    pathWithoutLocale.startsWith("/mover/estimate/confirm") ||
    pathWithoutLocale.startsWith("/mover/estimate/reject") ||
    pathWithoutLocale.startsWith(PATH.userReview);

  const tabMenu = pathWithoutLocale.startsWith(PATH.userReview)
    ? USER_REVIEW
    : pathWithoutLocale.startsWith("/customer/estimate")
      ? USER_REQUEST
      : MOVER_REQUST;

  let tabMenuElement = null;
  let progressElement = null;
  let labelElement = null;

  if (!isProgress && !isLabel && isTabmenu) {
    tabMenuElement = <MenuTabs menu={tabMenu} />;
  }

  if (isProgress) {
    progressElement = <Progress value={step} />;
  }

  if (isLabel) {
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
      alignContent={"end"}
      maxHeight={"128px"}
      minHeight={
        isProgress ? ["96px", "96px", "128px"] : ["96px", "74px", "74px"]
      }
      width={"100%"}
      px={["24px", "72px", "72px"]}
      sx={(theme) => ({ bgcolor: theme.palette.White[100] })}
    >
      <Stack maxWidth={"1400px"} width={"100%"} mx={"auto"}>
        {tabMenuElement}
        {isProgress && (
          <Box sx={{ paddingY: ["24px", "24px", "32px"] }}>
            {progressElement}
          </Box>
        )}
        {labelElement}
      </Stack>
    </Stack>
  );
};
