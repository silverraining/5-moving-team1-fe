"use client";

import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CardListProfileWrapper from "@/src/components/mover/mypage/CardListProfileWrapper";
import { CardData } from "@/src/types/card";

interface MyPageProfileSectionProps {
  data: CardData;
}

export const MyPageProfileSection = ({ data }: MyPageProfileSectionProps) => {
  const theme = useTheme();

  return (
    <Box width="100%" display="flex" justifyContent="center" mb="32px">
      <Box width="100%" maxWidth="1400px" px="24px">
        <Typography variant="SB_24" mb="32px">
          마이페이지
        </Typography>
        <CardListProfileWrapper data={data} />
        <Divider
          sx={{
            width: "100%",
            borderColor: theme.palette.Line[100],
            borderWidth: "1px",
            mt: "32px",
          }}
        />
      </Box>
    </Box>
  );
};
