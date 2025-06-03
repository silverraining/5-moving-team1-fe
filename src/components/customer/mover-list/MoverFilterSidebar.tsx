"use client";
import { Box, Typography } from "@mui/material";
import DropDownWrapper from "@/src/components/shared/components/drop-down/filter-drop-down/DropDownWrapper";
{
  /* TODO: 초기화 클릭시 필터 초기화 구현 필요 -> hooks */
}
export const MoverFilterSidebar = () => {
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
        <Typography variant="M_20">필터</Typography>
        <Typography
          variant="M_16"
          sx={(theme) => ({
            color: theme.palette.Grayscale[300],
            cursor: "pointer",
          })}
        >
          초기화
        </Typography>
      </Box>
      {/* TODO: 지역 선택 filter 적용 */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Typography variant="SB_18">지역을 선택해주세요</Typography>
          <DropDownWrapper type="region" label="지역" />
        </Box>
        {/* TODO: 서비스 선택 filter , AIP 연결 */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Typography variant="SB_18">어떤 서비스가 필요하세요?</Typography>
          <DropDownWrapper type="service" label="서비스" />
        </Box>
      </Box>
    </Box>
  );
};
