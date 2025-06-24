import { useLogin, useSignup } from "@/src/api/auth/hooks";
import { Role } from "@/src/types/auth";
import { useSnackbar } from "../snackBarHooks";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { PATH } from "@/src/lib/constants";
import { loginSchema, LoginSchemaType } from "@/src/schemas/auth/login.schema";
import {
  signUpSchema,
  SignUpSchemaType,
} from "@/src/schemas/auth/signup.schema";
import { useNotificationAll } from "@/src/api/notification/hooks";
import { useNotificationStore } from "@/src/store/notification";
import { useEffect, useState } from "react";
import { formatPhoneNumber } from "@/src/utils/formatPhonNumber";

export const useLoginForm = (role: Role) => {
  const { mutate } = useLogin();
  const { openSnackbar } = useSnackbar();
  const router = useRouter();
  const { setNotifications } = useNotificationStore();
  const [fetchNotifications, setFetchNotifications] = useState(false);
  const { data: notificationData } = useNotificationAll(fetchNotifications);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    mutate(
      { ...data, role }, // 외부에서 받은 고정값 삽입
      {
        onSuccess: () => {
          openSnackbar("로그인 성공", "success", 500, "standard");
          setFetchNotifications(true);
          router.replace("/");
          setNotifications(notificationData ?? []);
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

export const useSignupForm = (role: Role) => {
  const { mutate } = useSignup();
  const { openSnackbar } = useSnackbar();
  const router = useRouter();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });
  const { watch, setValue } = form;
  const phoneValue = watch("phone");

  useEffect(() => {
    if (phoneValue) {
      const formatted = formatPhoneNumber(phoneValue);
      if (formatted !== phoneValue) {
        setValue("phone", formatted, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    }
  }, [phoneValue, setValue]);

  const onSubmit = (data: SignUpSchemaType) => {
    const phoneRaw = data.phone ? data.phone.replace(/-/g, "") : undefined;
    const submitData = { ...data, phone: phoneRaw, role };
    const path = role === "CUSTOMER" ? PATH.userLogin : PATH.moverLogin;

    mutate(
      { ...submitData }, // 외부에서 받은 고정값 삽입
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
