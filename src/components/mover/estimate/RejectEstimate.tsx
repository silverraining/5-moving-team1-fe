"use client";
import { Grid } from "@mui/material";
import {
  CardListReject,
  CardListRejectSkeleton,
  RejectEstimateCardData,
} from "../../shared/components/card/CardListReject";
import { useEstimateOfferReject } from "@/src/api/mover/hooks";
import { EmprtyReview } from "../../review/EmptyReview";
import { useTranslation } from "react-i18next";

export default function RejectEstimate() {
  const { data, isLoading, isError } = useEstimateOfferReject();
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
            <CardListRejectSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (isError || !data || data.length === 0)
    return <EmprtyReview text={t("반려된 견적이 없습니다")} />;

  return (
    <Grid container spacing={2} marginTop={["24px", "32px", "40px"]}>
      {data.map((card: RejectEstimateCardData, index: number) => (
        <Grid
          key={index}
          size={[12, 12, 6]}
          display={"flex"}
          sx={{ justifyContent: "center" }}
        >
          <CardListReject data={card} />
        </Grid>
      ))}
    </Grid>
  );
}
