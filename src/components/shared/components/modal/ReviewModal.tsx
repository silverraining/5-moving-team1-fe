"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Controller } from "react-hook-form";
import Image from "next/image";
import { ModalStar } from "./components/ModalStar";
import { ChipCategory } from "../chip/ChipCategory";
import { ServiceType } from "@/src/types/common";
import { InfoChip } from "./components/InfoChip";
import { Textarea } from "../text-field/Textarea";
import { useReviewForm } from "@/src/hooks/utill";
import { useTranslation } from "react-i18next";
interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    moverName: string,
    moveDate: string,
    price: number,
    rating: number,
    comment: string,
    moveType: ServiceType[]
  ) => void;
  moverImage: string;
  moverName: string;
  moveDate: string;
  price: number;
  moveType: ServiceType | ServiceType[];
}

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  moverImage,
  moverName,
  moveDate,
  price,
  moveType,
}: ReviewModalProps) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  // 항상 배열로 처리하기 위해 변환
  const moveTypeArray = Array.isArray(moveType) ? moveType : [moveType];

  const { control, handleSubmit, register, isValid, errors, reset } =
    useReviewForm();

  const onFormSubmit = (data: { rating: number; content: string }) => {
    onSubmit(
      moverName,
      moveDate,
      price,
      data.rating,
      data.content,
      moveTypeArray
    );
    reset();
    onClose();
  };

  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: isSmall ? "32px 32px 0 0" : "32px",
            margin: 0,
            position: isSmall ? "fixed" : "initial",
            px: "24px",
            paddingTop: "32px",
            paddingBottom: "40px",
            bottom: isSmall ? 0 : "auto",
            left: isSmall ? 0 : "auto",
            right: isSmall ? 0 : "auto",
            maxHeight: isSmall ? "90vh" : "auto",
            width: isSmall ? "100%" : "auto",
            gap: isSmall ? "26px" : "40px",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 0,
        }}
        variant={isSmall ? "B_18" : "SB_24"}
      >
        {t("리뷰 쓰기")}
        <Image
          onClick={onClose}
          width={isSmall ? 24 : 36}
          height={isSmall ? 24 : 36}
          src={"/Images/header/X.svg"}
          alt="close"
          style={{ cursor: "pointer" }}
        />
      </DialogTitle>

      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          gap: isSmall ? "20px" : "32px",
        }}
      >
        {/* 기사 정보 카드 */}
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          {/* 이사 유형 chip */}
          <Box
            display="flex"
            flexWrap="wrap"
            sx={{
              mb: isSmall ? "14px" : "24px",
              gap: isSmall ? "8px" : "12px",
            }}
          >
            {moveTypeArray.map((type) => (
              <ChipCategory key={type} data={{ chipType: type }} />
            ))}
          </Box>
          {/* 기사님 정보 */}
          <Box
            display="flex"
            gap={isSmall ? "12px" : "24px"}
            sx={{
              width: "100%",
              px: isSmall ? 0 : "18px",
              paddingTop: isSmall ? "10px" : "24px",
              paddingBottom: isSmall ? "20px" : "24px",
              borderRadius: "8px",
              ...(isSmall
                ? { borderBottom: `1px solid ${theme.palette.Line[100]}` }
                : { border: `1px solid ${theme.palette.Line[100]}` }),
            }}
          >
            <Box
              display="flex"
              alignItems="center" // 수직 중앙 정렬
              justifyContent="center" // 수평 중앙 정렬
            >
              <Image
                width={isSmall ? 46 : 96}
                height={isSmall ? 46 : 96}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover", // Images를 꽉 채우기 위해 추천
                }}
                src={moverImage || "/Images/profile/binProfile.svg"}
                alt="기사님 프로필 Images"
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignSelf="center"
              gap={isSmall ? "6px" : "16px"}
            >
              <Box display="flex">
                <Typography
                  variant={isSmall ? "SB_14" : "SB_24"}
                  fontWeight="bold"
                  display="flex"
                >
                  {moverName} 기사님
                </Typography>
              </Box>
              <Box display="flex">
                <Typography
                  component="span"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: isSmall ? "6px" : "12px",
                  }}
                >
                  <InfoChip label={t("이사일")} />{" "}
                  <Typography variant={isSmall ? "M_13" : "M_20"} noWrap>
                    {moveDate}
                  </Typography>
                </Typography>
                {/* === 경계선 추가 === */}
                <Box
                  sx={{
                    width: "1px",
                    backgroundColor: theme.palette.Line[200],
                    mx: isSmall ? "12px" : "16px",
                    alignSelf: "stretch",
                  }}
                />
                <Typography
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: isSmall ? "6px" : "12px",
                  }}
                >
                  <InfoChip label={t("견적가")} />{" "}
                  <Typography variant={isSmall ? "M_13" : "M_20"} noWrap>
                    {price.toLocaleString()}원
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 평점 */}
        <Box
          display="flex"
          flexDirection="column"
          alignSelf="flex-start"
          gap="16px"
        >
          <Typography
            variant={isSmall ? "SB_16" : "SB_20"}
            sx={{ color: theme.palette.Black[300] }}
          >
            {t("평점을 선택해 주세요")}
          </Typography>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <ModalStar
                score={field.value ?? 0}
                isMedium={isSmall}
                editable
                onChange={(val) => field.onChange(val)}
              />
            )}
          />
        </Box>
        {/* === 경계선 추가 === */}
        <Divider
          sx={{
            height: "1px",
            width: "100%",
            backgroundColor: theme.palette.Line[100],
          }}
        />
        {/* 상세 후기 */}
        <Box display="flex" flexDirection="column" gap="16px">
          <Typography
            variant={isSmall ? "SB_16" : "SB_20"}
            sx={{ color: theme.palette.Black[300] }}
          >
            {t("상세 후기를 입력해 주세요")}
          </Typography>
          <Textarea
            register={register("content")}
            placeholder="최소 10자 이상 입력해주세요"
            errorMessage={errors.content?.message}
            sx={{ width: "100%" }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 0 }}>
        <Button
          onClick={handleSubmit(onFormSubmit)}
          disabled={!isValid}
          variant="contained"
          color="primary"
          sx={{
            padding: "16px",
          }}
          fullWidth
        >
          <Typography
            variant={isSmall ? "SB_16" : "SB_20"}
            sx={{ color: theme.palette.White[100] }}
          >
            {t("리뷰 등록")}
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
