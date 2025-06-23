"use client";
import { Box, Typography } from "@mui/material";
import { CardListSave } from "@/src/components/shared/components/card/CardListSave";
import { CardData } from "@/src/types/card";
import { useRouter } from "next/navigation";
import { PATH } from "@/src/lib/constants";

interface Props {
  likedMovers: CardData[];
}
//  찜한 기사님UI

export const LikedMoverList = ({ likedMovers }: Props) => {
  const router = useRouter();

  const handleCardClick = (moverId?: string) => {
    console.log("Liked mover card clicked, moverId:", moverId);
    if (moverId) {
      router.push(PATH.moverDetail(moverId));
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: "24px",
          lineHeight: "32px",
          fontWeight: 600,
        }}
        mb={2}
      >
        찜한 기사님
      </Typography>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {likedMovers.map((mover, idx) => (
          <Box
            key={idx}
            onClick={() => handleCardClick(mover.id)}
            sx={{ cursor: "pointer" }}
          >
            <CardListSave data={mover} forceMobileSize />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
