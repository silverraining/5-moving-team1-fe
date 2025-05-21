import { Stack, Box } from "@mui/material";
import Image from "next/image";

interface StarsProps {
  score: number;
  isMedium: boolean;
}

export const Stars = ({ score, isMedium }: StarsProps) => {
  const active = "/images/star/star_active.svg";
  const nonActive = "/images/star/star.svg";
  const size = isMedium ? 24 : 48;
  const maxStars = 5;

  const starsFill = Array.from({ length: maxStars }, (_, i) => {
    const diff = score - i;
    if (diff >= 1) return 1;
    if (diff > 0) return diff;
    return 0;
  });

  return (
    <Stack direction="row" spacing={0.5} justifyContent="center">
      {starsFill.map((fill, i) => (
        <Box
          key={i}
          sx={{
            position: "relative",
            width: size,
            height: size,
            flexShrink: 0,
          }}
        >
          {/* 비활성 별 */}
          <Image
            src={nonActive}
            alt="empty star"
            width={size}
            height={size}
            unoptimized
            style={{ display: "block" }}
          />
          {/* 활성 별 (채워지는 부분만 보여줌) */}
          {fill > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: `${fill * size}px`,
                height: size,
                overflow: "hidden",
              }}
            >
              <Image
                src={active}
                alt="filled star"
                width={size}
                height={size}
                unoptimized
                style={{ display: "block" }}
              />
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  );
};
