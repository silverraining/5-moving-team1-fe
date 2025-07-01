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
import { useTranslation } from "react-i18next";
export const useLoginForm = (role: Role) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { mutate, isPending } = useLogin();
  const { openSnackbar } = useSnackbar();
  const { setNotifications, setMarkAsRead } = useNotificationStore();
  const [fetchNotifications, setFetchNotifications] = useState(false);
  const { data: notificationData } = useNotificationAll(fetchNotifications);
  const [isNavigating, setIsNavigating] = useState(false);
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (fetchNotifications && notificationData) {
      setNotifications(notificationData);
      setMarkAsRead(notificationData.length !== 0);
    }
  }, [fetchNotifications, notificationData, setNotifications]);

  const onSubmit = (data: LoginSchemaType) => {
    mutate(
      { ...data, role }, // 외부에서 받은 고정값삽입
      {
        onSuccess: () => {
          openSnackbar(t("로그인 성공"), "success", 500, "standard");
          setFetchNotifications(true);
          setIsNavigating(true);
          router.replace("/");
        },
        onError: (error) => {
          openSnackbar(
            error instanceof Error ? error.message : t("로그인 실패"),
            "error",
            500
          );
        },
      }
    );
  };

  return {
    ...form,
    isNavigating,
    isPending,
    onSubmit,
  };
};

export const useSignupForm = (role: Role) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { mutate, isPending } = useSignup();
  const { openSnackbar } = useSnackbar();
  const [isNavigating, setIsNavigating] = useState(false);

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
          openSnackbar(t("회원가입 성공"), "success", 500, "standard");
          setIsNavigating(true);
          router.push(path);
        },
        onError: (error) => {
          openSnackbar(
            error instanceof Error ? error.message : t("회원가입 실패"),
            "error",
            500
          );
        },
      }
    );
  };

  return {
    ...form,
    isNavigating,
    isPending,
    onSubmit,
  };
};
