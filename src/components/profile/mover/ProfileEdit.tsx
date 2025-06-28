"use client";

import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUpload } from "../ImageUpload";
import { ServiceSelector } from "../ServiceSelector";
import { RegionSelector } from "../RegionSelector";
import { useSnackbarStore } from "../../../store/snackBarStore";
import { useImageUpload } from "../../../api/upload-image/uploadImage.hooks";
import {
  MoverProfileRegisterFormData,
  moverProfileRegisterSchema,
} from "../../../schemas/profile.schema";
import { useRouter } from "next/navigation";
import { useUpdateMoverProfile } from "@/src/api/mover/hooks";
import { ServiceRegion, ServiceType } from "@/src/types/common";
import {
  convertToServiceTypeObject,
  convertToServiceRegionObject,
} from "../../../utils/util";
import { useTranslation } from "react-i18next";

// TODO: 기사님 프로필 수정 페이지 초기값 설정 (localstorage vs api)
// interface ProfileEditProps {
//   initialData?: {
//     name: string;
//     email: string;
//     phone: string;
//     nickname: string;
//     experience: number;
//     intro: string;
//     description: string;
//     serviceType: ServiceType[];
//     serviceRegion: ServiceRegion[];
//     imageUrl?: string;
//   };
// }

export const ProfileEdit = () => {
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<ServiceRegion[]>([]);
  const [serviceError, setServiceError] = useState<boolean>(false);
  const [regionError, setRegionError] = useState<boolean>(false);

  const router = useRouter();
  const { t } = useTranslation();
  const { openSnackbar } = useSnackbarStore();

  // 기사님 프로필 수정 hook
  const { mutateAsync: updateMoverProfile, isPending: isUpdating } =
    useUpdateMoverProfile();

  // 이미지 업로드 hook
  const { s3ImageUrl, handleFileUpload, previewImage, isUploading } =
    useImageUpload({
      showSnackbar: false,
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<MoverProfileRegisterFormData>({
    resolver: zodResolver(moverProfileRegisterSchema),
    defaultValues: {
      nickname: "",
      experience: 0,
      intro: "",
      description: "",
      serviceType: [],
      serviceRegion: [],
    },
    mode: "onChange",
  });

  const handleServiceToggle = (service: ServiceType) => {
    const newServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setSelectedServices(newServices);
    setValue("serviceType", newServices, { shouldValidate: true });
    setServiceError(newServices.length === 0);
  };

  const handleRegionToggle = (region: ServiceRegion) => {
    const newRegions = selectedRegions.includes(region)
      ? selectedRegions.filter((r) => r !== region)
      : [...selectedRegions, region];
    setSelectedRegions(newRegions);
    setValue("serviceRegion", newRegions, { shouldValidate: true });
    setRegionError(newRegions.length === 0);
  };

  const onSubmit = async (data: MoverProfileRegisterFormData) => {
    try {
      if (selectedServices.length === 0) {
        setServiceError(true);
        openSnackbar(t("제공 서비스를 하나 이상 선택해주세요."), "error");
        return;
      }

      if (selectedRegions.length === 0) {
        setRegionError(true);
        openSnackbar(t("서비스 가능 지역을 하나 이상 선택해주세요."), "error");
        return;
      }

      const profileData = {
        ...data,
        serviceType: convertToServiceTypeObject(selectedServices),
        serviceRegion: convertToServiceRegionObject(selectedRegions),
        imageUrl: s3ImageUrl || null,
      };

      await updateMoverProfile(profileData);

      openSnackbar(t("기사님 프로필이 성공적으로 수정되었습니다."), "success");
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
              flexDirection: ["column", "column", "row"],
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* 왼쪽 열: 프로필 이미지, 경력, 한 줄 소개, 상세 설명 */}
            <Box
              sx={{
                flex: 1,
                minWidth: ["100%", "100%", "400px"],
                maxWidth: ["100%", "100%", "500px"],
              }}
            >
              {/* 별명 */}
              <Box
                sx={{
                  margin: "32px 0",
                  borderBottom: "1px solid",
                  borderColor: (theme) => theme.palette.Line[100],
                }}
              >
                <Box>
                  <Typography
                    variant="SB_20"
                    sx={(theme) => ({
                      color: theme.palette.Black[400],
                    })}
                  >
                    {t("별명")}
                  </Typography>
                  <Typography
                    variant="SB_20"
                    sx={(theme) => ({
                      color: theme.palette.PrimaryBlue[300],
                    })}
                  >
                    *
                  </Typography>
                  <Box sx={{ mt: "16px" }}>
                    <TextField
                      {...register("nickname")}
                      variant="outlined"
                      fullWidth
                      placeholder={t("사이트에 노출될 이름을 입력해 주세요")}
                      error={!!errors.nickname}
                      helperText={errors.nickname?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          height: "56px",
                          fontSize: "16px",
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* 프로필 이미지 */}
              <Box
                sx={{
                  mb: "32px",
                  borderBottom: "1px solid",
                  borderColor: (theme) => theme.palette.Line[100],
                }}
              >
                <ImageUpload
                  onFileSelect={handleFileUpload}
                  previewImage={previewImage}
                  isUploading={isUploading}
                  initialImage={null}
                />
              </Box>

              {/* 경력 */}
              <Box
                sx={{
                  pb: "32px",
                  borderBottom: "1px solid",
                  borderColor: (theme) => theme.palette.Line[100],
                }}
              >
                <Box>
                  <Typography
                    variant="SB_20"
                    sx={(theme) => ({
                      color: theme.palette.Black[400],
                    })}
                  >
                    {t("경력")}
                  </Typography>
                  <Typography
                    variant="SB_20"
                    sx={(theme) => ({
                      color: theme.palette.PrimaryBlue[300],
                    })}
                  >
                    *
                  </Typography>
                  <Box sx={{ mt: "16px" }}>
                    <TextField
                      {...register("experience", { valueAsNumber: true })}
                      type="number"
                      variant="outlined"
                      fullWidth
                      placeholder={t("기사님의 경력을 입력해주세요")}
                      error={!!errors.experience}
                      helperText={errors.experience?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          height: "56px",
                          fontSize: "16px",
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* 한 줄 소개 */}
              <Box
                sx={{
                  pb: "32px",
                  borderBottom: "1px solid",
                  borderColor: (theme) => theme.palette.Line[100],
                }}
              >
                <Box>
                  <Typography
                    variant="SB_20"
                    sx={(theme) => ({
                      color: theme.palette.Black[400],
                    })}
                  >
                    {t("한 줄 소개")}
                  </Typography>
                  <Typography
                    variant="SB_20"
                    sx={(theme) => ({
                      color: theme.palette.PrimaryBlue[300],
                    })}
                  >
                    *
                  </Typography>
                  <Box sx={{ mt: "16px" }}>
                    <TextField
                      {...register("intro")}
                      variant="outlined"
                      fullWidth
                      placeholder={t("한 줄 소개를 입력해 주세요")}
                      error={!!errors.intro}
                      helperText={errors.intro?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          height: "56px",
                          fontSize: "16px",
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* 상세 설명 */}
              <Box sx={{ mb: "32px" }}>
                <Box sx={{ mb: "16px", display: "flex", gap: "4px" }}>
                  <Typography
                    variant="SB_20"
                    sx={(theme) => ({
                      color: theme.palette.Black[400],
                    })}
                  >
                    {t("상세 설명")}
                  </Typography>
                  <Typography
                    variant="SB_20"
                    sx={(theme) => ({
                      color: theme.palette.PrimaryBlue[300],
                    })}
                  >
                    *
                  </Typography>
                </Box>

                <TextField
                  {...register("description")}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  placeholder={t("상세 내용을 입력해 주세요")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      fontSize: "16px",
                    },
                  }}
                />
              </Box>
            </Box>

            {/* 오른쪽 열: 제공 서비스, 서비스 가능 지역 */}
            <Box
              sx={{
                flex: 1,
                minWidth: ["100%", "100%", "400px"],
                maxWidth: ["100%", "100%", "500px"],
              }}
            >
              {/* 제공 서비스 */}
              <Box
                sx={{
                  margin: "32px 0",
                  pb: "32px",
                  borderBottom: "1px solid",
                  borderColor: (theme) => theme.palette.Line[100],
                }}
              >
                <Stack spacing={"8px"} sx={{ mb: "16px" }}>
                  <Box sx={{ display: "flex", gap: "4px" }}>
                    <Typography
                      variant="SB_20"
                      sx={(theme) => ({
                        color: theme.palette.Black[400],
                      })}
                    >
                      {t("제공 서비스")}
                    </Typography>
                    <Typography
                      variant="SB_20"
                      sx={(theme) => ({
                        color: theme.palette.PrimaryBlue[300],
                      })}
                    >
                      *
                    </Typography>
                  </Box>
                  {serviceError && (
                    <Typography
                      variant="M_16"
                      sx={(theme) => ({
                        color: theme.palette.SecondaryRed[200],
                      })}
                    >
                      {t("제공 서비스를 하나 이상 선택해주세요.")}
                    </Typography>
                  )}
                </Stack>
                <ServiceSelector
                  selectedServices={selectedServices}
                  onServiceToggle={handleServiceToggle}
                />
              </Box>

              {/* 서비스 가능 지역 */}
              <Box sx={{ mb: "48px" }}>
                <Stack spacing={"8px"} sx={{ mb: "16px" }}>
                  <Box sx={{ display: "flex", gap: "4px" }}>
                    <Typography
                      variant="SB_20"
                      sx={(theme) => ({
                        color: theme.palette.Black[400],
                      })}
                    >
                      {t("서비스 가능 지역")}
                    </Typography>
                    <Typography
                      variant="SB_20"
                      sx={(theme) => ({
                        color: theme.palette.PrimaryBlue[300],
                      })}
                    >
                      *
                    </Typography>
                  </Box>
                  {regionError && (
                    <Typography
                      variant="M_16"
                      sx={(theme) => ({
                        color: theme.palette.SecondaryRed[200],
                      })}
                    >
                      {t("서비스 가능 지역을 하나 이상 선택해주세요.")}
                    </Typography>
                  )}
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
            disabled={
              !isValid ||
              isUpdating ||
              selectedServices.length === 0 ||
              selectedRegions.length === 0
            }
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
