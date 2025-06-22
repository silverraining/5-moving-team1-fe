"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useRejectRequestForm } from "@/src/hooks/utill";
import { ChipCategory } from "../chip/ChipCategory";
import { ServiceType } from "@/src/types/common";
import { InfoChip } from "./components/InfoChip";
import { Textarea } from "../text-field/Textarea";
import { EstimateRequestStatus } from "@/src/types/common";
import { formatDateWithDay } from "@/src/lib/formatKoreanDate";

interface RejectRequestModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  moveType: ServiceType[];
  isTargeted: boolean;
  requestStatus: string;
  customerName: string;
  moveDate: string;
  fromAddress: string;
  toAddress: string;
  isLoading?: boolean;
}

export default function RejectRequestModal({
  open,
  onClose,
  onSubmit,
  moveType,
  isTargeted,
  requestStatus,
  customerName,
  moveDate,
  fromAddress,
  toAddress,
  isLoading,
}: RejectRequestModalProps) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const { register, handleSubmit, reset, errors, isValid } =
    useRejectRequestForm();

  // 실제 처리 함수
  const onValid = async ({ reason }: { reason: string }) => {
    await onSubmit(reason);
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
            width: ["auto", "375px", "608px"],
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
        반려요청
        <Image
          onClick={onClose}
          width={isSmall ? 24 : 36}
          height={isSmall ? 24 : 36}
          src="/Images/header/X.svg"
          alt="close"
          style={{ cursor: "pointer" }}
        />
      </DialogTitle>
      <form onSubmit={handleSubmit(onValid)}>
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
                px: "18px",
                py: isSmall ? "10px" : "24px",
                borderRadius: "8px",
                border: `1px solid ${theme.palette.Line[100]}`,
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

            {/* 코멘트 */}
            <Box
              display="flex"
              flexDirection="column"
              sx={{ width: "100%" }}
              gap="16px"
            >
              <Typography
                variant={isSmall ? "SB_16" : "SB_20"}
                sx={{ width: "100%", color: theme.palette.Black[300] }}
              >
                반려 사유를 입력해 주세요
              </Typography>
              <Textarea
                placeholder="최소 10자 이상 입력해주세요"
                register={register.reason}
                errorMessage={errors.reason?.message}
                sx={{
                  width: "100%",
                  backgroundColor: theme.palette.NeutralGray[200],
                  borderRadius: ["16px", "16px", "18px"],
                }}
                border={false}
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
              반려하기
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
