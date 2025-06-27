"use client";
import { Box, Typography } from "@mui/material";
import DropDownWrapper from "@/src/components/shared/components/drop-down/filter-drop-down/DropDownWrapper";
import { useTranslation } from "react-i18next";

interface MoverFilterSidebarProps {
  selectedRegion?: string;
  selectedServiceType?: string;
  searchKeyword?: string;
  onRegionChange?: (region: string) => void;
  onServiceTypeChange?: (serviceType: string) => void;
  onReset?: () => void;
}

export const MoverFilterSidebar = ({
  selectedRegion,
  selectedServiceType,
  searchKeyword,
  onRegionChange,
  onServiceTypeChange,
  onReset,
}: MoverFilterSidebarProps) => {
  const isFilterActive =
    selectedRegion !== "전체" ||
    selectedServiceType !== "전체" ||
    (searchKeyword && searchKeyword.trim() !== "");
  const { t } = useTranslation();
  return (
    <Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 10px",
          width: "328px",
          height: "64px",
          borderBottom: `1px solid ${theme.palette.Grayscale[100]}`,
          mb: "32px",
        })}
      >
        <Typography variant="M_20">{t("필터")}</Typography>
        <Typography
          variant="M_16"
          sx={(theme) => ({
            cursor: isFilterActive ? "pointer" : "default",
            textDecoration: isFilterActive ? "underline" : "none",
          })}
          onClick={isFilterActive ? onReset : undefined}
        >
          {t("초기화")}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Typography variant="SB_18">{t("지역을 선택해주세요")}</Typography>
          <DropDownWrapper
            type="region"
            label={t("지역")}
            selectedValue={selectedRegion}
            onSelect={onRegionChange}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Typography variant="SB_18">
            {t("어떤 서비스가 필요하세요?")}
          </Typography>
          <DropDownWrapper
            type="service"
            label={t("서비스")}
            selectedValue={selectedServiceType}
            onSelect={onServiceTypeChange}
          />
        </Box>
      </Box>
    </Box>
  );
};
