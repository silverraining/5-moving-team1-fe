"use client";

import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CardListProfileWrapper from "@/src/components/mover/mypage/CardListProfileWrapper";

import { MoverProfileCardData } from "@/src/api/mover/api";
import { useTranslation } from "react-i18next";

interface MyPageProfileSectionProps {
  data: MoverProfileCardData;
}

export const MyPageProfileSection = ({ data }: MyPageProfileSectionProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Box width="100%" display="flex" justifyContent="center" mb="32px">
      <Box
        width="100%"
        px="16px"
        sx={{
          mx: "auto",
        }}
      >
        <Typography variant="SB_24">{t("마이페이지")}</Typography>
        <Box mt="32px" mx="0">
          <CardListProfileWrapper data={data} />
        </Box>
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
