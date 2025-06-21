import { Box, Stack } from "@mui/material";
import { ChipArea } from "../shared/components/chip/ChipArea";
import { ServiceRegion } from "@/src/types/common";

interface RegionSelectorProps {
  selectedRegions: ServiceRegion[];
  onRegionToggle: (region: ServiceRegion) => void;
}

export const regionLabels: Record<ServiceRegion, string> = {
  [ServiceRegion.SEOUL]: "서울",
  [ServiceRegion.GYEONGGI]: "경기",
  [ServiceRegion.INCHEON]: "인천",
  [ServiceRegion.GANGWON]: "강원",
  [ServiceRegion.CHUNGBUK]: "충북",
  [ServiceRegion.CHUNGNAM]: "충남",
  [ServiceRegion.SEJONG]: "세종",
  [ServiceRegion.DAEJEON]: "대전",
  [ServiceRegion.JEONBUK]: "전북",
  [ServiceRegion.JEONNAM]: "전남",
  [ServiceRegion.GWANGJU]: "광주",
  [ServiceRegion.GYEONGBUK]: "경북",
  [ServiceRegion.GYEONGNAM]: "경남",
  [ServiceRegion.DAEGU]: "대구",
  [ServiceRegion.ULSAN]: "울산",
  [ServiceRegion.BUSAN]: "부산",
  [ServiceRegion.JEJU]: "제주",
};

const regions: ServiceRegion[][] = [
  /* 첫 번째 줄
  서울, 경기, 인천, 강원, 충북 */
  [
    ServiceRegion.SEOUL,
    ServiceRegion.GYEONGGI,
    ServiceRegion.INCHEON,
    ServiceRegion.GANGWON,
    ServiceRegion.CHUNGBUK,
  ],
  /* 두 번째 줄
  충남, 세종, 대전, 전북, 전남 */
  [
    ServiceRegion.CHUNGNAM,
    ServiceRegion.SEJONG,
    ServiceRegion.DAEJEON,
    ServiceRegion.JEONBUK,
    ServiceRegion.JEONNAM,
  ],
  /* 세 번째 줄
  광주, 경북, 경남, 대구, 울산 */
  [
    ServiceRegion.GWANGJU,
    ServiceRegion.GYEONGBUK,
    ServiceRegion.GYEONGNAM,
    ServiceRegion.DAEGU,
    ServiceRegion.ULSAN,
  ],
  /* 네 번째 줄
  부산, 제주 */
  [ServiceRegion.BUSAN, ServiceRegion.JEJU],
];

export const RegionSelector = ({
  selectedRegions,
  onRegionToggle,
}: RegionSelectorProps) => {
  return (
    <Stack spacing={"18px"} width={"450px"}>
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
                label={regionLabels[region]}
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
