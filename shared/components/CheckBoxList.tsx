import { COLORS } from "@/public/theme/colors";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

interface CheckBoxProps {
  selected: string;
  onChange: (value: string) => void;
  onConfirm?: () => void;
  size?: "sm" | "md";
}

export const CheckBoxList = ({
  selected,
  onChange,
  onConfirm,
  size = "md",
}: CheckBoxProps) => {
  const options = [
    "소형이사 (원룸, 투룸, 20평대 미만)",
    "가정이사 (쓰리룸, 20평대 이상)",
    "사무실이사 (사무실, 상업공간)",
  ];

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: size === "md" ? "16px" : "8px",
        backgroundColor: "#FFFFFF",
        borderRadius: "0px 24px 24px 24px",
        width: size === "md" ? "560px" : "280px",
        boxShadow: "4px 4px 10px 0px #E0E0E040",
      }}
    >
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <Button
            key={option}
            onClick={() => onChange(option)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "8px",
              width: size === "md" ? "560px" : "280px",
              height: size === "md" ? "84px" : "52px",
              paddingLeft: size === "md" ? "32px" : "16px",
              border: "1px solid",
              borderRadius: "16px",
              borderColor: isSelected ? COLORS.PrimaryBlue[300] : "#E6E6E6",
              backgroundColor: isSelected
                ? COLORS.PrimaryBlue[50]
                : "transparent",
              color: "#000",
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
              color="text.Primary"
            >
              {option}
            </Typography>
          </Button>
        );
      })}

      <Button
        onClick={onConfirm}
        style={{
          marginTop: size === "md" ? "24px" : "16px",
          width: size === "md" ? "560px" : "280px",
          height: size === "md" ? "64px" : "54px",
          backgroundColor: COLORS.PrimaryBlue[300],
          color: "#FFF",
          border: "none",
          borderRadius: "16px",
          fontSize: size === "md" ? "20px" : "16px",
          lineHeight: size === "md" ? "32px" : "26px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        선택 완료
      </Button>
    </Box>
  );
};
