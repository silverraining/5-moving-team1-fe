import { Box, Typography } from "@mui/material";
import { ChipCategory, ChipProps } from "./ChipCategory";
// import Image from "next/image";

interface CardProps {
  types: ChipProps["type"][];
  message?: string;
  imgSrc?: string;
  alt?: string;
}

export const ChipArea = ({ types, message }: CardProps) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={1}>
      <Box>
        <Box>
          {types.map((type, index) => (
            <ChipCategory key={index} type={type} />
          ))}
        </Box>
        <Typography>{message}</Typography>
      </Box>
      {/* <Image src={imgSrc} alt={alt}></Image> */}
    </Box>
  );
};
