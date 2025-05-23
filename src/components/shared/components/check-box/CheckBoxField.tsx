import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";

interface CheckBoxProps {
  selected: string;
  onChange: (value: string) => void;
}

export const CheckBoxField = ({ selected, onChange }: CheckBoxProps) => {
  const options = [
    "소형이사 (원룸, 투룸, 20평대 미만)",
    "가정이사 (쓰리룸, 20평대 이상)",
  ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const size = isMobile ? "sm" : isDesktop ? "xl" : "md";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <Button
            key={option}
            onClick={() => onChange(option)}
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              gap: "12px",
              width: ["280px", "560px"],
              height: ["52px", "84px"],
              padding: ["10px 16px"],
              border: "1px solid",
              borderRadius: "16px",
              borderColor: isSelected
                ? theme.palette.PrimaryBlue[300]
                : theme.palette.Line[200],
              backgroundColor: isSelected
                ? theme.palette.PrimaryBlue[300]
                : "transparent",
              cursor: "pointer",

              boxShadow: "4px 4px 10px 0px #C3D9F233",
            })}
          >
            <Image
              src={
                isSelected
                  ? "/Images/check-box/onclick.svg"
                  : "/Images/check-box/click.svg"
              }
              alt="선택 상태"
              width={size === "sm" ? 24 : 36}
              height={size === "sm" ? 24 : 36}
            />
            <Typography
              variant={size === "sm" ? "SB_14" : "SB_18"}
              color="text.primary"
            >
              {option}
            </Typography>
          </Button>
        );
      })}
    </Box>
  );
};
