"use client";

import { useMoverList } from "@/src/api/customer/hook";
import {
  CardListSave,
  CardListSaveSkeleton,
} from "@/src/components/shared/components/card/CardListSave";
import { MoverProfile } from "@/src/types/auth";
import { CardData, ChipProps } from "@/src/types/card";
import { ServiceRegion } from "@/src/types/common";
import { Stack } from "@mui/material";

const Wishlist = () => {
  const { data, isLoading } = useMoverList({});
  const mapMoverProfileToCardData = (mover: MoverProfile): CardData => {
    return {
      types: mover.serviceType.map((type) =>
        type.toLowerCase()
      ) as ChipProps["type"][],
      imgSrc: mover.imageUrl,
      name: mover.nickname,
      like: 0,
      rating: mover.averageRating,
      count: mover.reviews?.length ?? 0,
      career: mover.experience,
      confirm: mover.confirmedCount,
      isLiked: false,
      address: mover.serviceRegions.map(
        (region) =>
          ServiceRegion[region.toUpperCase() as keyof typeof ServiceRegion]
      ),
    };
  };
  const cardDataList: CardData[] = data?.map(mapMoverProfileToCardData);
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
        : cardDataList?.map((mover: CardData, idx: number) => (
            <Stack key={idx}>
              <CardListSave
                data={mover}
                onClick={() => console.log(mover.name)}
              />
            </Stack>
          ))}
    </Stack>
  );
};
export default Wishlist;
