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
  Divider,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import { Textarea } from "../text-field/Textarea";
import { useEstimateOfferForm } from "@/src/hooks/utill";
import { ChipCategory } from "../chip/ChipCategory";
import { ServiceType } from "@/src/types/common";
import { Outline } from "../text-field/Outline";
import { InfoChip } from "./components/InfoChip";
import { EstimateRequestStatus } from "@/src/types/common";
import { formatDateWithDay } from "@/src/lib/formatKoreanDate";

interface SendEstimateModalProps {
  open: boolean;
  onClose: () => void;
  onSend: (formData: { price: number; comment: string }) => void;
  moveType: ServiceType[];
  isTargeted: boolean;
  requestStatus: string;
  customerName: string;
  moveDate: string;
  fromAddress: string;
  toAddress: string;
  isLoading?: boolean;
}

export default function SendEstimateModal({
  open,
  onClose,
  onSend,
  moveType,
  customerName,
  moveDate,
  isTargeted,
  requestStatus,
  fromAddress,
  toAddress,
  isLoading,
}: SendEstimateModalProps) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const { register, handleSubmit, errors, isValid, reset } =
    useEstimateOfferForm();

  const onSubmit = async (data: { price: string; comment: string }) => {
    await onSend({
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
            width: ["auto", "608px", "608px"],
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
        견적 보내기
        <Image
          onClick={onClose}
          width={isSmall ? 24 : 36}
          height={isSmall ? 24 : 36}
          src="/Images/header/X.svg"
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
              gap: isSmall ? "8px" : "12px",
              mb: isSmall ? "14px" : "24px",
            }}
          >
            {moveType.map((type) => (
              <ChipCategory
                key={type}
                data={{
                  chipType: type,
                  isTargeted,
                  status: requestStatus as EstimateRequestStatus,
                }}
              />
            ))}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={isSmall ? "20px" : "32px"}
          >
            {/* 고객 정보 카드 */}
            <Box
              display="flex"
              flexDirection="column"
              gap={isSmall ? "6px" : "16px"}
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
              <Box display="flex">
                <Typography
                  variant={isSmall ? "SB_14" : "SB_24"}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {customerName} 고객님
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap={isSmall ? "8px" : "16px"}
              >
                <InfoChip label="이사일" />
                <Typography variant={isSmall ? "M_14" : "M_18"} noWrap>
                  {formatDateWithDay(moveDate)}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  gap={isSmall ? "8px" : "12px"}
                >
                  <InfoChip label="출발" />
                  <Typography variant={isSmall ? "M_14" : "M_18"} noWrap>
                    {fromAddress}
                  </Typography>
                </Box>
                {/* === 경계선 추가 === */}
                <Box
                  sx={{
                    width: "1px",
                    backgroundColor: theme.palette.Line[200],
                    alignSelf: "stretch",
                    mx: isSmall ? "14px" : "16px",
                  }}
                />
                <Box
                  display="flex"
                  alignItems="center"
                  gap={isSmall ? "8px" : "12px"}
                >
                  <InfoChip label="도착" />
                  <Typography variant={isSmall ? "M_14" : "M_18"} noWrap>
                    {toAddress}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* 견적가 */}
            <Box
              display="flex"
              flexDirection="column"
              sx={{ width: "100%", gap: "16px" }}
            >
              <Typography
                variant={isSmall ? "SB_16" : "SB_20"}
                sx={{ color: theme.palette.Black[300] }}
              >
                견적가를 입력해 주세요
              </Typography>
              <Outline
                type="number"
                placeholder="견적가 입력"
                register={register.price}
                errorMessage={errors.price?.message}
                border={false}
                sx={{
                  width: "100%",
                  backgroundColor: theme.palette.NeutralGray[200],
                  borderRadius: ["16px", "16px", "18px"],
                }}
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
            {/* 코멘트 */}
            <Box
              display="flex"
              flexDirection="column"
              sx={{ width: "100%", gap: "16px" }}
            >
              <Typography
                variant={isSmall ? "SB_16" : "SB_20"}
                sx={{ color: theme.palette.Black[300] }}
              >
                코멘트를 입력해 주세요
              </Typography>
              <Textarea
                placeholder="최소 10자 이상 입력해주세요"
                register={register.comment}
                errorMessage={errors.comment?.message}
                border={false}
                sx={{
                  width: "100%",
                  backgroundColor: theme.palette.NeutralGray[200],
                  borderRadius: ["16px", "16px", "18px"],
                }}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 0, mt: isSmall ? "26px" : "40px" }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || isLoading}
            sx={{
              padding: "16px",
              width: "100%",
              gap: "10px",
            }}
          >
            <Typography
              variant={isSmall ? "SB_16" : "SB_20"}
              sx={{ color: theme.palette.White[100] }}
            >
              견적 보내기
            </Typography>
            {isLoading && (
              <CircularProgress
                size={20}
                sx={{
                  color: theme.palette.White[100],
                }}
              />
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
