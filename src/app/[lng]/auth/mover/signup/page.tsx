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
import { useSignupForm } from "@/src/hooks/auth/hook";
import { SignUpSchemaType } from "@/src/schemas/auth/signup.schema";
import { useEffect } from "react";
import { useSnackbar } from "@/src/hooks/snackBarHooks";
import { PATH } from "@/src/lib/constants";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  const { openSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const MOVER_INFO = {
    description: t("일반 유저라면?"),
    link: {
      content: t("일반 유저 전용 페이지"),
      href: PATH.userLogin,
    },
  };
  const MOVER_LOGIN_LINK = {
    description: t("이미 무빙 회원이신가요?"),
    link: {
      content: t("로그인"),
      href: PATH.moverLogin,
    },
  };

  const SIGNUP_FIELD = [
    {
      name: "name",
      label: t("이름"),
      type: "text",
      placeholder: t("성함을 입력해 주세요"),
    },
    {
      name: "email",
      label: t("이메일"),
      type: "email",
      placeholder: t("이메일을 입력해주세요"),
    },
    {
      name: "phone",
      label: t("전화번호"),
      type: "tel",
      placeholder: t("숫자만 입력해 주세요"),
    },
    {
      name: "password",
      label: t("비밀번호"),
      type: "password",
      placeholder: t("비밀번호를 입력해 주세요"),
    },
    {
      name: "passwordConfirm",
      label: t("비밀번호 확인"),
      type: "password",
      placeholder: t("비밀번호를 다시 한번 입력해 주세요"),
    },
  ] as const;

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
          <Typography variant={isSmall ? "SB_16" : "SB_20"}>
            {t("로그인")}
          </Typography>
        </Button>
        <TextLink
          description={MOVER_LOGIN_LINK.description}
          link={MOVER_LOGIN_LINK.link}
        />
      </form>
      <SnsLoginSection title={t("SNS 간편 로그인")} isSmall={isSmall} />
    </Stack>
  );
};
export default SignUp;
