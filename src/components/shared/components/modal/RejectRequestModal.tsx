"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useRejectRequestForm } from "@/src/hooks/utill";
import { ChipCategory, type ChipProps } from "../chip/ChipCategory";
import { InfoChip } from "./components/InfoChip";
import { COLORS } from "@/public/theme/colors";
import { Textarea } from "../text-field/Textarea";

interface RejectRequestModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  moveType: ChipProps["type"][];
  customerName: string;
  moveDate: string;
  fromAddress: string;
  toAddress: string;
}

export default function RejectRequestModal({
  open,
  onClose,
  onSubmit,
  moveType,
  customerName,
  moveDate,
  fromAddress,
  toAddress,
}: RejectRequestModalProps) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const { register, handleSubmit, reset, errors, isValid } =
    useRejectRequestForm();

  // 실제 처리 함수
  const onValid = ({ reason }: { reason: string }) => {
    onSubmit(reason);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        반려요청
        <Image
          onClick={handleClose}
          width={isSmall ? 24 : 36}
          height={isSmall ? 24 : 36}
          src="/images/header/X.svg"
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
              <ChipCategory key={type} type={type as ChipProps["type"]} />
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
                  ? { borderBottom: `1px solid ${COLORS.Line[100]}` }
                  : { border: `1px solid ${COLORS.Line[100]}` }),
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
                  {moveDate}
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
                    backgroundColor: COLORS.Line[200],
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
                color={COLORS.Black[300]}
                sx={{ width: "100%" }}
              >
                반려 사유를 입력해 주세요
              </Typography>
              <Textarea
                placeholder="최소 10자 이상 입력해주세요"
                register={register.reason}
                errorMessage={errors.reason?.message}
                sx={{ width: "100%" }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 0, mt: isSmall ? "26px" : "40px" }}>
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
              variant={isSmall ? "SB_16" : "SB_20"}
              color={COLORS.White[100]}
            >
              반려하기
            </Typography>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
