"use client";

import {
  InputProps,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  SxProps,
  Theme,
} from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextareaProps extends Omit<InputProps, "fullWidth"> {
  register: UseFormRegisterReturn;
  errorMessage?: string;
  border?: boolean;
  sx?: SxProps<Theme>;
}

export const Textarea = ({
  register,
  errorMessage,
  border = true,
  sx: customSx,
  ...props
}: TextareaProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  const font = isSmall ? "M_13" : "M_16";
  const fontSize = isSmall ? "16px" : "20px";

  return (
    <Stack>
      <OutlinedInput
        {...register}
        multiline
        rows={4}
        sx={{
          width: ["327px", "327px", "100%"],
          height: "160px",
          p: 0,
          fontSize,
          alignItems: "flex-start",
          "& fieldset": {
            border: border ? "1px solid" : "none",
          },
          "& textarea": {
            px: ["14px", "14px", "24px"],
            pt: "14px",
            resize: "none",
            overflow: "auto",
          },
          ...customSx,
        }}
        {...props}
      />
      {errorMessage && (
        <Typography
          variant={font}
          sx={(theme) => ({ color: theme.palette.SecondaryRed[200] })}
        >
          {errorMessage}
        </Typography>
      )}
    </Stack>
  );
};
