"use client";

import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRef } from "react";

interface ProfileImageUploadProps {
  profileImage: string | null;
  onImageChange: (image: string | null) => void;
}

export const ProfileImageUpload = ({
  profileImage,
  onImageChange,
}: ProfileImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Stack spacing={"24px"} margin={"32px 0"}>
      <Typography
        variant="SB_20"
        sx={{
          color: (theme) => theme.palette.Black[400],
          alignSelf: "flex-start",
        }}
      >
        프로필 이미지
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
        }}
      >
        {profileImage ? (
          <Image
            src={profileImage}
            alt="프로필 이미지"
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Image
            src="/images/profile/binProfile.svg"
            alt="프로필 이미지"
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
