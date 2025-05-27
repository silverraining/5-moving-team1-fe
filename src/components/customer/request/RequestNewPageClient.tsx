// 작업확인용: step2하는중, zustand에 저장
// request/new/page.tsx에 렌더링되는 흐름을 정리한 파일
"use client";

import { useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Progress } from "../../shared/components/progress/progress";
import Step1_MoveType from "./steps/Step1_MoveType";
import Step2_MoveDate from "./steps/Step2_MoveDate";
import { useEstimateStore } from "@/src/store/requestStore";

export default function RequestNewPageClient() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 타입 선언
  const { moveType, moveDate, setMoveType, setMoveDate } = useEstimateStore();

  const handleSelectStep1 = (value: string) => {
    setMoveType(value);
    setStep(2);
  };

  const handleSelectStep2 = (formattedDate: string) => {
    setMoveDate(formattedDate);
    setStep(3);
  };

  console.log("지금 선택된 값들은?", moveType, moveDate);

  return (
    <>
      <Box sx={{ py: isSmall ? "24px" : "32px" }}>
        <Progress value={step} />
      </Box>
      <Box
        sx={{
          padding: "8px",
        }}
      >
        {step === 1 && <Step1_MoveType onSelect={handleSelectStep1} />}
        {step === 2 && (
          <Step2_MoveDate
            onSelect={handleSelectStep2}
            onBack={() => setStep(1)}
          />
        )}
        {/* {step === 3 && <Step3_StartLocation onSelect={(v) => updateField("startLocation", v)} />}
        {step === 4 && <Step4_EndLocation onSelect={(v) => updateField("endLocation", v)} />} */}
      </Box>
    </>
  );
}
