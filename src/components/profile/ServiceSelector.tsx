"use client";

import { Box } from "@mui/material";
import { ChipArea } from "../shared/components/chip/ChipArea";
import { ServiceType } from "@/src/types/common";
import { useTranslation } from "react-i18next";

interface ServiceSelectorProps {
  selectedServices: ServiceType[];
  onServiceToggle: (service: ServiceType) => void;
}

export const ServiceSelector = ({
  selectedServices,
  onServiceToggle,
}: ServiceSelectorProps) => {
  const { t } = useTranslation();

  const services: { id: ServiceType; label: string }[] = [
    { id: "SMALL", label: t("소형이사") },
    { id: "HOME", label: t("가정이사") },
    { id: "OFFICE", label: t("사무실이사") },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      {services.map((service) => {
        const isSelected = selectedServices.includes(service.id);
        return (
          <ChipArea
            key={service.id}
            label={service.label}
            selected={isSelected}
            onClick={() => onServiceToggle(service.id)}
          />
        );
      })}
    </Box>
  );
};
