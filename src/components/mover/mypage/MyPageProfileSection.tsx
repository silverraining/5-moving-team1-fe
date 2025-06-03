"use client";
import { Box } from "@mui/material";
import CardListProfileWrapper from "@/src/components/mover/mypage/CardListProfileWrapper";
import { CardData } from "@/src/types/card";

interface MyPageProfileSectionProps {
  data: CardData;
}

export const MyPageProfileSection = ({ data }: MyPageProfileSectionProps) => {
  return (
    <Box mb="32px">
      <CardListProfileWrapper data={data} />
    </Box>
  );
};
