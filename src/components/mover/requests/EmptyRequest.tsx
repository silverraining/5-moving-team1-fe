import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function EmptyRequest() {
  return (
    <Box>
      <Image
        src="/Images/empty/no_data.svg"
        alt="데이터 없음"
        width={300}
        height={300}
        className="mb-6"
      />
      <Typography>아직 받은 요청이 없어요!</Typography>
    </Box>
  );
}
