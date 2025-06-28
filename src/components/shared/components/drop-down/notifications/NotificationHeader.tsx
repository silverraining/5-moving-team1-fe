"use client";

import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
interface NotificationHeaderProps {
  onClose?: () => void;
}

export default function NotificationHeader({
  onClose,
}: NotificationHeaderProps) {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px",
      }}
    >
      <Typography variant="B_16" sx={{ fontWeight: "bold" }}>
        {t("알림")}
      </Typography>
      {/* 닫기 버튼 */}
      <IconButton
        onClick={onClose}
        size="small"
        sx={(theme) => ({
          padding: "4px 8px",
          color: theme.palette.Grayscale[50],
        })}
        aria-label="close"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
