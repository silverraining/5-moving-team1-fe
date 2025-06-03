"use client";
import { Box, Typography } from "@mui/material";
import { CardListSave } from "@/src/components/shared/components/card/CardListSave";
import { CardData } from "@/src/types/card";

interface Props {
  likedMovers: CardData[];
}
//  찜한 기사님UI

export const LikedMoverList = ({ likedMovers }: Props) => {
  return (
    <Box>
      <Typography variant="SB_24" mb={2}>
        찜한 기사님
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {likedMovers.map((mover, idx) => (
          <CardListSave
            key={idx}
            data={mover}
            forceMobileSize
            // 찜한 기사님 목록에서조 좋아요 클릭 가능하게 할것인지 정해야함
            // onLikeClick={() => console.log("찜 ")}
          />
        ))}
      </Box>
    </Box>
  );
};
