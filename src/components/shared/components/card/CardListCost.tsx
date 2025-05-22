import { Box, Typography } from "@mui/material";
import { ChipProps } from "../chip/ChipCategory";
import { CardListDriver } from "./CardListDriver";

interface CardData {
  types: ChipProps["type"][];
  message?: string;
  imgSrc: string;
  name: string;
  like: number;
  rating: number;
  count: number;
  career: number;
  confirm: number;
  isLiked: boolean;
  cost: number;
}

interface CardProps {
  data: CardData;
}

export const ChipArea = ({ data }: CardProps) => {
  return (
    <Box>
      <CardListDriver data={data}></CardListDriver>
      <Box>
        <Typography>견적 금액</Typography>
        <Typography>{data.cost}</Typography>
      </Box>
    </Box>
  );
};
