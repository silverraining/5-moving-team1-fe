"use client";

import { Box, Stack, Typography, Button } from "@mui/material";
import { PersonalInfoSection } from "../PersonalInfoSection";
import { PasswordChangeSection } from "../PasswordChangeSection";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbarStore } from "../../../store/snackBarStore";
import {
  ProfileEditFormData,
  profileEditSchema,
} from "../../../schemas/profile.schema";
import { useRouter } from "next/navigation";

interface GeneralEditProps {
  initialData?: {
    name: string;
    email: string;
    phone: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };
}

export const GeneralEdit = ({ initialData }: GeneralEditProps) => {
  const router = useRouter();
  const { openSnackbar } = useSnackbarStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      phone: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileEditFormData) => {
    try {
      // TODO: 기존 비밀번호 확인 로직
      // TODO: API 호출 구현
      openSnackbar("프로필이 성공적으로 수정되었습니다.", "success");
      router.push("/mover/profile");
    } catch (error) {
      openSnackbar("프로필 수정 중 오류가 발생했습니다.", "error");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "1400px",
        mx: "auto",
        p: 3,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {/* 헤더 */}
          <Stack
            sx={{
              borderBottom: "1px solid",
              borderColor: (theme) => theme.palette.Line[100],
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              pb: "32px",
            }}
          >
            <Typography
              variant="SB_32"
              sx={(theme) => ({
                color: theme.palette.Black[400],
              })}
            >
              기본정보 수정
            </Typography>
          </Stack>

          {/* 메인 컨텐츠 2열 레이아웃 */}
          <Box
            sx={{
              display: "flex",
              gap: "80px",
              mt: "32px",
              flexDirection: ["column", "column", "row"],
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* 왼쪽 열: 개인정보 */}
            <Box
              sx={{
                flex: 1,
                minWidth: ["100%", "100%", "400px"],
                maxWidth: ["100%", "100%", "500px"],
              }}
            >
              <PersonalInfoSection
                register={register}
                control={control}
                errors={errors}
                initialData={initialData}
              />
            </Box>

            {/* 오른쪽 열: 비밀번호 */}
            <Box
              sx={{
                flex: 1,
                minWidth: ["100%", "100%", "400px"],
                maxWidth: ["100%", "100%", "500px"],
              }}
            >
              <PasswordChangeSection register={register} errors={errors} />
            </Box>
          </Box>
        </Box>

        {/* 버튼 그룹 */}
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            mt: 4,
            mb: 2,
          }}
        >
          {/* 취소 버튼 */}
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
            }}
          >
            취소
          </Button>

          {/* 수정하기 버튼 */}
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
            }}
          >
            수정하기
          </Button>
        </Box>
      </form>
    </Box>
  );
};
