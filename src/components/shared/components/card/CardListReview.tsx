import { Box, Button, Typography } from "@mui/material";
import { CardData } from "./CardListdd";
import Image from "next/image";

interface CardProps {
  data: CardData;
}

export const CardListReview = ({ data }: CardProps) => {
  return (
    <Box>
      <Box>
        <Box>
          <Typography>{data.nickname}</Typography>
        </Box>
        <Box>
          <Typography>{data.date}</Typography>
        </Box>
      </Box>
      <Box display="flex" gap="4px">
        {Array.from(data.review ?? 1).map((_, i) => (
          <Box
            key={i}
            position="relative"
            width={[20, 20, 24]}
            height={[20, 20, 24]}
          >
            <Image
              src="/images/star/star_active.svg"
              alt="별점 사진"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
        ))}
      </Box>
      <Box>
        <Typography>{data.review}</Typography>
      </Box>
    </Box>
  );
};
