"use client";

import { useLikeList } from "@/src/api/like/hooks";
import { EmptyReview } from "@/src/components/review/EmptyReview";
import {
  CardListSave,
  CardListSaveSkeleton,
} from "@/src/components/shared/components/card/CardListSave";
import { PATH } from "@/src/lib/constants";
import { likeMoverListResItem } from "@/src/types/card";
import {
  EstimateOfferStatus,
  EstimateRequestStatus,
  ServiceType,
} from "@/src/types/common";
import { EstimateOffer } from "@/src/types/estimate";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";

export const transformLikeMoverToEstimateOffer = (
  item: likeMoverListResItem
): EstimateOffer => {
  const activeServiceTypes = Object.entries(item.serviceType)
    .filter(([_, value]) => value)
    .map(([key]) => key as ServiceType);

  return {
    estimateRequestId: "",
    moverId: item.id,
    price: 0,
    comment: "",
    status: EstimateOfferStatus.PENDING,
    requestStatus: EstimateRequestStatus.PENDING,
    confirmedCount: item.confirmedEstimateCount,
    isTargeted: false,
    isConfirmed: false,
    confirmedAt: undefined,
    completedAt: undefined,
    createdAt: new Date(),
    moveDate: new Date(),
    updatedAt: new Date(),
    moveType: activeServiceTypes,
    estimateReques: undefined,
    mover: {
      id: item.id,
      nickname: item.nickname,
      imageUrl: item.imageUrl,
      experience: item.experience,
      serviceType: activeServiceTypes,
      reviewCount: item.reviewCount,
      averageRating: 0,
      likeCount: item.likeCount,
      userId: "",
      intro: "",
      rating: item.averageRating ?? 0,
      description: "",
      serviceRegion: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      confirmedCount: item.confirmedEstimateCount,
      isLiked: true,
    },
    review: undefined as any,
    fromAddress: undefined as any,
    toAddress: undefined as any,
    fromAddressMinimal: undefined as any,
    toAddressMinimal: undefined as any,
  };
};

const Wishlist = () => {
  const { data, isLoading } = useLikeList();
  const router = useRouter();

  if (!isLoading && (!data || data.length === 0)) {
    return <EmptyReview text="찜한 기사님이 없습니다" />;
  }

  const transformedData = data
    ? data.map((item) => transformLikeMoverToEstimateOffer(item))
    : [];

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      sx={{
        pt: ["16px", "24px", "24px"],
        rowGap: ["24px", "32px", "48px"],
        columnGap: "24px",
      }}
      justifyContent="center"
    >
      {isLoading
        ? Array.from({ length: 20 }).map((_, idx) => (
            <Stack key={idx}>
              <CardListSaveSkeleton />
            </Stack>
          ))
        : transformedData?.map((d, idx: number) => (
            <Stack key={idx}>
              <CardListSave
                data={d}
                onClick={() => router.push(PATH.moverDetail(d.mover.id))}
              />
            </Stack>
          ))}
    </Stack>
  );
};
export default Wishlist;
