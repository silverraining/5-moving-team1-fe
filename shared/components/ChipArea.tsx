import { Box } from "@mui/material";

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  size?: "sm" | "md";
}

export const ChipArea = ({
  label = "서울",
  selected = false,
  onClick,
  size = "md",
}: ChipProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "inline-block",
        backgroundColor: selected ? "#F5FAFF" : "#FAFAFA",
        color: selected ? "#1B92FF" : "#242945",
        borderColor: selected ? "#1B92FF" : "#DEDEDE",
        border: "1px solid",
        padding: "10px 20px",
        borderRadius: "100px",
        cursor: "pointer",
        fontSize: size === "md" ? "18px" : "14px",
        lineHeight: size === "md" ? "26px" : "24px",
      }}
    >
      {label}
    </Box>
  );
};
