"use client";
import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import TextField from "@/src/components/shared/components/text-field";
import SortDropdown from "@/src/components/shared/components/drop-down/SortDropdown";
import DropDownWrapper from "@/src/components/shared/components/drop-down/filter-drop-down/DropDownWrapper";
import { SORT_OPTIONS } from "@/src/lib/constants";
import { useTranslation } from "react-i18next";

interface Props {
  searchKeyword: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClear: () => void;
  selectedRegion?: string;
  selectedServiceType?: string;
  selectedSort?: string;
  onRegionChange?: (region: string) => void;
  onServiceTypeChange?: (serviceType: string) => void;
  onSortChange?: (sort: string) => void;
}

export const MoverCardList = ({
  searchKeyword,
  onSearchChange,
  onSearchClear,
  selectedRegion,
  selectedServiceType,
  selectedSort,
  onRegionChange,
  onServiceTypeChange,
  onSortChange,
}: Props) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("desktop"));

  const handleSortChange = (option: { value: string; label: string }) => {
    onSortChange?.(option.value);
  };

  const currentSortOption =
    SORT_OPTIONS.find((opt) => opt.value === selectedSort) || SORT_OPTIONS[0];
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "955px",
        display: "flex",
        flexDirection: "column",
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        {/* 왼쪽: 지역, 서비스 드롭다운 (태블릿 이하에서만) */}
        {isTablet && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <DropDownWrapper
              type="region"
              label={t("지역")}
              forceMobileSize={isTablet}
              selectedValue={selectedRegion}
              onSelect={onRegionChange}
            />
            <DropDownWrapper
              type="service"
              label={t("서비스")}
              forceMobileSize={isTablet}
              selectedValue={selectedServiceType}
              onSelect={onServiceTypeChange}
            />
          </Box>
        )}

        {/* 오른쪽: 정렬 드롭다운 */}
        <Box sx={{ marginLeft: isTablet ? 0 : "auto" }}>
          <SortDropdown
            defaultOption={currentSortOption}
            options={SORT_OPTIONS}
            onChange={handleSortChange}
          />
        </Box>
      </Box>

      <Box>
        <TextField.Search
          variation="left"
          value={searchKeyword}
          onChange={onSearchChange}
          onDeleteClick={onSearchClear}
          placeholder={t("기사님 이름, 지역, 서비스 종류 등으로 검색")}
          sx={{ flex: 1, minWidth: { xs: "100%", md: "300px" } }}
        />
      </Box>
    </Box>
  );
};
