"use client";
import { EstimateOfferStatus } from "@/src/types/common";
import { Chip, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface LabelProps {
  status: EstimateOfferStatus;
}

export default function Label({ status }: LabelProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));
  const { t } = useTranslation();
  const isConfirmed = status === EstimateOfferStatus.CONFIRMED;
  return (
    <Chip
      label={t("확정하지 않은 견적이에요!")}
      icon={
        <Image
          src="/Images/alert/exclamation-mark.svg"
          alt="아이콘"
          width={isDesktop ? 24 : 16}
          height={isDesktop ? 24 : 16}
        />
      }
      sx={(theme) => ({
        display: isConfirmed ? "none" : "flex",
        paddingLeft: ["24px", "24px", "32px"],
        justifyContent: "flex-start",
        height: ["48px", "48px", "74px"],
        fontSize: [13, 13, 16],
        lineHeight: ["22px", "22px", "26px"],
        fontWeight: 600,
        border: "1px solid",
        borderRadius: "12px",
        backgroundColor: theme.palette.PrimaryBlue[100],
        borderColor: theme.palette.PrimaryBlue[200],
        color: theme.palette.PrimaryBlue[300],
      })}
    ></Chip>
  );
}
