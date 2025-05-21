import { COLORS } from "@/src/public/theme/colors";
import { InputProps, OutlinedInput, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface OutlineProps extends Omit<InputProps, "fullWidth"> {
  type?: string;
  register: UseFormRegisterReturn;
  errorMessage?: string;
}

export const Outline = ({
  type,
  register,
  errorMessage = "",
  ...props
}: OutlineProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const icon = !showPassword ? "visibility.svg" : "visibility_off.svg";

  return (
    <Stack spacing={1}>
      <OutlinedInput
        {...register}
        type={showPassword ? "text" : type}
        endAdornment={
          isPassword && (
            <Image
              src={`./images/input/${icon}`}
              width={24}
              height={24}
              alt="Visibility Icon"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          )
        }
        fullWidth
        sx={{
          borderRadius: "16px",
          fontSize: ["16px", "16px", "20px"],
          fontWeight: 400,
          lineHeight: "26px",
          p: 0,
          "&.MuiInputBase-root": {
            border: "1px solid #E6E6E6",
            px: "14px",
            py: ["14px", "14px", "16px"],
            height: ["54px", "54px", "64px"],
          },
        }}
        {...props}
      />
      {errorMessage && (
        <Typography variant="M_13" color={COLORS.SecondaryRed[200]}>
          {errorMessage}
        </Typography>
      )}
    </Stack>
  );
};
