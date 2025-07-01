"use client";

import {
  Box,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUpload } from "../ImageUpload";
import { ServiceSelector } from "../ServiceSelector";
import { RegionSelector } from "../RegionSelector";
import { PersonalInfoSection } from "../PersonalInfoSection";
import { PasswordChangeSection } from "../PasswordChangeSection";
import { useSnackbarStore } from "../../../store/snackBarStore";
import { useImageUpload } from "../../../api/upload-image/uploadImage.hooks";
import {
  useUpdateCustomerProfile,
  useGetCustomerProfile,
} from "../../../api/customer/hook";
import { ServiceType, ServiceRegion } from "@/src/types/common";
import { useRouter } from "next/navigation";
import {
  ProfileEditFormData,
  profileEditSchema,
} from "../../../schemas/profile.schema";
import {
  convertToServiceTypeArray,
  convertToServiceTypeObject,
  convertToServiceRegionArray,
  convertToServiceRegionObject,
} from "../../../utils/util";
import { useTranslation } from "react-i18next";
export const ProfileEdit = () => {
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<ServiceRegion[]>([]);

  const router = useRouter();
  const { t } = useTranslation();
  const { openSnackbar } = useSnackbarStore();

  // 일반 유저 프로필 조회 hook
  const { data: customerProfileData, isLoading } = useGetCustomerProfile();
  // 일반 유저 프로필 수정 hook
  const { mutateAsync: updateCustomerProfile, isPending } =
    useUpdateCustomerProfile();
  // Images 업로드 hook
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
    reset,
  } = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    mode: "onChange",
  });

  // 프로필 데이터로 폼 초기화
  useEffect(() => {
    if (customerProfileData) {
      const serviceTypeArray = convertToServiceTypeArray(
        customerProfileData.serviceType
      );
      const serviceRegionArray = convertToServiceRegionArray(
        customerProfileData.serviceRegion
      );

      setSelectedServices(serviceTypeArray);
      setSelectedRegions(serviceRegionArray);

      reset({
        name: customerProfileData.name,
        email: customerProfileData.email,
        phone: customerProfileData.phone,
        serviceType: serviceTypeArray,
        serviceRegion: serviceRegionArray,
        imageUrl: customerProfileData.imageUrl,
      });
    }
  }, [customerProfileData, reset]);

  const handleServiceToggle = (service: ServiceType) => {
    const newServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setSelectedServices(newServices);
    setValue("serviceType", newServices);
  };

  const handleRegionToggle = (region: ServiceRegion) => {
    const newRegions = selectedRegions.includes(region)
      ? selectedRegions.filter((r) => r !== region)
      : [...selectedRegions, region];
    setSelectedRegions(newRegions);
    setValue("serviceRegion", newRegions);
  };

  const onSubmit = async (data: ProfileEditFormData) => {
    try {
      if (isUploading) {
        openSnackbar(
          t("Images 업로드가 완료될 때까지 기다려주세요."),
          "warning"
        );
        return;
      }

      // 비밀번호 변경 시 추가 검증
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        openSnackbar(t("새 비밀번호가 일치하지 않습니다."), "error");
        return;
      }

      await updateCustomerProfile({
        name: data.name,
        phone: data.phone || null,
        password: data.currentPassword,
        newPassword: data.newPassword,
        imageUrl: s3ImageUrl || customerProfileData?.imageUrl || null,
        serviceType: convertToServiceTypeObject(selectedServices),
        serviceRegion: convertToServiceRegionObject(selectedRegions),
      });

      openSnackbar(t("프로필이 성공적으로 수정되었습니다."), "success");
      router.push("/");
    } catch (error) {
      console.error(t("프로필 수정 중 오류:"), error);
      openSnackbar(
        error instanceof Error
          ? error.message
          : t("프로필 수정 중 오류가 발생했습니다."),
        "error"
      );
    }
  };

  // 로딩 중일 때
  if (isLoading) {
    return (
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          p: 3,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          {t("프로필 정보를 불러오는 중...")}
        </Typography>
      </Box>
    );
  }

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
              {t("프로필 수정")}
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
                register={register as any}
                control={control as any}
                errors={errors as any}
                initialData={customerProfileData}
              />

              {/* 비밀번호 변경 */}
              <PasswordChangeSection
                register={register as any}
                errors={errors as any}
              />
            </Box>

            {/* 오른쪽 열: 프로필 Images, 서비스, 지역 */}
            <Box
              sx={{
                flex: 1,
                minWidth: ["100%", "100%", "400px"],
                maxWidth: ["100%", "100%", "500px"],
              }}
            >
              {/* 프로필 Images */}
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
                  initialImage={customerProfileData?.imageUrl}
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
                    {t("이용 서비스")}
                  </Typography>
                  <Typography
                    variant="R_16"
                    sx={{
                      color: (theme) => theme.palette.Grayscale[400],
                    }}
                  >
                    {t(
                      "*이용 서비스는 중복 선택 가능하며, 언제든 수정 가능해요!"
                    )}
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
                    {t("내가 사는 지역")}
                  </Typography>
                  <Typography
                    variant="R_16"
                    sx={{
                      color: (theme) => theme.palette.Grayscale[400],
                    }}
                  >
                    {t("*내가 사는 지역은 언제든 수정 가능해요!")}
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
            {t("취소")}
          </Button>

          {/* 수정하기 버튼 */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            loading={isPending}
            loadingPosition="start"
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
            {t("수정하기")}
          </Button>
        </Box>
      </form>
    </Box>
  );
};
