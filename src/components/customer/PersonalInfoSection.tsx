"use client";

import { Box, Stack, Typography } from "@mui/material";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import TextField from "../shared/components/text-field";
import { ProfileEditFormData } from "../../schemas/profile.schema";

interface PersonalInfoSectionProps {
  register: UseFormRegister<ProfileEditFormData>;
  errors: FieldErrors<ProfileEditFormData>;
  initialData?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export const PersonalInfoSection = ({
  register,
  errors,
  initialData,
}: PersonalInfoSectionProps) => {
  return (
    <Box>
      <Stack spacing={"32px"}>
        {/* 이름 */}
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
              이름
            </Typography>
          </Box>
          <TextField.Input
            type="text"
            placeholder="이름을 입력해주세요."
            register={register("name")}
            errorMessage={errors.name?.message}
          />
        </Box>

        {/* 이메일 */}
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
              이메일
            </Typography>
          </Box>
          <TextField.Input
            type="email"
            value={initialData?.email}
            disabled
            register={register("email")}
            errorMessage={errors.email?.message}
          />
        </Box>

        {/* 전화번호 */}
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
              전화번호
            </Typography>
          </Box>
          <TextField.Input
            type="tel"
            placeholder="010-1234-5678"
            register={register("phone")}
            errorMessage={errors.phone?.message}
          />
        </Box>
      </Stack>
    </Box>
  );
};
