"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  // Divider,
} from "@mui/material";
import Image from "next/image";
import { Textarea } from "../text-field/Textarea";
import { useEstimateOfferForm } from "@/src/hooks/utill";
import { ChipCategory, type ChipProps } from "../chip/ChipCategory";
import { Outline } from "../text-field/Outline";
import { InfoChip } from "./components/InfoChip";
import { COLORS } from "@/public/theme/colors";

interface SendEstimateModalProps {
  open: boolean;
  onClose: () => void;
  onSend: (formData: { price: number; comment: string }) => void;
  moveType: ChipProps["type"][];
  customerName: string;
  moveDate: string;
  fromAddress: string;
  toAddress: string;
}

export default function SendEstimateModal({
  open,
  onClose,
  onSend,
  moveType,
  customerName,
  moveDate,
  fromAddress,
  toAddress,
}: SendEstimateModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));

  const { register, handleSubmit, errors, isValid, reset } =
    useEstimateOfferForm();

  const onSubmit = (data: { price: string; comment: string }) => {
    onSend({
      price: Number(data.price),
      comment: data.comment.trim(),
    });

    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
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
        견적 보내기
        <Image
          onClick={onClose}
          width={24}
          height={24}
          src="/images/header/X.svg"
          alt="close"
          style={{ cursor: "pointer" }}
        />
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            p: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* 이사 유형 chip */}
          <Box
            display="flex"
            flexWrap="wrap"
            sx={{
              gap: isMobile ? "8px" : "12px",
              mb: isMobile ? "14px" : "24px",
            }}
          >
            {moveType.map((type) => (
              <ChipCategory key={type} type={type as ChipProps["type"]} />
            ))}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={isMobile ? "20px" : "32px"}
          >
            {/* 고객 정보 카드 */}
            <Box
              display="flex"
              flexDirection="column"
              gap={isMobile ? "12px" : "24px"}
              sx={{
                px: isMobile ? 0 : "18px",
                // py: isMobile ? "10px" : "24px",
                paddingTop: isMobile ? "10px" : "24px",
                paddingBottom: isMobile ? "20px" : "24px",
                borderRadius: "8px",
                ...(isMobile
                  ? { borderBottom: `1px solid ${COLORS.Line[100]}` }
                  : { border: `1px solid ${COLORS.Line[100]}` }),
              }}
            >
              <Box display="flex">
                <Typography
                  variant={isMobile ? "SB_14" : "SB_24"}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {customerName} 고객님
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap={isMobile ? "8px" : "16px"}
              >
                <InfoChip label="이사일" />
                <Typography variant={isMobile ? "M_14" : "M_18"} noWrap>
                  {moveDate}
                </Typography>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                // gap={isMobile ? "14px" : "16px"}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={isMobile ? "8px" : "12px"}
                >
                  <InfoChip label="출발" />
                  <Typography variant={isMobile ? "M_14" : "M_18"} noWrap>
                    {fromAddress}
                  </Typography>
                </Box>
                {/* === 경계선 추가 === */}
                <Box
                  sx={{
                    width: "1px",
                    backgroundColor: COLORS.Line[200],
                    alignSelf: "stretch",
                    mx: isMobile ? "14px" : "16px",
                  }}
                />
                <Box
                  display="flex"
                  alignItems="center"
                  gap={isMobile ? "8px" : "12px"}
                >
                  <InfoChip label="도착" />
                  <Typography variant={isMobile ? "M_14" : "M_18"} noWrap>
                    {toAddress}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* 견적가 */}
            <Box display="flex" flexDirection="column">
              <Typography
                variant={isMobile ? "SB_16" : "SB_20"}
                color={COLORS.Black[300]}
              >
                견적가를 입력해 주세요
              </Typography>
              <Outline
                type="number"
                placeholder="견적가 입력"
                register={register.price}
                errorMessage={errors.price?.message}
              />
            </Box>
            {/* 코멘트 */}
            <Box display="flex" flexDirection="column">
              <Typography
                variant={isMobile ? "SB_16" : "SB_20"}
                color={COLORS.Black[300]}
              >
                코멘트를 입력해 주세요
              </Typography>
              <Textarea
                placeholder="최소 10자 이상 입력해주세요"
                register={register.comment}
                errorMessage={errors.comment?.message}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 0, mt: isMobile ? "26px" : "40px" }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid}
            sx={{
              padding: "16px",
              width: "100%",
            }}
          >
            <Typography
              variant={isMobile ? "SB_16" : "SB_20"}
              color={COLORS.White[100]}
            >
              견적 보내기
            </Typography>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
