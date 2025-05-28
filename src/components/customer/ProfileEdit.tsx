"use client";

import { Box, Stack, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUpload } from "./ImageUpload";
import { ServiceSelector } from "./ServiceSelector";
import { RegionSelector } from "./RegionSelector";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { PasswordChangeSection } from "./PasswordChangeSection";
import { useSnackbarStore } from "../../store/snackBarStore";
import { useImageUpload } from "../../api/upload-image/uploadImage.hooks";
import {
  ProfileEditFormData,
  profileEditSchema,
} from "../../schemas/profile.schema";

interface ProfileEditProps {
  // 초기 프로필 데이터
  initialData?: {
    name: string;
    email: string;
    phone: string;
    serviceType: string[];
    serviceRegion: string[];
    imageUrl?: string;
  };
}

export const ProfileEdit = ({ initialData }: ProfileEditProps) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialData?.serviceType || []
  );
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    initialData?.serviceRegion || []
  );

  const openSnackbar = useSnackbarStore((state) => state.openSnackbar);

  // 이미지 업로드 커스텀 훅 사용
  const { s3ImageUrl, handleFileUpload, previewImage, isUploading } =
    useImageUpload({
      showSnackbar: false,
    });

  // React Hook Form + Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    control,
  } = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      serviceType: initialData?.serviceType || [],
      serviceRegion: initialData?.serviceRegion || [],
      imageUrl: initialData?.imageUrl,
    },
    mode: "onChange",
  });

  const handleServiceToggle = (service: string) => {
    const newServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setSelectedServices(newServices);
    setValue("serviceType", newServices);
  };

  const handleRegionToggle = (region: string) => {
    const newRegions = selectedRegions.includes(region)
      ? selectedRegions.filter((r) => r !== region)
      : [...selectedRegions, region];
    setSelectedRegions(newRegions);
    setValue("serviceRegion", newRegions);
  };

  const onSubmit = async (data: ProfileEditFormData) => {
    try {
      // 비밀번호 변경 시 추가 검증
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        openSnackbar("새 비밀번호가 일치하지 않습니다.", "error");
        return;
      }

      const profileData = {
        ...data,
        imageUrl: s3ImageUrl || data.imageUrl,
      };

      //TODO: API 연결
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("프로필 수정에 실패했습니다.");
      }

      openSnackbar("프로필이 성공적으로 수정되었습니다.", "success");
    } catch (error) {
      console.error("프로필 수정 중 오류:", error);
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
              프로필 수정
            </Typography>
          </Stack>

          {/* 메인 컨텐츠 2열 레이아웃 */}
          <Box
            sx={{
              display: "flex",
              gap: "80px",
              mt: "32px",
              flexDirection: ["column", "column", "row"], // 모바일에서는 세로 배치
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* 왼쪽 열: 개인정보 및 비밀번호 */}
            <Box
              sx={{
                flex: 1,
                minWidth: ["100%", "100%", "400px"],
                maxWidth: ["100%", "100%", "500px"],
              }}
            >
              {/* 개인정보 입력 */}
              <PersonalInfoSection
                register={register}
                control={control}
                errors={errors}
                initialData={initialData}
              />

              {/* 비밀번호 변경 */}
              <PasswordChangeSection register={register} errors={errors} />
            </Box>

            {/* 오른쪽 열: 프로필 이미지, 서비스, 지역 */}
            <Box
              sx={{
                flex: 1,
                minWidth: ["100%", "100%", "400px"],
                maxWidth: ["100%", "100%", "500px"],
              }}
            >
              {/* 프로필 이미지 */}
              <Box
                sx={{
                  mb: "32px",
                  pb: "32px",
                  borderBottom: "1px solid",
                  borderColor: (theme) => theme.palette.Line[100],
                }}
              >
                <ImageUpload
                  onFileSelect={handleFileUpload}
                  previewImage={previewImage}
                  isUploading={isUploading}
                  initialImage={initialData?.imageUrl}
                />
              </Box>

              {/* 이용 서비스 */}
              <Box
                sx={{
                  mb: "32px",
                  pb: "32px",
                  borderBottom: "1px solid",
                  borderColor: (theme) => theme.palette.Line[100],
                }}
              >
                <Stack
                  spacing={"8px"}
                  sx={{
                    mb: "32px",
                  }}
                >
                  <Typography
                    variant="SB_20"
                    sx={{
                      color: (theme) => theme.palette.Black[400],
                    }}
                  >
                    이용 서비스
                  </Typography>
                  <Typography
                    variant="R_16"
                    sx={{
                      color: (theme) => theme.palette.Grayscale[400],
                    }}
                  >
                    *이용 서비스는 중복 선택 가능하며, 언제든 수정 가능해요!
                  </Typography>
                </Stack>
                <ServiceSelector
                  selectedServices={selectedServices}
                  onServiceToggle={handleServiceToggle}
                />
              </Box>

              {/* 내가 사는 지역 */}
              <Box sx={{ mb: "32px" }}>
                <Stack
                  spacing={"8px"}
                  sx={{
                    mb: "32px",
                  }}
                >
                  <Typography
                    variant="SB_20"
                    sx={{
                      color: (theme) => theme.palette.Black[400],
                    }}
                  >
                    내가 사는 지역
                  </Typography>
                  <Typography
                    variant="R_16"
                    sx={{
                      color: (theme) => theme.palette.Grayscale[400],
                    }}
                  >
                    *내가 사는 지역은 언제든 수정 가능해요!
                  </Typography>
                </Stack>
                <RegionSelector
                  selectedRegions={selectedRegions}
                  onRegionToggle={handleRegionToggle}
                />
              </Box>
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
