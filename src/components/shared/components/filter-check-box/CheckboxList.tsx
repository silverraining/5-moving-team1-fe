import { Box, Typography, Checkbox as MuiCheckbox } from "@mui/material";
import { Checkbox } from "./Checkbox";
import { COLORS } from "@/public/theme/colors";

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
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          borderBottom: `1px solid ${COLORS.Line[200]}`,
          bgcolor: COLORS.White[100],
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "20px",
            color: COLORS.Black[400],
          }}
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
              sx={{
                padding: 0,
                color: COLORS.Grayscale[100],
                "&.Mui-checked": {
                  color: COLORS.PrimaryBlue[300],
                },
              }}
              size="small"
            />
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                color: COLORS.Grayscale[300],
                ml: 1,
              }}
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
            sx={{
              borderBottom:
                index < items.length - 1
                  ? `1px solid ${COLORS.Line[100]}`
                  : "none",
            }}
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
