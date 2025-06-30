"use client";

import { Box, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
interface NotificationHeaderProps {
  isMany: boolean;
  allRead: () => void;
  onClose?: () => void;
}

export default function NotificationHeader({
  onClose,
  isMany,
  allRead,
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
      <Box>
        {isMany && <Button onClick={allRead}>모두 읽기</Button>}
        <IconButton
          onClick={onClose}
          size="small"
          sx={(theme) => ({
            padding: "4px ",
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
