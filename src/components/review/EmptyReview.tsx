import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface EmprtyReviewProps {
  variation?: "complete" | "pending";
  text: string;
}

export const EmprtyReview = ({
  variation = "pending",
  text,
}: EmprtyReviewProps) => {
  return (
    <Stack pt={"104px"} gap={4} alignItems={"center"}>
      <Image
        width={184}
        height={136}
        src={"/images/empty.svg"}
        alt="emptyImg"
      />
      <Typography
        variant="R_24"
        sx={(theme) => ({ color: theme.palette.Grayscale[400] })}
      >
        {text}
      </Typography>
      {variation === "complete" && (
        <Button variant="contained" sx={{ padding: 2 }}>
          <Typography variant="SB_20">리뷰 작성하러 가기</Typography>
        </Button>
      )}
    </Stack>
  );
};
