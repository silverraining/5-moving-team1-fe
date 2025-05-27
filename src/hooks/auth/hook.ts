import { useLogin, useSignup } from "@/src/api/auth/hooks";
import { Role } from "@/src/types/auth";
import { useSnackbar } from "../snackBarHooks";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchemaType } from "@/src/schema/auth/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  signUpSchema,
  SignUpSchemaType,
} from "@/src/schema/auth/signup.schema";
import { PATH } from "@/src/lib/constants";

export const useLoginForm = (userType: Role) => {
  const { mutate } = useLogin();
  const { openSnackbar } = useSnackbar();
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    mutate(
      { ...data, userType }, // 외부에서 받은 고정값 삽입
      {
        onSuccess: () => {
          openSnackbar("로그인 성공", "success", 1000, "standard");
          router.push("/");
        },
        onError: (error) => {
          openSnackbar(
            error instanceof Error ? error.message : "로그인 실패",
            "error",
            2000
          );
        },
      }
    );
  };

  return {
    ...form,
    onSubmit,
  };
};

export const useSignupForm = (userType: Role) => {
  const { mutate } = useSignup();
  const { openSnackbar } = useSnackbar();
  const router = useRouter();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpSchemaType) => {
    const path = userType === "CUSTOMER" ? PATH.userlogin : PATH.moverlogin;
    mutate(
      { ...data, userType }, // 외부에서 받은 고정값 삽입
      {
        onSuccess: () => {
          openSnackbar("회원가입 성공", "success", 1000, "standard");
          router.push(path);
        },
        onError: (error) => {
          openSnackbar(
            error instanceof Error ? error.message : "회원가입 실패",
            "error",
            2000
          );
        },
      }
    );
  };

  return {
    ...form,
    onSubmit,
  };
};
