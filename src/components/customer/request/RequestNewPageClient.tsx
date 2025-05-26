// request/new/page.tsx에 렌더링되는 흐름을 정리한 파일
"use client";

import { useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Progress } from "../../shared/components/progress/progress";
import Step1_MoveType from "./steps/Step1_MoveType";

export default function RequestNewPageClient() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    moveType: "",
    moveDate: "",
    startLocation: "",
    endLocation: "",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setStep((prev) => prev + 1);
  };
  return (
    <>
      <Box sx={{ py: isSmall ? "24x" : "32px" }}>
        <Progress value={step as 1 | 2 | 3 | 4} />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          padding: "8px",
        }}
      >
        {step === 1 && (
          <Step1_MoveType onSelect={(v) => updateField("moveType", v)} />
        )}
        {/* {step === 2 && <Step2_Date onSelect={(v) => updateField("moveDate", v)} />}
        {step === 3 && <Step3_StartLocation onSelect={(v) => updateField("startLocation", v)} />}
        {step === 4 && <Step4_EndLocation onSelect={(v) => updateField("endLocation", v)} />} */}
      </Box>
    </>
  );
}
