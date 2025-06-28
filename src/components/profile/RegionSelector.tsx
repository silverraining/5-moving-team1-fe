import { Box, Stack } from "@mui/material";
import { ChipArea } from "../shared/components/chip/ChipArea";
import { ServiceRegion } from "@/src/types/common";
import { useTranslation } from "react-i18next";

interface RegionSelectorProps {
  selectedRegions: ServiceRegion[];
  onRegionToggle: (region: ServiceRegion) => void;
}
const { t } = useTranslation();
export const regionLabels: Record<ServiceRegion, string> = {
  [ServiceRegion.SEOUL]: t("서울"),
  [ServiceRegion.GYEONGGI]: t("경기"),
  [ServiceRegion.INCHEON]: t("인천"),
  [ServiceRegion.GANGWON]: t("강원"),
  [ServiceRegion.CHUNGBUK]: t("충북"),
  [ServiceRegion.CHUNGNAM]: t("충남"),
  [ServiceRegion.SEJONG]: t("세종"),
  [ServiceRegion.DAEJEON]: t("대전"),
  [ServiceRegion.JEONBUK]: t("전북"),
  [ServiceRegion.JEONNAM]: t("전남"),
  [ServiceRegion.GWANGJU]: t("광주"),
  [ServiceRegion.GYEONGBUK]: t("경북"),
  [ServiceRegion.GYEONGNAM]: t("경남"),
  [ServiceRegion.DAEGU]: t("대구"),
  [ServiceRegion.ULSAN]: t("울산"),
  [ServiceRegion.BUSAN]: t("부산"),
  [ServiceRegion.JEJU]: t("제주"),
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
