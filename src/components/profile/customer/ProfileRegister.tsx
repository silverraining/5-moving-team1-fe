"use client";

import { Box, Stack, Typography, Button } from "@mui/material";
import { useState } from "react";
import { ImageUpload } from "../ImageUpload";
import { ServiceSelector } from "../ServiceSelector";
import { RegionSelector } from "../RegionSelector";
import { useSnackbarStore } from "../../../store/snackBarStore";
import { useImageUpload } from "../../../api/upload-image/uploadImage.hooks";

export const ProfileRegister = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const { openSnackbar } = useSnackbarStore();

  // 이미지 업로드 커스텀 훅 사용
  const { s3ImageUrl, handleFileUpload, previewImage, isUploading } =
    useImageUpload({
      showSnackbar: false, // 프로필 등록 완료 시에만 스낵바 표시
    });

  const handleServiceToggle = (service: string) => {
    setSelectedServices(
      (prev) =>
        prev.includes(service)
          ? prev.filter((s) => s !== service) // 이미 선택된 경우 제거
          : [...prev, service] // 선택되지 않은 경우 추가
    );
  };

  const handleRegionToggle = (region: string) => {
    setSelectedRegions(
      (prev) =>
        prev.includes(region)
          ? prev.filter((r) => r !== region) // 이미 선택된 경우 제거
          : [...prev, region] // 선택되지 않은 경우 추가
    );
  };

  /**
   * 프로필 등록 제출 핸들러
   * 1. 선택된 서비스, 지역, S3 이미지 URL을 포함한 프로필 데이터 생성
   * 2. 백엔드 API를 통해 프로필 정보 저장
   */
  const handleSubmit = async () => {
    try {
      // 1. 프로필 데이터 준비
      const profileData = {
        serviceType: selectedServices,
        serviceRegion: selectedRegions,
        imageUrl: s3ImageUrl, // S3에 업로드된 이미지 URL
      };

      // 2. 프로필 등록 API 호출
      //TODO: axios 사용하여 실제 api 연결
      //TODO: 모든 프로필 관련 로직 완성시 훅으로 분리
      const response = await fetch("/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("프로필 등록에 실패했습니다.");
      }

      openSnackbar("프로필이 성공적으로 등록되었습니다.", "success");
    } catch (error) {
      openSnackbar("프로필 등록 중 오류가 발생했습니다.", "error");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "640px",
        mx: "auto",
        p: 3,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
            프로필 등록
          </Typography>
          <Typography
            variant="R_20"
            sx={{
              color: (theme) => theme.palette.Black[200],
            }}
          >
            추가 정보를 입력하여 회원가입을 완료해주세요.
          </Typography>
        </Stack>

        {/* 프로필 이미지 */}
        <Box
          sx={{
            margin: "32px 0",
            borderBottom: "1px solid",
            borderColor: (theme) => theme.palette.Line[100],
          }}
        >
          <ImageUpload
            onFileSelect={handleFileUpload}
            previewImage={previewImage}
            isUploading={isUploading}
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

      {/* 시작하기 버튼 */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={selectedServices.length === 0 || selectedRegions.length === 0}
        sx={{
          height: "56px",
          borderRadius: "16px",
          fontSize: "18px",
          fontWeight: 600,
          mt: 4,
          mb: 2,
          backgroundColor: (theme) => theme.palette.PrimaryBlue[300],
          "&:disabled": {
            backgroundColor: (theme) => theme.palette.grey[300],
            color: (theme) => theme.palette.White[100],
          },
        }}
      >
        시작하기
      </Button>
    </Box>
  );
};
