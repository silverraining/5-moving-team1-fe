"use client";

import { Box, Stack, Typography, TextField, Theme } from "@mui/material";
import {
  UseFormRegister,
  FieldErrors,
  Controller,
  Control,
} from "react-hook-form";
import {
  ProfileEditFormData,
  GeneralEditFormData,
} from "../../schemas/profile.schema";
import {
  formatPhoneNumber,
  removePhoneNumberFormat,
} from "../../utils/formatPhonNumber";

interface PersonalInfoSectionProps {
  register: UseFormRegister<ProfileEditFormData | GeneralEditFormData>;
  control: Control<ProfileEditFormData | GeneralEditFormData>;
  errors: FieldErrors<ProfileEditFormData | GeneralEditFormData>;
  initialData?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: (theme: Theme) => theme.palette.White[100],
  },
};

export const PersonalInfoSection = ({
  register,
  control,
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
          <TextField
            type="text"
            placeholder="이름을 입력해주세요."
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            sx={textFieldStyle}
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
          <TextField
            type="email"
            value={initialData?.email}
            disabled
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            sx={textFieldStyle}
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

          {/* Controller: 전화번호 입력값 실시간 변환을 위해 사용 */}
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => {
              const formattedValue = formatPhoneNumber(value || "");
              return (
                <TextField
                  type="tel"
                  placeholder="010-1234-5678"
                  value={formattedValue}
                  onChange={(e) => {
                    // 1. 입력값 하이픈 포맷팅
                    const formatted = formatPhoneNumber(e.target.value);
                    // 2. 입력창에 포맷팅된 값 표시
                    e.target.value = formatted;
                    // 3. 폼 데이터에는 하이픈 제거한 값 저장 (01012345678)
                    onChange(removePhoneNumberFormat(formatted));
                  }}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  fullWidth
                  sx={textFieldStyle}
                />
              );
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};
