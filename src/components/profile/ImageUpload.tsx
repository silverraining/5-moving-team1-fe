"use client";

import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

interface ImageUploadProps {
  onFileSelect: (file: File) => void;
  previewImage?: string | null;
  isUploading?: boolean;
  initialImage?: string | null;
}

//TODO: drag & drop 업로드 기능 추가
//TODO: Images 삭제 기능 추가
//TODO: Images 크기 or 확장자 제한 추가
//TODO: 에러 처리

export const ImageUpload = ({
  onFileSelect,
  previewImage,
  isUploading = false,
  initialImage = null,
}: ImageUploadProps) => {
  // 파일 입력을 위한 input 요소의 ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayImage = previewImage || initialImage;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onFileSelect(file);
  };
  const { t } = useTranslation();
  return (
    <Stack spacing={"24px"} margin={"32px 0"}>
      <Typography
        variant="SB_20"
        sx={{
          color: (theme) => theme.palette.Black[400],
          alignSelf: "flex-start",
        }}
      >
        {t("프로필 Images")}
      </Typography>

      <Box
        onClick={handleImageClick}
        sx={{
          width: 160,
          height: 160,
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
          borderRadius: "6px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px dashed",
          borderColor: (theme) => theme.palette.Line[100],
        }}
      >
        {isUploading ? (
          <CircularProgress />
        ) : displayImage ? (
          <Image
            src={displayImage}
            alt="프로필 Images"
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Image
            src="/Images/profile/binProfile.svg"
            alt="프로필 Images"
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </Stack>
  );
};
