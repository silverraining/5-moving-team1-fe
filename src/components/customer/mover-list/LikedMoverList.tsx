"use client";
import { Box, Typography } from "@mui/material";
import { CardListSave } from "@/src/components/shared/components/card/CardListSave";
import { CardData } from "@/src/types/card";
import { useRouter } from "next/navigation";
import { PATH } from "@/src/lib/constants";
import { useTranslation } from "react-i18next";
import { EstimateOffer } from "@/src/types/estimate";

interface Props {
  likedMovers: EstimateOffer[];
}
//  찜한 기사님UI

export const LikedMoverList = ({ likedMovers }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const handleCardClick = (moverId?: string) => {
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
        {t("찜한 기사님")}
      </Typography>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {likedMovers.map((mover, idx) => (
          <Box
            key={idx}
            onClick={() => handleCardClick(mover.moverId)}
            sx={{ cursor: "pointer" }}
          >
            <CardListSave
              data={mover}
              forceMobileSize
              fontSize={"11.5px"}
              key={idx}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
