"use client";

import React from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "react-i18next";
interface NoEstimateModalProps {
  open: boolean;
  onClose: () => void;
}

export const NoEstimateModal = ({ open, onClose }: NoEstimateModalProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const handleMoveToEstimate = () => {
    router.push("/customer/request");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="no-estimate-modal"
      aria-describedby="no-estimate-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "32px",
          p: 4,
          textAlign: "center",
        }}
      >
        <Box
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "24px",
            right: "24px",
            cursor: "pointer",
          }}
        >
          <Image
            src="/이미지/header/X.svg"
            alt="close"
            width={24}
            height={24}
          />
        </Box>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 600,
            color: theme.palette.Black[300],
            marginBottom: "8px",
          }}
        >
          {t("일반 견적을 먼저 요청해주세요")}
        </Typography>
        <Typography
          sx={{
            fontSize: 16,
            color: theme.palette.Black[200],
            marginBottom: "24px",
          }}
        >
          {t("지정 견적을 요청하기 위해서는")}
          <br />
          {t("일반 견적을 먼저 요청해야 합니다.")}
        </Typography>
        <Button
          variant="contained"
          fullWidth
          onClick={handleMoveToEstimate}
          sx={{
            height: "48px",
            fontSize: 16,
            fontWeight: 600,
            backgroundColor: theme.palette.PrimaryBlue[300],
            "&:hover": {
              backgroundColor: theme.palette.PrimaryBlue[500],
            },
          }}
        >
          {t("일반 견적 요청하기")}
        </Button>
      </Box>
    </Modal>
  );
};
