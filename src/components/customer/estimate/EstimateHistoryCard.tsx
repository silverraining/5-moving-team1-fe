"use client";
import { Skeleton, Stack } from "@mui/material";

export const EstimateHistoryCardSkeleton = () => {
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
