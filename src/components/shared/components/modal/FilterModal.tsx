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

interface FilterItem {
  label: string;
  checked: boolean;
  count: number;
}

interface FilterProps {
  open: boolean;
  onClose: () => void;
  moveTypeItems: FilterItem[];
  filterItems: FilterItem[];
  onMoveTypeChange: (label: string, checked: boolean) => void;
  onFilterChange: (label: string, checked: boolean) => void;
  onSubmit: (moveTypeItems: FilterItem[], filterItems: FilterItem[]) => void;
}

const FilterModal = ({
  open,
  onClose,
  moveTypeItems,
  filterItems,
  onMoveTypeChange,
  onFilterChange,
  onSubmit,
}: FilterProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));

  const [selectedTab, setSelectedTab] = React.useState<"moveType" | "filter">(
    "moveType"
  );

  const totalMoveCount = moveTypeItems.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const allMoveChecked = moveTypeItems.every((item) => item.checked);
  const someMoveChecked =
    moveTypeItems.some((item) => item.checked) && !allMoveChecked;

  const totalFilterCount = filterItems.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const allFilterChecked = filterItems.every((item) => item.checked);
  const someFilterChecked =
    filterItems.some((item) => item.checked) && !allFilterChecked;

  const handleAllMoveTypeChange = (checked: boolean) => {
    moveTypeItems.forEach((item) => onMoveTypeChange(item.label, checked));
  };

  const handleAllFilterChange = (checked: boolean) => {
    filterItems.forEach((item) => onFilterChange(item.label, checked));
  };

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
            <Typography
              onClick={() => setSelectedTab("moveType")}
              sx={(theme) => ({ color: theme.palette.Black[400] })}
              variant="B_18"
            >
              이사 유형
            </Typography>
            <Typography
              onClick={() => setSelectedTab("filter")}
              sx={(theme) => ({ color: theme.palette.Grayscale[300] })}
              variant="SB_18"
            >
              필터
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
              label={`전체선택${totalMoveCount}`}
              checked={allMoveChecked}
              indeterminate={someMoveChecked}
              onChange={(e) => handleAllMoveTypeChange(e.target.checked)}
              isAllRow
            />
            <Divider sx={{ mb: 1 }} />
            {moveTypeItems.map((item) => (
              <React.Fragment key={item.label}>
                <CheckboxRow
                  label={`${item.label} (${item.count})`}
                  checked={item.checked}
                  onChange={(e) =>
                    onMoveTypeChange(item.label, e.target.checked)
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
              label={`전체선택 (${totalFilterCount})`}
              checked={allFilterChecked}
              indeterminate={someFilterChecked}
              onChange={(e) => handleAllFilterChange(e.target.checked)}
              isAllRow
            />
            <Divider sx={{ mb: 1 }} />

            {filterItems.map((item) => (
              <React.Fragment key={item.label}>
                <CheckboxRow
                  label={`${item.label} (${item.count})`}
                  checked={item.checked}
                  onChange={(e) => onFilterChange(item.label, e.target.checked)}
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
          onClick={() => onSubmit(moveTypeItems, filterItems)}
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
