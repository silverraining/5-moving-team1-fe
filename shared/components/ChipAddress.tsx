import { Box } from "@mui/material";

interface ChipProps {
  label: string;
  size?: "sm" | "md";
}
// 도로명

export const ChipAddress = ({ label = "도로명", size = "md" }: ChipProps) => {
  return (
    <Box
      sx={{
        display: "inline-block",
        backgroundColor: "#F5FAFF",
        color: "#1B92FF",
        border: "0px",
        padding: size === "md" ? "2px 8.5px" : "2px 6px",
        borderRadius: "16px",
        fontSize: size === "md" ? "14px" : "12px",
        lineHeight: size === "md" ? "24px" : "20px",
      }}
    >
      {label}
    </Box>
  );
};
