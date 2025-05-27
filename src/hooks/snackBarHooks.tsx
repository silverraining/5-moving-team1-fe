import React from "react";
import { Snackbar, Alert, Stack, Typography, useTheme } from "@mui/material";
import { useSnackbarStore } from "../store/snackBarStore";
import Image from "next/image";

type Severity = "success" | "error" | "warning" | "info";

interface UseSnackbarReturn {
  openSnackbar: (
    message: string,
    severity?: Severity,
    duration?: number,
    variant?: "filled" | "outlined" | "standard"
  ) => void;
  SnackbarComponent: React.ReactNode;
}

export function useSnackbar(): UseSnackbarReturn {
  const theme = useTheme();
  const infoStyles = {
    bg: theme.palette.PrimaryBlue[100],
    text: theme.palette.PrimaryBlue[300],
    icon: "/images/info.svg",
  };
  const {
    open,
    message,
    severity = "info",
    duration,
    openSnackbar,
    closeSnackbar,
    variant = "standard",
  } = useSnackbarStore();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    closeSnackbar();
  };

  return {
    openSnackbar,
    SnackbarComponent: (
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: (theme) => theme.zIndex.snackbar,
          maxWidth: 955,
          width: "100%",
        }}
      >
        {severity === "info" ? (
          <Alert
            severity={severity}
            sx={{
              bgcolor: infoStyles.bg,
              color: infoStyles.text,
              borderRadius: 2,
              px: 4,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
            icon={
              <Image
                src={infoStyles.icon}
                width={24}
                height={24}
                alt="info icon"
              />
            }
            onClose={handleClose}
          >
            <Typography
              variant="SB_16"
              component="span"
              sx={{ userSelect: "none" }}
            >
              {message}
            </Typography>
          </Alert>
        ) : (
          // info 외에는 기본 Alert 스타일
          <Alert
            variant={variant}
            severity={severity}
            onClose={handleClose}
            sx={{ borderRadius: 2 }}
          >
            {message}
          </Alert>
        )}
      </Snackbar>
    ),
  };
}
