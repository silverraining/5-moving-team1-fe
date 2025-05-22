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
import { ChipCategory, type ChipProps } from "../chip/ChipCategory";
import { InfoChip } from "./components/InfoChip";
import { Textarea } from "../text-field/Textarea";
import { useReviewForm } from "@/src/hooks/utill";
import { COLORS } from "@/public/theme/colors";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    moverName: string,
    moveDate: string,
    price: number,
    rating: number,
    comment: string,
    moveType: string[]
  ) => void;
  moverName: string;
  moveDate: string;
  price: number;
  moveType: ChipProps["type"][];
}

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  moverName,
  moveDate,
  price,
  moveType,
}: ReviewModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));

  const { control, handleSubmit, register, isValid, errors, reset } =
    useReviewForm();

  const onFormSubmit = (data: { rating: number; content: string }) => {
    onSubmit(moverName, moveDate, price, data.rating, data.content, moveType);
    reset();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: isMobile ? "32px 32px 0 0" : "32px",
            margin: 0,
            position: isMobile ? "fixed" : "initial",
            px: "24px",
            paddingTop: "32px",
            paddingBottom: "40px",
            bottom: isMobile ? 0 : "auto",
            left: isMobile ? 0 : "auto",
            right: isMobile ? 0 : "auto",
            maxHeight: isMobile ? "90vh" : "auto",
            width: isMobile ? "100%" : "auto",
            gap: isMobile ? "26px" : "40px",
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
        variant={isMobile ? "B_18" : "SB_24"}
      >
        리뷰 쓰기
        <Image
          onClick={onClose}
          width={24}
          height={24}
          src={"/images/header/X.svg"}
          alt="close"
          style={{ cursor: "pointer" }}
        />
      </DialogTitle>

      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "20px" : "32px",
        }}
      >
        {/* 기사 정보 카드 */}
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          {/* 이사 유형 chip */}
          <Box
            display="flex"
            flexWrap="wrap"
            sx={{
              mb: isMobile ? "14px" : "24px",
              gap: isMobile ? "8px" : "12px",
            }}
          >
            {moveType.map((type) => (
              <ChipCategory key={type} type={type as ChipProps["type"]} />
            ))}
          </Box>
          {/* 기존 기사님 정보 */}
          <Box
            display="flex"
            gap={isMobile ? "12px" : "24px"}
            sx={{
              px: isMobile ? 0 : "18px",
              paddingTop: isMobile ? "10px" : "24px",
              paddingBottom: isMobile ? "20px" : "24px",
              borderRadius: "8px",
              ...(isMobile
                ? { borderBottom: `1px solid ${COLORS.Line[100]}` }
                : { border: `1px solid ${COLORS.Line[100]}` }),
            }}
          >
            <Image
              width={isMobile ? 46 : 96}
              height={isMobile ? 46 : 96}
              style={{
                borderRadius: "50%",
                objectFit: "cover", // 이미지를 꽉 채우기 위해 추천
              }}
              src={"/images/profile/binProfile.svg"}
              alt="기사님 프로필 이미지"
            />
            <Box display="flex-col" alignSelf="center">
              <Typography
                variant={isMobile ? "SB_14" : "SB_24"}
                fontWeight="bold"
              >
                {moverName} 기사님
              </Typography>
              <Box display="flex">
                <Typography
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "6px" : "12px",
                  }}
                >
                  <InfoChip label="이사일" />{" "}
                  <Typography variant={isMobile ? "M_13" : "M_20"} noWrap>
                    {moveDate}
                  </Typography>
                </Typography>
                {/* === 경계선 추가 === */}
                <Box
                  sx={{
                    width: "1px",
                    backgroundColor: COLORS.Line[200],
                    mx: isMobile ? "12px" : "16px",
                    alignSelf: "stretch",
                  }}
                />
                <Typography
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "6px" : "12px",
                  }}
                >
                  <InfoChip label="견적가" />{" "}
                  <Typography variant={isMobile ? "M_13" : "M_20"} noWrap>
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
            variant={isMobile ? "SB_16" : "SB_20"}
            color={COLORS.Black[300]}
          >
            평점을 선택해 주세요
          </Typography>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <ModalStar
                score={field.value ?? 0}
                isMedium={isMobile}
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
            backgroundColor: COLORS.Line[100],
          }}
        />
        {/* 상세 후기 */}
        <Box display="flex" flexDirection="column" gap="16px">
          <Typography
            variant={isMobile ? "SB_16" : "SB_20"}
            color={COLORS.Black[300]}
          >
            상세 후기를 입력해 주세요
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
            variant={isMobile ? "SB_16" : "SB_20"}
            color={COLORS.White[100]}
          >
            {" "}
            리뷰 등록
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
