/**
 * CheckboxList 컴포넌트 사용 방법
 *
 * 1. 체크박스 아이템 정의
 * const checkboxItems: CheckboxItem[] = [
 *   { label: "소형이사", count: 10, checked: false },
 *   { label: "가정이사", count: 2, checked: false },
 *   { label: "사무실이사", count: 8, checked: false },
 * ];
 *
 * 2. 컴포넌트 사용
 * <CheckboxList
 *   title="지역"
 *   items={checkboxItems}
 *   onItemChange={(index, checked) => {
 *
 *    // 개별 체크박스 선택
 *     const newItems = [...checkboxItems];
 *     newItems[index].checked = checked;
 *     setCheckboxItems(newItems);
 *   }}
 *    // 전체 선택
 *   onSelectAll={(checked) => {
 *     const newItems = checkboxItems.map(item => ({
 *       ...item,
 *       checked: checked
 *     }));
 *     setCheckboxItems(newItems);
 *   }}
 * />
 */

import { Box, Typography, Checkbox as MuiCheckbox } from "@mui/material";
import { Checkbox } from "./Checkbox";

interface CheckboxItem {
  label: string;
  count: number;
  checked: boolean;
}

interface CheckboxListProps {
  title: string;
  items: CheckboxItem[];
  onItemChange: (index: number, checked: boolean) => void;
  onSelectAll?: (checked: boolean) => void;
}

export const CheckboxList = ({
  title,
  items,
  onItemChange,
  onSelectAll,
}: CheckboxListProps) => {
  const allChecked = items.every((item) => item.checked);

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: "328px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          borderBottom: `1px solid ${theme.palette.Line[200]}`,
          bgcolor: theme.palette.White[100],
        })}
      >
        <Typography
          sx={(theme) => ({
            fontWeight: 500,
            fontSize: "20px",
            color: theme.palette.Black[400],
          })}
        >
          {title}
        </Typography>
        {onSelectAll && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => onSelectAll(!allChecked)}
          >
            <MuiCheckbox
              checked={allChecked}
              onChange={(e) => onSelectAll(e.target.checked)}
              onClick={(e) => e.stopPropagation()}
              sx={(theme) => ({
                padding: 0,
                color: theme.palette.Grayscale[100],
                "&.Mui-checked": {
                  color: theme.palette.PrimaryBlue[300],
                },
              })}
              size="small"
            />
            <Typography
              sx={(theme) => ({
                fontSize: "16px",
                fontWeight: 400,
                color: theme.palette.Grayscale[300],
                ml: 1,
              })}
            >
              전체선택
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={(theme) => ({
              borderBottom:
                index < items.length - 1
                  ? `1px solid ${theme.palette.Line[100]}`
                  : "none",
            })}
          >
            <Checkbox
              label={item.label}
              count={item.count}
              checked={item.checked}
              onChange={(checked) => onItemChange(index, checked)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
