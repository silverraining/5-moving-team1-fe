import { Box, OutlinedInput, InputProps, SxProps, Theme } from "@mui/material";
import Image from "next/image";

interface SearchProps extends Omit<InputProps, "fullWidth"> {
  variation: "left" | "right";
  bgColor?: string;
  onClick?: () => void;
  onDeleteClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchProps> = (props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // onKeyDown이 있으면 먼저 실행
    if (props.onKeyDown) {
      props.onKeyDown(e);
    }

    // Enter 키 동작 (onClick이 있을 때만)
    if (e.key === "Enter" && props.onClick) {
      props.onClick();
    }
  };
  return (
    <OutlinedInput
      placeholder={props.placeholder}
      onChange={props.onChange}
      onKeyDown={handleKeyDown}
      value={props.value}
      startAdornment={
        props.variation === "left" && (
          <Image
            width={36}
            height={36}
            src={"/Images/input/search.svg"}
            alt="search Icon"
            style={{ marginRight: "8px" }}
          />
        )
      }
      endAdornment={
        props.variation === "right" && (
          <Box gap={"12px"} display="flex" alignItems={"center"}>
            {!!props.value && (
              <Image
                width={36}
                height={36}
                onClick={props.onDeleteClick}
                src={"/Images/input/delete.svg"}
                alt="delete Icon"
                style={{ cursor: "pointer" }}
              />
            )}
            <Image
              width={36}
              height={36}
              onClick={props.onClick}
              src={"/Images/input/search.svg"}
              alt="search Icon"
              style={{ cursor: "pointer" }}
            />
          </Box>
        )
      }
      fullWidth
      sx={(theme) => ({
        bgcolor: props.bgColor ? props.bgColor : theme.palette.NeutralGray[100],
        borderRadius: "16px",
        width: "100%",
        height: ["52px", "52px", "64px"],
        border: "0px",
        paddingX: ["16px", "16px", "24px"],
        paddingY: "14px",
        color: theme.palette.Grayscale[400],
        fontSize: ["14px", "14px", "20px"],
        fontStyle: "normal",
        fontWeight: 400,
        textAlign: "center",
        ":focus": { color: theme.palette.Black[400] },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&.Mui-focused .MuiOutlinedInput-input": {
          color: theme.palette.Black[400],
        },
        "& input:-webkit-autofill": {
          WebkitBoxShadow: `0 0 0px 1000px white inset !important`,
          boxShadow: `0 0 0px 1000px white inset !important`,
          WebkitTextFillColor: theme.palette.text.primary,
          transition: "background-color 5000s ease-in-out 0s !important",
        },
        ...(typeof props.sx === "function" ? props.sx(theme) : props.sx),
      })}
    />
  );
};
