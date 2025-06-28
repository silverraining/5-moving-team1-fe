"use client";

import { Grid, Typography } from "@mui/material";
import { CardListCompleteState } from "../../shared/components/card/CardListCompleteState";
import { useEstimateOffer } from "@/src/api/mover/hooks";
import { PATH } from "@/src/lib/constants";
import { useRouter } from "next/navigation";
import { OfferEstimateCardData } from "../../shared/components/card/CardListCompleteState";
import { EmprtyReview } from "../../review/EmptyReview";

export default function OfferEstimate() {
  const { data, isLoading, isError } = useEstimateOffer();

  const router = useRouter();

  if (isLoading) return <Typography>로딩 중...</Typography>;
  if (isError || !data) return <EmprtyReview text="보낸 견적이 없습니다" />;
  if (data.length === 0) return <EmprtyReview text="보낸 견적이 없습니다" />;

  return (
    <Grid container spacing={2} marginTop={["24px", "32px", "40px"]}>
      {data.map((card: OfferEstimateCardData, index: number) => (
        <Grid
          key={index}
          size={[12, 12, 6]}
          display={"flex"}
          sx={{ justifyContent: "center" }}
        >
          <CardListCompleteState
            data={card}
            onclickDetails={() =>
              router.push(PATH.moverEstimateConfirmDetail(card.offerId))
            }
          />
        </Grid>
      ))}
    </Grid>
  );
}
