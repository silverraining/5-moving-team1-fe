"use client";

import { Box, Stack, Typography } from "@mui/material";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import TextField from "../shared/components/text-field";
import {
  ProfileEditFormData,
  GeneralEditFormData,
} from "../../schemas/profile.schema";

interface PasswordChangeSectionProps {
  register: UseFormRegister<ProfileEditFormData | GeneralEditFormData>;
  errors: FieldErrors<ProfileEditFormData | GeneralEditFormData>;
}

export const PasswordChangeSection = ({
  register,
  errors,
}: PasswordChangeSectionProps) => {
  return (
    <Box>
      <Stack spacing={"32px"}>
        {/* 현재 비밀번호 */}
        <Box
          sx={{
            pb: "32px",
            borderBottom: "1px solid",
            borderColor: (theme) => theme.palette.Line[100],
          }}
        >
          <Box sx={{ mb: "16px" }}>
            <Typography
              variant="SB_20"
              sx={{
                color: (theme) => theme.palette.Black[400],
              }}
            >
              현재 비밀번호
            </Typography>
          </Box>
          <TextField.Input
            type="password"
            placeholder="현재 비밀번호를 입력하세요"
            register={register("currentPassword")}
            errorMessage={errors.currentPassword?.message}
          />
        </Box>

        {/* 새 비밀번호 */}
        <Box
          sx={{
            pb: "32px",
            borderBottom: "1px solid",
            borderColor: (theme) => theme.palette.Line[100],
          }}
        >
          <Box sx={{ mb: "16px" }}>
            <Typography
              variant="SB_20"
              sx={{
                color: (theme) => theme.palette.Black[400],
              }}
            >
              새 비밀번호
            </Typography>
          </Box>
          <TextField.Input
            type="password"
            placeholder="새 비밀번호를 입력하세요"
            register={register("newPassword")}
            errorMessage={errors.newPassword?.message}
          />
        </Box>

        {/* 새 비밀번호 확인 */}
        <Box
          sx={{
            pb: "32px",
            borderBottom: "1px solid",
            borderColor: (theme) => theme.palette.Line[100],
          }}
        >
          <Box sx={{ mb: "16px" }}>
            <Typography
              variant="SB_20"
              sx={{
                color: (theme) => theme.palette.Black[500],
              }}
            >
              새 비밀번호 확인
            </Typography>
          </Box>
          <TextField.Input
            type="password"
            placeholder="새 비밀번호를 다시 입력하세요"
            register={register("confirmPassword")}
            errorMessage={errors.confirmPassword?.message}
          />
        </Box>
      </Stack>
    </Box>
  );
};
