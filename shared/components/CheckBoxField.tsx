import { COLORS } from "@/public/theme/colors";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

interface CheckBoxProps {
  selected: string;
  onChange: (value: string) => void;
  size?: "sm" | "md";
}

export const CheckBoxField = ({
  selected,
  onChange,
  size = "md",
}: CheckBoxProps) => {
  const options = [
    "소형이사 (원룸, 투룸, 20평대 미만)",
    "가정이사 (쓰리룸, 20평대 이상)",
  ];

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <Button
            key={option}
            onClick={() => onChange(option)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              width: size === "md" ? "560px" : "280px",
              height: size === "md" ? "84px" : "52px",
              padding: "10px 16px",
              border: "1px solid",
              borderRadius: "16px",
              borderColor: isSelected ? COLORS.PrimaryBlue[300] : "#E6E6E6",
              backgroundColor: isSelected
                ? COLORS.PrimaryBlue[300]
                : "transparent",
              cursor: "pointer",

              boxShadow: "4px 4px 10px 0px #C3D9F233",
            }}
          >
            <Image
              src={
                isSelected
                  ? "/Images/check-box/Property 1=active, Property 2=md, sort=round.svg"
                  : "/Images/check-box/Property 1=default, Property 2=md, sort=round.svg"
              }
              alt="선택 상태"
              width={size === "md" ? 36 : 24}
              height={size === "md" ? 36 : 24}
            />
            <Typography
              variant={size === "md" ? "SB_18" : "SB_14"}
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
