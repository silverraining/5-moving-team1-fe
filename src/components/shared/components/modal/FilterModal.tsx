import * as React from "react";
import Dialog from "@mui/material/Dialog";
import {
  Button,
  Checkbox,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MoveTypeFilterItem, FilterItem } from "@/src/types/filters";
import { useTranslation } from "react-i18next";
interface FilterProps {
  open: boolean;
  onClose: () => void;
  moveTypeItems: MoveTypeFilterItem[];
  filterItems: FilterItem[];
  selectedTab: "moveType" | "filter";
  onTabChange: (tab: "moveType" | "filter") => void;
  onSubmit: (
    moveTypeItems: MoveTypeFilterItem[],
    filterItems: FilterItem[]
  ) => void;
}

const FilterModal = ({
  open,
  onClose,
  moveTypeItems,
  filterItems,
  selectedTab,
  onTabChange,
  onSubmit,
}: FilterProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"));

  const [localMoveTypeItems, setLocalMoveTypeItems] =
    useState<MoveTypeFilterItem[]>(moveTypeItems);
  const [localFilterItems, setLocalFilterItems] =
    useState<FilterItem[]>(filterItems);
  // 조회하기 버튼 클릭 시, 필터링 적용되게 하기 위해 추가
  useEffect(() => {
    setLocalMoveTypeItems(moveTypeItems);
    setLocalFilterItems(filterItems);
  }, [moveTypeItems, filterItems]);

  const totalMoveCount = moveTypeItems.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const allMoveChecked = localMoveTypeItems.every((item) => item.checked);
  const someMoveChecked =
    localMoveTypeItems.some((item) => item.checked) && !allMoveChecked;

  const totalFilterCount = filterItems.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const allFilterChecked = localFilterItems.every((item) => item.checked);
  const someFilterChecked =
    localFilterItems.some((item) => item.checked) && !allFilterChecked;

  // 조회하기 버튼 클릭 시, 필터링 적용되게 하기 위해 추가
  const handleMoveTypeChange = (label: string, checked: boolean) => {
    setLocalMoveTypeItems((prev) =>
      prev.map((item) => (item.label === label ? { ...item, checked } : item))
    );
  };

  const handleFilterChange = (label: string, checked: boolean) => {
    setLocalFilterItems((prev) =>
      prev.map((item) => (item.label === label ? { ...item, checked } : item))
    );
  };

  const handleAllMoveTypeChange = (checked: boolean) => {
    setLocalMoveTypeItems((prev) => prev.map((item) => ({ ...item, checked })));
  };

  const handleAllFilterChange = (checked: boolean) => {
    setLocalFilterItems((prev) => prev.map((item) => ({ ...item, checked })));
  };

  const handleSubmit = () => {
    onSubmit(localMoveTypeItems, localFilterItems);
  };
  const { t } = useTranslation();
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
                height: "auto",
                mx: "auto",
                marginBottom: 0,
              }
            : {
                borderRadius: "16px",
                px: 3,
                pt: 2,
                pb: 4,
                width: "375px",
                height: "auto",
              },
        },
      }}
    >
      <Stack flex={1} spacing={0}>
        {/* 헤더 */}
        <Stack direction="row" p={1} justifyContent="space-between" pt={"12px"}>
          <Stack direction="row" spacing={3}>
            <Typography
              onClick={() => onTabChange("moveType")}
              sx={(theme) => ({
                color:
                  selectedTab === "moveType"
                    ? theme.palette.Black[400]
                    : theme.palette.Grayscale[300],
                cursor: "pointer",
              })}
              variant="B_18"
            >
              {t("이사 유형")}
            </Typography>
            <Typography
              onClick={() => onTabChange("filter")}
              sx={(theme) => ({
                color:
                  selectedTab === "filter"
                    ? theme.palette.Black[400]
                    : theme.palette.Grayscale[300],
                cursor: "pointer",
              })}
              variant="SB_18"
            >
              {t("필터")}
            </Typography>
          </Stack>
          <Image
            src={"/Images/modal/x.svg"}
            width={24}
            height={24}
            alt="close"
            style={{ cursor: "pointer" }}
            onClick={onClose}
          />
        </Stack>

        {/* 체크박스 */}
        {selectedTab === "moveType" && (
          <Stack spacing={0} flexGrow={1}>
            <CheckboxRow
              label={`${t("전체선택")}${totalMoveCount}`}
              checked={allMoveChecked}
              indeterminate={someMoveChecked}
              onChange={(e) => handleAllMoveTypeChange(e.target.checked)}
              isAllRow
            />
            <Divider sx={{ mb: 1 }} />
            {localMoveTypeItems.map((item) => (
              <React.Fragment key={item.label}>
                <CheckboxRow
                  label={`${item.label} (${item.count})`}
                  checked={item.checked}
                  onChange={(e) =>
                    handleMoveTypeChange(item.label, e.target.checked)
                  }
                />
                <Divider />
              </React.Fragment>
            ))}
          </Stack>
        )}
        <Divider sx={{ my: 2 }} />
        {/* 필터 체크박스 */}
        {selectedTab === "filter" && (
          <Stack spacing={0} flexGrow={1}>
            <CheckboxRow
              label={`${t("전체선택")} (${totalFilterCount})`}
              checked={allFilterChecked}
              indeterminate={someFilterChecked}
              onChange={(e) => handleAllFilterChange(e.target.checked)}
              isAllRow
            />
            <Divider sx={{ mb: 1 }} />

            {localFilterItems.map((item) => (
              <React.Fragment key={item.label}>
                <CheckboxRow
                  label={`${item.label} (${item.count})`}
                  checked={item.checked}
                  onChange={(e) =>
                    handleFilterChange(item.label, e.target.checked)
                  }
                />
                <Divider />
              </React.Fragment>
            ))}
          </Stack>
        )}
        {/* 하단 버튼 */}
        <Button
          variant="contained"
          sx={{ mt: "auto", borderRadius: "16px", height: "54px" }}
          fullWidth
          onClick={handleSubmit}
        >
          {t("조회하기")}
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
      variant="M_16"
      alignContent={"center"}
      sx={(theme) => ({
        color: isAllRow
          ? theme.palette.Grayscale[300]
          : theme.palette.Black[400],
      })}
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
