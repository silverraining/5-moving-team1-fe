import { PATH } from "@/src/lib/constants";
import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface EmptyReviewProps {
  variation?: "complete" | "pending";
  text: string;
}

export const EmptyReview = ({
  variation = "pending",
  text,
}: EmptyReviewProps) => {
  const { t } = useTranslation();
  return (
    <Stack
      gap={4}
      alignItems={"center"}
      justifyContent="center" // 수직 중앙 정렬
      minHeight="60vh" // 화면의 60% 높이 확보
      textAlign="center"
    >
      <Image
        width={184}
        height={136}
        src={"/Images/empty.svg"}
        alt="emptyImg"
      />
      <Typography
        variant="R_24"
        sx={(theme) => ({ color: theme.palette.Grayscale[400] })}
      >
        {text}
      </Typography>
      {variation === "complete" && (
        <Link href={PATH.userReviewPending}>
          <Button variant="contained" sx={{ padding: 2 }}>
            <Typography variant="SB_20">{t("리뷰 작성하러 가기")}</Typography>
          </Button>
        </Link>
      )}
    </Stack>
  );
};
