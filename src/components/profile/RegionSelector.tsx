import { Box, Stack } from "@mui/material";
import { ChipArea } from "../shared/components/chip/ChipArea";

interface RegionSelectorProps {
  selectedRegions: string[];
  onRegionToggle: (region: string) => void;
}

const regions = [
  // 첫 번째 줄
  ["서울", "경기", "인천", "강원", "충북"],
  // 두 번째 줄
  ["충남", "세종", "대전", "전북", "전남"],
  // 세 번째 줄
  ["광주", "경북", "경남", "대구", "울산"],
  // 네 번째 줄
  ["부산", "제주"],
];

export const RegionSelector = ({
  selectedRegions,
  onRegionToggle,
}: RegionSelectorProps) => {
  return (
    <Stack spacing={"18px"}>
      {regions.map((regionRow, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {regionRow.map((region) => {
            const isSelected = selectedRegions.includes(region);
            return (
              <ChipArea
                key={region}
                label={region}
                selected={isSelected}
                onClick={() => onRegionToggle(region)}
              />
            );
          })}
        </Box>
      ))}
    </Stack>
  );
};
