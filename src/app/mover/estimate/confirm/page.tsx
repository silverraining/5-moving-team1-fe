import { Box } from "@mui/material";
import RequestEstimate from "@/src/components/mover/estimate/RequestEstimate";
import React from "react";

export default function QuoteTabs() {
  return (
    <Box>
      <RequestEstimate requestType="estimate" />
    </Box>
  );
}
