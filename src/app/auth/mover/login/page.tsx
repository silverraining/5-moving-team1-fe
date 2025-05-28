"use client";

import { LogoSection } from "@/src/components/auth/LogoSection";
import { TextLink } from "@/src/components/auth/TextLink";
import { loginSchema, LoginSchemaType } from "@/src/schemas/auth/login.schema";
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SnsLoginSection } from "@/src/components/auth/SnsLoginSection";
import { FormSection } from "@/src/components/auth/FromSection";
import {
  MOVER_INFO,
  MOVER_SIGNUP_LINK,
  LOGIN_FIELD,
} from "@/src/lib/authConstants";

const Login = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginSchemaType) => {
    console.log("✅ 제출된 값:", errors);
  };

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
        description={MOVER_INFO.description}
        isSmall={isSmall}
        link={MOVER_INFO.link}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection register={register} errors={errors} fields={LOGIN_FIELD} />
        <Button
          fullWidth
          variant="contained"
          disabled={!isValid}
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
          description={MOVER_SIGNUP_LINK.description}
          link={MOVER_SIGNUP_LINK.link}
        />
      </form>
      <SnsLoginSection title="SNS 간편 로그인" isSmall={isSmall} />
    </Stack>
  );
};
export default Login;
