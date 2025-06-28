"use client";

import React from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { CardListMover } from "@/src/components/shared/components/card/CardListMover";
import { CardData } from "@/src/types/card";
import { useTranslation } from "react-i18next";

interface MoverListProps {
  movers: CardData[];
  loading: boolean;
  error: string | null;
  searchKeywordForEmptyMessage: string;
  isFetchingNextPage: boolean;
  loadMoreRef: React.Ref<HTMLDivElement>;
  onCardClick: (moverId?: string) => void;
}

export const MoverList = ({
  movers,
  loading,
  error,
  searchKeywordForEmptyMessage,
  isFetchingNextPage,
  loadMoreRef,
  onCardClick,
}: MoverListProps) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  const { t } = useTranslation();
  if (movers.length === 0) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" py={4}>
        <Image
          src="/Images/empty/no_data.svg"
          alt="검색 결과 없음"
          width={120}
          height={120}
        />
        <Typography variant="M_16" color="Grayscale.400" mt={2}>
          {searchKeywordForEmptyMessage
            ? `"${searchKeywordForEmptyMessage}"${t(
                "에 대한 검색 결과가 없습니다."
              )}`
            : t("등록된 기사님이 없습니다.")}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Stack spacing={4}>
        {movers.map((mover) => (
          <Box
            key={mover.id}
            onClick={() => onCardClick(mover.id)}
            sx={{ cursor: "pointer" }}
          >
            <CardListMover data={mover} />
          </Box>
        ))}
      </Stack>
      {/* 무한 스크롤 트리거 */}
      <div ref={loadMoreRef} style={{ height: 1 }} />
      {isFetchingNextPage && (
        <Box display="flex" justifyContent="center" py={2}>
          <CircularProgress size={32} />
        </Box>
      )}
    </>
  );
};
