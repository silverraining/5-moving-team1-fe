"use client";

import { Box, Stack, Typography, Button } from "@mui/material";
import { PersonalInfoSection } from "../PersonalInfoSection";
import { PasswordChangeSection } from "../PasswordChangeSection";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbarStore } from "../../../store/snackBarStore";
import {
  GeneralEditFormData,
  generalEditSchema,
} from "../../../schemas/profile.schema";
import { useRouter } from "next/navigation";
import { useUpdateGeneralMoverProfile } from "../../../api/mover/hooks";
import { useTranslation } from "react-i18next";

// localStorage에서 사용자 정보 가져오는 함수
const getUserDataFromLocalStorage = () => {
  let userData = {
    name: "",
    email: "",
    phone: "",
  };

  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const parsedData = JSON.parse(authStorage);
      const user = parsedData?.state?.user;
      if (user) {
        userData = {
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
        };
      }
    }
  } catch (error) {
    console.error(
      "localStorage에서 사용자 정보를 가져오는 중 오류 발생:",
      error
    );
  } finally {
    return userData;
  }
};

export const GeneralEdit = () => {
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();
  const { mutateAsync: updateProfile } = useUpdateGeneralMoverProfile();
  const { t } = useTranslation();

  // localStorage에서 사용자 정보 가져오기
  const userData = getUserDataFromLocalStorage();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<GeneralEditFormData>({
    resolver: zodResolver(generalEditSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      currentPassword: undefined,
      newPassword: undefined,
      confirmPassword: undefined,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: GeneralEditFormData) => {
    try {
      await updateProfile({
        name: data.name,
        phone: data.phone,
        password: data.currentPassword,
        newPassword: data.newPassword,
      });
      openSnackbar(t("프로필이 성공적으로 수정되었습니다."), "success");
      router.push("/"); // TODO: 수정 후 페이지 이동
    } catch (error) {
      openSnackbar(t("프로필 수정 중 오류가 발생했습니다."), "error");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "1400px",
        mx: "auto",
        p: 3,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="SB_32"
        sx={{
          color: (theme) => theme.palette.Black[400],
        }}
      >
        {t("기본정보 수정")}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: ["1fr", "1fr", "repeat(2, minmax(0, 1fr))"],
            columnGap: "80px",
            rowGap: "24px",
            maxWidth: "1200px",
            mt: "32px",
            mx: "auto",
          }}
        >
          {/* 왼쪽 섹션 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            <PersonalInfoSection
              register={register}
              control={control}
              errors={errors}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            <PasswordChangeSection register={register} errors={errors} />
          </Box>

          {/* 버튼 그룹 */}
          <Box
            sx={{
              gridColumn: "1/-1",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              mt: 4,
              justifyContent: { md: "space-between" },
            }}
          >
            <Button
              variant="outlined"
              fullWidth
              onClick={() => window.history.back()}
              sx={{
                height: "56px",
                borderRadius: "16px",
                fontSize: "18px",
                fontWeight: 600,
                borderColor: (theme) => theme.palette.PrimaryBlue[300],
                color: (theme) => theme.palette.PrimaryBlue[300],
                "&:hover": {
                  borderColor: (theme) => theme.palette.PrimaryBlue[400],
                  backgroundColor: "transparent",
                },
                order: { xs: 2, md: 1 },
                maxWidth: { md: "calc(50% - 8px)" },
              }}
            >
              {t("취소")}
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isValid}
              sx={{
                height: "56px",
                borderRadius: "16px",
                fontSize: "18px",
                fontWeight: 600,
                backgroundColor: (theme) => theme.palette.PrimaryBlue[300],
                "&:disabled": {
                  backgroundColor: (theme) => theme.palette.grey[300],
                  color: (theme) => theme.palette.White[100],
                },
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.PrimaryBlue[400],
                },
                order: { xs: 1, md: 2 },
                maxWidth: { md: "calc(50% - 8px)" },
              }}
            >
              {t("수정하기")}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};
