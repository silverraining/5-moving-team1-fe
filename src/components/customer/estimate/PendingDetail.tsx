"use client";
import {
  Stack,
  Typography,
  Divider,
  Button,
  useTheme,
  Box,
} from "@mui/material";
import { CardListMover } from "../../shared/components/card/CardListMover";
import { EstimateSection } from "./EstimateSection";
import { SnsShare } from "../../shared/components/sns-share/SnsShare";
import { EstimateInfo } from "./EstimateInfo";
import {
  useEstimateOfferConfirmed,
  useEstimateOfferDetail,
} from "@/src/api/customer/hook";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateLike, useDeleteLike } from "@/src/api/like/hooks";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function PendingDetail({
  requestId,
  moverId,
}: {
  requestId: string;
  moverId: string;
}) {
  const theme = useTheme();

  // 👉 실제 데이터 패칭
  const { data, isLoading, isError } = useEstimateOfferDetail(
    requestId,
    moverId
  );

  const queryClient = useQueryClient();

  const { mutate: createLikeMutate } = useCreateLike();
  const { mutate: deleteLikeMutate } = useDeleteLike();

  const { mutate: EstimateOfferConfirmedMutate } = useEstimateOfferConfirmed();
  const { t } = useTranslation();
  const handleLikeClick = () => {
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
  };

  const handleEstimateConfirm = () => {
    const offerId = data.offerId;
    EstimateOfferConfirmedMutate(
      { offerId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["EstimateOfferDetail"],
          });
        },
      }
    );
  };

  if (isLoading) return <Typography>견적 데이터 로딩중...</Typography>;
  if (isError || !data)
    return <Typography>견적 데이터를 불러오는 데 실패했습니다.</Typography>;

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
            <CardListMover
              data={{ ...data, status: data.offerStatus }}
              onLikeClick={handleLikeClick}
            />
          </EstimateSection>
          <Divider sx={{ borderColor: theme.palette.Line[100] }} />

          {/* 태블릿 이하 SNS */}
          <Stack display={["flex", "flex", "none"]} gap={"24px"}>
            <SnsShare title={t("견적서 공유하기")} />
            <Divider sx={{ borderColor: theme.palette.Line[100] }} />
          </Stack>
        </Stack>

        {/* 견적가 */}
        <EstimateSection title={t("견적가")}>
          <Typography variant="B_32">
            {(data.price ?? 0).toLocaleString()}원
          </Typography>
        </EstimateSection>
        <Divider sx={{ borderColor: theme.palette.Line[100] }} />

        {/* 견적 정보 */}
        <EstimateSection title={t("견적 정보")}>
          <EstimateInfo info={data} />
        </EstimateSection>
      </Stack>

      {/* 데스크탑 SNS */}
      <Stack
        display={["none", "none", "flex"]}
        marginTop={"72px"}
        gap={"40px"}
        width={"328px"}
      >
        {/* 견적 확정 버튼 */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            const offerId = data.offerId;
            EstimateOfferConfirmedMutate(
              { offerId },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ["EstimateOfferDetail"],
                  });
                },
              }
            );
          }}
          sx={{
            height: "56px",
            fontSize: 16,
            fontWeight: 600,
            backgroundColor: theme.palette.PrimaryBlue[300],
            "&:hover": {
              backgroundColor: theme.palette.PrimaryBlue[500],
            },
          }}
        >
          {t("견적 확정하기")}
        </Button>

        <Divider />
        <SnsShare title={t("견적서 공유하기")} />
      </Stack>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "#fff", // 필요하면 theme.palette.White[100] 등으로
          zIndex: 1200,
          display: ["flex", "flex", "none"], // 모바일/태블릿만
        }}
      >
        <Box
          sx={{ display: "flex", gap: "8px", alignItems: "center", flex: 1 }}
        >
          {/* 찜하기 버튼 - 하트만 */}
          <Button
            variant="outlined"
            onClick={handleLikeClick}
            sx={{
              width: "54px",
              height: "54px",
              backgroundColor: theme.palette.White[100],
              border: `1px solid ${theme.palette.Line[200]}`,
              borderRadius: "12px",
              padding: 0,
              "&:hover": {
                backgroundColor: theme.palette.PrimaryBlue[100],
                border: `1px solid ${theme.palette.Line[200]}`,
              },
            }}
          >
            <Image
              src={
                data.mover.isLiked
                  ? "/Images/like/like.svg"
                  : "/Images/like/unlike.svg"
              }
              alt="찜하기"
              width={24}
              height={24}
            />
          </Button>

          {/* 견적 요청 버튼 */}
          <Button
            variant="contained"
            onClick={handleEstimateConfirm}
            sx={{
              flex: 1,
              height: "56px",
              fontSize: 16,
              fontWeight: 600,
              backgroundColor: theme.palette.PrimaryBlue[300],
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: theme.palette.PrimaryBlue[500],
              },
            }}
          >
            {t("지정 견적 요청하기")}
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}
