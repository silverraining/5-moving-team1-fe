"use client";

import { Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

interface NotificationHeaderProps {
  hasNotifications: boolean;
  onMarkAllAsRead: () => void;
  onClose?: () => void;
}

export default function NotificationHeader({
  onClose,
  onMarkAllAsRead,
  hasNotifications,
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
      <Box>
        {hasNotifications && (
          <Button
            onClick={onMarkAllAsRead}
            sx={(theme) => ({
              color: theme.palette.Grayscale[300],
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
              },
            })}
          >
            {t("모두 읽음")}
          </Button>
        )}
        <IconButton
          onClick={onClose}
          size="small"
          sx={(theme) => ({
            padding: "4px",
            color: theme.palette.Grayscale[50],
          })}
          aria-label="close"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
