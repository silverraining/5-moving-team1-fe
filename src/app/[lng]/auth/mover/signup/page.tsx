"use client";

import { LogoSection } from "@/src/components/auth/LogoSection";
import { TextLink } from "@/src/components/auth/TextLink";
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SnsLoginSection } from "@/src/components/auth/SnsLoginSection";
import { FormSection } from "@/src/components/auth/FromSection";
import {
  MOVER_INFO,
  MOVER_LOGIN_LINK,
  SIGNUP_FIELD,
} from "@/src/lib/authConstants";
import { useSignupForm } from "@/src/hooks/auth/hook";
import { SignUpSchemaType } from "@/src/schemas/auth/signup.schema";
import { useEffect } from "react";
import { useSnackbar } from "@/src/hooks/snackBarHooks";

const SignUp = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  const { openSnackbar } = useSnackbar();

  const {
    register,
    onSubmit,
    handleSubmit,
    watch,
    isPending,
    isNavigating,
    formState: { errors },
  } = useSignupForm("MOVER");
  const requiredFields: (keyof SignUpSchemaType)[] = [
    "name",
    "email",
    "password",
    "passwordConfirm",
  ];

  const values = watch();
  const isAllFilled = requiredFields.every(
    (field) => values[field]?.trim() !== ""
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = urlParams.get("error");
    if (errorMessage) {
      let message = errorMessage;
      try {
        const parsed = JSON.parse(decodeURIComponent(errorMessage));
        if (parsed.message) {
          message = parsed.message;
        }
      } catch {
        message = decodeURIComponent(errorMessage);
      }
      openSnackbar(message, "error");
    }
  }, [openSnackbar]);

  return (
    <Stack
      justifySelf={"center"}
      sx={{
        maxWidth: "640px",
        minWidth: "327px",
        width: "100%",
        height: "100%",
        gap: ["40px", "40px", "72px"],
        pt: ["56px", "56px", "72px"],
        pb: ["110px", "110px", "96px"],
      }}
    >
      <LogoSection
        description={MOVER_INFO.description}
        isSmall={isSmall}
        link={MOVER_INFO.link}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection
          register={register}
          errors={errors}
          fields={SIGNUP_FIELD}
        />
        <Button
          fullWidth
          loading={isPending || isNavigating}
          loadingPosition="start"
          variant="contained"
          disabled={!isAllFilled ? !isAllFilled : false}
          sx={{
            maxHeight: "64px",
            minHeight: "54px",
            mt: ["32px", "32px", "56px"],
            mb: ["16px", "16px", "24px"],
          }}
          type="submit"
        >
          <Typography variant={isSmall ? "SB_16" : "SB_20"}>로그인</Typography>
        </Button>
        <TextLink
          description={MOVER_LOGIN_LINK.description}
          link={MOVER_LOGIN_LINK.link}
        />
      </form>
      <SnsLoginSection title="SNS 간편 로그인" isSmall={isSmall} />
    </Stack>
  );
};
export default SignUp;
