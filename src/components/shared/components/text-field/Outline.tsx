import {
  InputProps,
  OutlinedInput,
  Stack,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface OutlineProps extends Omit<InputProps, "fullWidth"> {
  type?: string;
  border?: boolean;
  register: UseFormRegisterReturn;
  errorMessage?: string;
  sx?: SxProps<Theme>;
}

export const Outline = ({
  type,
  register,
  border = true,
  errorMessage = "",
  sx: customSx,
  ...props
}: OutlineProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const icon = showPassword ? "visibility.svg" : "visibility_off.svg";

  return (
    <Stack spacing={1}>
      <OutlinedInput
        {...register}
        type={showPassword ? "text" : type}
        endAdornment={
          isPassword && (
            <Image
              src={`/이미지/input/${icon}`}
              width={24}
              height={24}
              alt="Visibility Icon"
              style={{ cursor: "pointer", display: "block" }}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          )
        }
        fullWidth
        sx={[
          (theme) => ({
            borderRadius: "16px",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "26px",
            borderColor: "red",
            p: 0,
            [theme.breakpoints.up("tablet")]: {
              fontSize: "20px",
            },
            "& fieldset": {
              borderWidth: border ? "1px" : 0,
              borderColor: errorMessage
                ? theme.palette.SecondaryRed[200]
                : theme.palette.Line[200],
            },
            "&.MuiInputBase-root": {
              px: "14px",
              py: "14px",
              height: "54px",
              [theme.breakpoints.up("tablet")]: {
                py: "16px",
                height: "64px",
              },
            },
            //자동 완성시 배경색 변경 방지
            "& input:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0px 1000px white inset !important`,
              boxShadow: `0 0 0px 1000px white inset !important`,
              WebkitTextFillColor: theme.palette.text.primary,
              transition: "background-color 5000s ease-in-out 0s !important",
            },
          }),
          ...(Array.isArray(customSx) ? customSx : customSx ? [customSx] : []),
        ]}
        {...props}
      />
      {errorMessage && (
        <Stack alignItems={"end"}>
          <Typography
            variant="M_13"
            sx={(theme) => ({ color: theme.palette.SecondaryRed[200] })}
          >
            {errorMessage}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
