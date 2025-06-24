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
  USER_INFO,
  LOGIN_FIELD,
  USER_SIGNUP_LINK,
} from "@/src/lib/authConstants";
import { useLoginForm } from "@/src/hooks/auth/hook";
import { LoginSchemaType } from "@/src/schemas/auth/login.schema";

const Login = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));
  const {
    register,
    handleSubmit,
    onSubmit,
    watch,
    formState: { errors },
  } = useLoginForm("CUSTOMER");

  const requiredFields: (keyof LoginSchemaType)[] = ["email", "password"];

  const values = watch();
  const isAllFilled = requiredFields.every(
    (field) => values[field]?.trim() !== ""
  );
  return (
    <Stack
      justifySelf={"center"}
      sx={{
        maxWidth: "640px",
        minWidth: "327px",
        width: "100%",
        height: "100%",
        gap: ["40px", "40px", "72px"],
      }}
    >
      <LogoSection
        description={USER_INFO.description}
        isSmall={isSmall}
        link={USER_INFO.link}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection register={register} errors={errors} fields={LOGIN_FIELD} />
        <Button
          fullWidth
          variant="contained"
          disabled={!isAllFilled}
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
          description={USER_SIGNUP_LINK.description}
          link={USER_SIGNUP_LINK.link}
        />
      </form>
      <SnsLoginSection title="SNS 간편 로그인" isSmall={isSmall} />
    </Stack>
  );
};
export default Login;
