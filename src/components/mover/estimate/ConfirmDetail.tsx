"use client";
import { Box, Stack, Typography, Divider } from "@mui/material";
import { CardListReject } from "../../shared/components/card/CardListReject";
import { EstimateSection } from "../../customer/estimate/EstimateSection";
import { SnsShare } from "../../shared/components/sns-share/SnsShare";
import { EstimateInfo } from "../../customer/estimate/EstimateInfo";
import { useEstimateOfferId } from "@/src/api/mover/hooks";
import { EmprtyReview } from "../../review/EmptyReview";
import { useTranslation } from "react-i18next";

export default function ConfirmDetail({ offerId }: { offerId: string }) {
  const { data, isLoading, isError } = useEstimateOfferId(offerId);
  const { t } = useTranslation();
  if (isLoading) return <Typography>로딩 중입니다...</Typography>;
  if (isError || !data || data.length === 0)
    return <EmprtyReview text={t("확정 견적 상세 데이터가 없습니다")} />;

  return (
    <Stack
      gap={"117px"}
      flexDirection={["column", "column", "row"]}
      justifyContent={"center"}
    >
      <Stack
        maxWidth={["1200px", "1200px", "955px"]}
        width={"100%"}
        gap={["24px", "24px", "40px"]}
      >
        {/* 견적 상세 */}
        <Stack gap={"24px"}>
          <EstimateSection title={t("견적 상세")}>
            <CardListReject data={data} />
          </EstimateSection>
          <Divider />

          {/* 태블릿 이하 SNS */}
          <Stack display={["flex", "flex", "none"]} gap={"24px"}>
            <SnsShare title={t("견적서 공유하기")} />
            <Divider />
          </Stack>
        </Stack>

        {/* 견적가 */}
        <EstimateSection title={t("견적가")}>
          <Typography variant="B_32">
            {(data.price ?? 0).toLocaleString()}원
          </Typography>
        </EstimateSection>
        <Divider />

        {/* 견적 정보 */}
        <EstimateSection title={t("견적 정보")}>
          <EstimateInfo info={data} />
        </EstimateSection>
      </Stack>

      {/* 데스크탑 SNS */}
      <Box
        display={["none", "none", "block"]}
        marginTop={["0px", "0px", "71px"]}
      >
        <SnsShare title={t("견적서 공유하기")} />
      </Box>
    </Stack>
  );
}
