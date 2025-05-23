import * as React from "react";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { COLORS } from "@/public/theme/colors";

interface FilterProps {
  open: boolean;
  onClose: () => void;
  count: { all: number; small: number; home: number; office: number };
  checked: {
    all: boolean;
    small: boolean;
    home: boolean;
    office: boolean;
  };
  indeterminate: boolean;
  onAllChange: (value: boolean) => void;
  onIndividualChange: (
    key: "small" | "home" | "office",
    value: boolean
  ) => void;
  onSubmit: (checked: FilterProps["checked"]) => void;
}

const FilterModal = ({
  open,
  onClose,
  count,
  checked,
  indeterminate,
  onAllChange,
  onIndividualChange,
  onSubmit,
}: FilterProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: isMobile
            ? {
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                px: 3,
                pt: 2,
                pb: 4,
                borderTopLeftRadius: "32px",
                borderTopRightRadius: "32px",
                width: "375px",
                height: ["376px", "376px", "444px"],
                mx: "auto",
              }
            : {
                borderRadius: "16px",
                px: 3,
                pt: 2,
                pb: 4,
                width: "375px",
                height: ["376px", "376px", "444px"],
              },
        },
      }}
    >
      <Stack flex={1} spacing={0}>
        {/* 헤더 */}
        <Stack direction="row" p={1} justifyContent="space-between" pt={"12px"}>
          <Stack direction="row" spacing={3}>
            <Typography color={COLORS.Black[400]} variant="B_18">
              이사 유형
            </Typography>
            <Typography color={COLORS.Grayscale[300]} variant="SB_18">
              필터
            </Typography>
          </Stack>
          <Image
            src={"/images/modal/x.svg"}
            width={24}
            height={24}
            alt="close"
            style={{ cursor: "pointer" }}
            onClick={onClose}
          />
        </Stack>

        {/* 체크박스 */}
        <Stack spacing={0} flexGrow={1}>
          <CheckboxRow
            label={`전체선택${count.all}`}
            checked={checked.all}
            indeterminate={indeterminate}
            onChange={(e) => onAllChange(e.target.checked)}
            isAllRow
          />
          <Divider sx={{ mb: 1 }} />
          <CheckboxRow
            label={`소형이사${count.small}`}
            checked={checked.small}
            onChange={(e) => onIndividualChange("small", e.target.checked)}
          />
          <Divider />
          <CheckboxRow
            label={`가정이사${count.home}`}
            checked={checked.home}
            onChange={(e) => onIndividualChange("home", e.target.checked)}
          />
          <Divider />
          <CheckboxRow
            label={`사무실이사${count.office}`}
            checked={checked.office}
            onChange={(e) => onIndividualChange("office", e.target.checked)}
          />
        </Stack>

        {/* 하단 버튼 */}
        <Button
          variant="contained"
          sx={{ mt: "auto", borderRadius: "16px", height: "54px" }}
          fullWidth
          onClick={() => onSubmit(checked)}
        >
          조회하기
        </Button>
      </Stack>
    </Dialog>
  );
};

interface CheckboxRowProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  indeterminate?: boolean;
  isAllRow?: boolean;
}

const CheckboxRow = ({
  label,
  checked,
  onChange,
  indeterminate = false,
  isAllRow = false,
}: CheckboxRowProps) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Typography
      height={isAllRow ? "52px" : "68px"}
      color={isAllRow ? COLORS.Grayscale[300] : COLORS.Black[400]}
      variant="M_16"
      alignContent={"center"}
    >
      {label}
    </Typography>
    <Checkbox
      checked={checked}
      indeterminate={indeterminate}
      onChange={onChange}
    />
  </Stack>
);

export default FilterModal;
