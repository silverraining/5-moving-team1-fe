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
  onConfirm?: () => void;
}

export const CheckBoxList = ({
  selected,
  onChange,
  onConfirm,
}: CheckBoxProps) => {
  const options = [
    "소형이사 (원룸, 투룸, 20평대 미만)",
    "가정이사 (쓰리룸, 20평대 이상)",
    "사무실이사 (사무실, 상업공간)",
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const size = isMobile ? "sm" : isDesktop ? "xl" : "md";

  const isDisabled = !selected;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: ["8px", "16px"],
        backgroundColor: theme.palette.White[100],
        borderRadius: isMobile ? "24px 4px 24px 24px" : "32px 0px 32px 32px",
        width: ["312px", "640px"],
        boxShadow: "4px 4px 10px 0px #E0E0E040",
        padding: isMobile ? "16px" : "40px",
      }}
    >
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <Button
            key={option}
            onClick={() => onChange(option)}
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "8px",
              width: "100%",
              height: ["52px", "84px"],
              paddingLeft: ["16px", "32px"],
              border: "1px solid",
              borderRadius: "16px",
              borderColor: isSelected
                ? theme.palette.PrimaryBlue[300]
                : theme.palette.Line[200],
              backgroundColor: isSelected
                ? theme.palette.PrimaryBlue[50]
                : "transparent",
              color: theme.palette.Black[600],
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
              color="text.Primary"
            >
              {option}
            </Typography>
          </Button>
        );
      })}

      <Button
        onClick={onConfirm}
        disabled={isDisabled}
        sx={(theme) => ({
          marginTop: ["16px", "24px"],
          width: "100%",
          height: ["54px", "64px"],
          backgroundColor: isDisabled
            ? theme.palette.Grayscale[100]
            : theme.palette.PrimaryBlue[300],
          color: theme.palette.White[100],
          border: "none",
          borderRadius: "16px",
          cursor: "pointer",
        })}
      >
        <Typography
          variant={size === "sm" ? "SB_16" : "SB_20"}
          color={theme.palette.White[100]}
        >
          선택 완료
        </Typography>
      </Button>
    </Box>
  );
};
