"use client";

import { Box } from "@mui/material";
import { ChipArea } from "../shared/components/chip/ChipArea";

interface ServiceSelectorProps {
  selectedServices: string[];
  onServiceToggle: (service: string) => void;
}

const services = [
  { id: "small" as const, label: "소형이사" },
  { id: "home" as const, label: "가정이사" },
  { id: "office" as const, label: "사무실이사" },
];

export const ServiceSelector = ({
  selectedServices,
  onServiceToggle,
}: ServiceSelectorProps) => {
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
