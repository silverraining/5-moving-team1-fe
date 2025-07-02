"use client";
import { useEstimateRequestCancle } from "@/src/api/customer/hook";
import { useSnackbar } from "@/src/hooks/snackBarHooks";
import { PATH } from "@/src/lib/constants";
import { typeMapper } from "@/src/lib/typeMapper";
import { Address } from "@/src/types/common";
import { EstimateOffer } from "@/src/types/estimate";
import { Button, Skeleton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EstimateRequestCardProps {
  requestData: {
    customerName: string;
    estimateOffers: EstimateOffer[];
    fromAddress: Address;
    toAddress: Address;
    isTargeted: false;
    moveType: string;
    offerCount: number;
    requestId: string;
    requestStatus: string;
    moveDate: string;
    createdAt: string;
  };
}

export const EstimateRequestCard = ({
  requestData,
}: EstimateRequestCardProps) => {
  const { openSnackbar } = useSnackbar();
  const { mutate, isPending } = useEstimateRequestCancle();
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();
  const hendleClickCancle = () => {
    mutate(requestData.requestId, {
      onSuccess: () => {
        openSnackbar("견적 요청이 성공적으로 취소되었습니다.", "success", 1000);
        setIsNavigating(true);
        router.push(PATH.userRequest);
      },
      onError: (error) => {
        openSnackbar("취소 실패", "error", 1000);
      },
    });
  };
  return (
    <Stack
      direction={["column", "row", "row"]}
      alignItems={"start"}
      justifyContent={"space-between"}
      sx={(theme) => ({
        p: 4,
        borderRadius: 2,
        bgcolor: theme.palette.NeutralGray[100],
        gap: 2,
      })}
    >
      <Stack sx={{ gap: 2 }}>
        <TextSection
          title={"견적 요청일"}
          description={dayjs(requestData.createdAt).format("YYYY.MM.DD")}
        />
        <TextSection
          title={"서비스"}
          description={typeMapper([requestData.moveType]).join("")}
        />
        <TextSection
          title={"이용일"}
          description={dayjs(requestData.moveDate).format("YYYY.MM.DD")}
        />
        <TextSection
          title={"출발지"}
          description={requestData.fromAddress.fullAddress}
        />
        <TextSection
          title={"도착지"}
          description={requestData.toAddress.fullAddress}
        />
      </Stack>
      <Button
        loading={isPending || isNavigating}
        loadingPosition="start"
        onClick={hendleClickCancle}
        variant="contained"
        sx={(theme) => ({
          [theme.breakpoints.down("tablet")]: { width: "100%" },
          borderRadius: 2,
        })}
      >
        견적 요청 취소
      </Button>
    </Stack>
  );
};

const TextSection = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Stack display={"flex"} direction={"row"}>
      <Typography
        sx={(theme) => ({ width: 100, color: theme.palette.Grayscale[300] })}
      >
        {title}
      </Typography>
      <Typography sx={(theme) => ({ color: theme.palette.Black[200] })}>
        {description}
      </Typography>
    </Stack>
  );
};

export const EstimateRequestCardSkeleton = () => {
  return (
    <Stack
      direction={["column", "row", "row"]}
      alignItems={"start"}
      justifyContent={"space-between"}
      sx={(theme) => ({
        p: 4,
        borderRadius: 2,
        bgcolor: theme.palette.NeutralGray[100],
        gap: 2,
      })}
    >
      <Stack sx={{ gap: 2 }}>
        <TextSectionSkeleton />
        <TextSectionSkeleton />
        <TextSectionSkeleton />
        <TextSectionSkeleton />
        <TextSectionSkeleton />
      </Stack>

      <Skeleton
        variant="rounded"
        width={120}
        height={40}
        sx={(theme) => ({
          [theme.breakpoints.down("tablet")]: { width: "100%" },
          borderRadius: 2,
        })}
      />
    </Stack>
  );
};

const TextSectionSkeleton = () => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Skeleton variant="text" width={100} height={24} />
      <Skeleton variant="text" width={200} height={24} />
    </Stack>
  );
};
