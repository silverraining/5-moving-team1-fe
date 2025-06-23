"use client";
import { Box, Stack, Typography, Divider } from "@mui/material";
import { CardListMover } from "../../shared/components/card/CardListMover";
import { EstimateSection } from "./EstimateSection";
import { SnsShare } from "../../shared/components/sns-share/SnsShare";
import { EstimateInfo } from "./EstimateInfo";
import Label from "./Label";
import { useEstimateOfferDetail } from "@/src/api/customer/hook";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateLike, useDeleteLike } from "@/src/api/like/hooks";

export default function HistoryDetail({
  requestId,
  moverId,
}: {
  requestId: string;
  moverId: string;
}) {
  const { data, isLoading, isError } = useEstimateOfferDetail(
    requestId,
    moverId
  );

  const queryClient = useQueryClient();

  const { mutate: createLikeMutate } = useCreateLike();
  const { mutate: deleteLikeMutate } = useDeleteLike();

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
            <CardListMover
              data={data}
              onLikeClick={() => {
                const moverId = data.moverId;
                if (data.mover.isLiked) {
                  deleteLikeMutate(
                    { moverId },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ["EstimateOfferDetail"],
                        });
                      },
                    }
                  );
                } else {
                  createLikeMutate(
                    { moverId },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ["EstimateOfferDetail"],
                        });
                      },
                    }
                  );
                }
              }}
            />
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
