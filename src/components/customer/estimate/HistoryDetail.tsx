"use client";
import { Box, Stack, Typography, Divider } from "@mui/material";
import { CardListMover } from "../../shared/components/card/CardListMover";
import { EstimateSection } from "./EstimateSection";
import { SnsShare } from "../../shared/components/sns-share/SnsShare";
import { EstimateInfo } from "./EstimateInfo";
import Label from "./Label";
import { useEstimateOfferDetail } from "@/src/api/customer/hook";

export default function HistoryDetail({
  requestId,
  moverId,
}: {
  requestId: string;
  moverId: string;
}) {
  const handleLikeClick = () => {
    alert(`좋아요 버튼 누름`);
  };

  const { data, isLoading, isError } = useEstimateOfferDetail(
    requestId,
    moverId
  );

  if (isLoading) return <Typography>로딩 중입니다...</Typography>;
  if (isError || !data)
    return <Typography>데이터를 불러오지 못했습니다.</Typography>;

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
          <EstimateSection title="견적 상세">
            <CardListMover data={data} onLikeClick={handleLikeClick} />
          </EstimateSection>
          <Divider />

          {/* 태블릿 이하 SNS */}
          <Stack display={["flex", "flex", "none"]} gap={"24px"}>
            <SnsShare title="견적서 공유하기" />
            <Divider />
          </Stack>
        </Stack>

        {/* 견적가 */}
        <EstimateSection title="견적가">
          <Typography variant="B_32">
            {(data.price ?? 0).toLocaleString()}원
          </Typography>
        </EstimateSection>
        <Divider />

        {/* 견적 정보 */}
        <EstimateSection title="견적 정보">
          <EstimateInfo info={data} />
        </EstimateSection>

        <Label status={data.status} />
      </Stack>

      {/* 데스크탑 SNS */}
      <Box
        display={["none", "none", "block"]}
        marginTop={["0px", "0px", "71px"]}
      >
        <SnsShare title="견적서 공유하기" />
      </Box>
    </Stack>
  );
}
