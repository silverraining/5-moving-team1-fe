import { Box, OutlinedInput, InputProps, SxProps, Theme } from "@mui/material";
import Image from "next/image";

interface SearchProps extends Omit<InputProps, "fullWidth"> {
  variation: "left" | "right";
  bgColor?: string;
}

export const SearchInput: React.FC<SearchProps> = (props) => {
  return (
    <OutlinedInput
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      startAdornment={
        props.variation === "left" && (
          <Image
            width={36}
            height={36}
            src={"/images/input/search.svg"}
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
                onClick={props.onClick}
                src={"/images/input/delete.svg"}
                alt="delete Icon"
                style={{ cursor: "pointer" }}
              />
            )}
            <Image
              width={36}
              height={36}
              src={"/images/input/search.svg"}
              alt="search Icon"
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
      })}
    />
  );
};
