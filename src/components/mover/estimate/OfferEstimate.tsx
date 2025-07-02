"use client";

import { Grid } from "@mui/material";
import {
  CardListCompleteState,
  CardListCompleteStateSkeleton,
} from "../../shared/components/card/CardListCompleteState";
import { useEstimateOffer } from "@/src/api/mover/hooks";
import { PATH } from "@/src/lib/constants";
import { useRouter } from "next/navigation";
import { OfferEstimateCardData } from "../../shared/components/card/CardListCompleteState";
import { EmptyReview } from "../../review/EmptyReview";
import { useTranslation } from "react-i18next";

export default function OfferEstimate() {
  const { data, isLoading, isError } = useEstimateOffer();

  const router = useRouter();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Grid container spacing={2} marginTop={["24px", "32px", "40px"]}>
        {[1, 2, 3, 4, 5].map((_, idx) => (
          <Grid
            key={idx}
            size={[12, 12, 6]}
            display={"flex"}
            sx={{ justifyContent: "center" }}
          >
            <CardListCompleteStateSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (isError || !data) return <EmptyReview text={t("보낸 견적이 없습니다")} />;

  if (data.length === 0)
    return <EmptyReview text={t("보낸 견적이 없습니다")} />;

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
