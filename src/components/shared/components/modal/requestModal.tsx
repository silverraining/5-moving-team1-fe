"use client";
import { COLORS } from "@/public/theme/colors";
import {
  Button,
  Dialog,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";

interface RequestModalProps {
  open: boolean;
  title?: string;
  description?: string;
  buttonText?: string;
  onClose: () => void;
  onSubmit: () => void;
}

export const RequestModal = ({
  open,
  title = "지정 견적 요청하기",
  description = "일반 견적 요청을 먼저 진행해 주세요.",
  buttonText = "일반 견적 요청 하기",
  onClose,
  onSubmit,
}: RequestModalProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  const size = isSmall ? 24 : 36;
  return (
    <Dialog
      open={open}
      slotProps={{
        paper: {
          sx: {
            borderRadius: isSmall ? "24px" : "32px",
            maxWidth: "608px",
            minWidth: "293px",
            width: "100%",
            maxHeight: "278px",
            height: ["208px", "278px", "278px"],
            px: ["16px", "24px", "24px"],
            pt: ["24px", "32px", "32px"],
            pb: ["24px", "40px", "40px"],
            boxSizing: "border-box",
          },
        },
      }}
    >
      <Stack spacing={isSmall ? 3 : 5}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography
            variant={isSmall ? "B_18" : "SB_24"}
            color={COLORS.Black[400]}
            alignSelf="center"
          >
            {title}
          </Typography>
          <Image
            src={"/images/modal/x.svg"}
            width={size}
            height={size}
            alt="close"
            onClick={onClose}
            style={{ cursor: "pointer" }}
          />
        </Stack>
        <Typography alignContent="center">{description}</Typography>
        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{ height: ["54px", "64px", "64px"] }}
        >
          <Typography variant={isSmall ? "SB_18" : "SB_20"}>
            {buttonText}
          </Typography>
        </Button>
      </Stack>
    </Dialog>
  );
};
