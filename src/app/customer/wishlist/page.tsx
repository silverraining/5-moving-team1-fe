"use client";

import { useLikeList } from "@/src/api/like/hooks";
import {
  CardListSave,
  CardListSaveSkeleton,
} from "@/src/components/shared/components/card/CardListSave";
import { likeMoverListResItem } from "@/src/types/card";
import {
  EstimateOfferStatus,
  EstimateRequestStatus,
  ServiceType,
} from "@/src/types/common";
import { EstimateOffer } from "@/src/types/estimate";
import { Stack } from "@mui/material";

const Wishlist = () => {
  const { data, isLoading } = useLikeList();

  const transformLikeMoverToEstimateOffer = (
    item: likeMoverListResItem
  ): EstimateOffer => {
    return {
      estimateRequestId: "",
      moverId: item.id,
      price: 0,
      comment: "",
      status: EstimateOfferStatus.REQUESTED,
      requestStatus: EstimateRequestStatus.PENDING,
      confirmedCount: item.confirmed_estimate_count,
      isTargeted: false,
      isConfirmed: false,
      confirmedAt: undefined,
      completedAt: undefined,
      createdAt: new Date(),
      moveDate: new Date(),
      updatedAt: new Date(),
      moveType: "HOME",
      estimateRequest: undefined as any,
      mover: {
        id: item.id,
        nickname: item.nickname,
        imageUrl: item.imageUrl,
        experience: item.experience,
        serviceType: Object.keys(item.serviceType).filter(
          (key) => item.serviceType[key as keyof typeof item.serviceType]
        ) as ServiceType[],
        reviewCount: item.review_count,
        averageRating: item.average_rating,
        likeCount: item.likeCount,
        userId: "",
        intro: "",
        rating: 0,
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        confirmedCount: 0,
        serviceRegions: [],
        isLiked: true,
      },
      review: undefined as any,
      fromAddress: undefined as any,
      toAddress: undefined as any,
      fromAddressMinimal: undefined as any,
      toAddressMinimal: undefined as any,
    };
  };

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
        : transformedData?.map((mover, idx: number) => (
            <Stack key={idx}>
              <CardListSave
                data={mover}
                onClick={() => console.log(mover.moverId)}
              />
            </Stack>
          ))}
    </Stack>
  );
};
export default Wishlist;
