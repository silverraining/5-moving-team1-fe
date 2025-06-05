// src/components/shared/components/review-chart/components/star.tsx
import { Stack, Box } from "@mui/material";
import Image from "next/image";

interface ModalStarsProps {
  score: number;
  isMedium: boolean;
  editable?: boolean; // ⭐️ 변경됨: 입력 가능한 별인지 여부
  onChange?: (value: number) => void; // ⭐️ 변경됨: 클릭 시 호출되는 함수
}

export const ModalStar = ({
  score,
  isMedium,
  editable = false,
  onChange,
}: ModalStarsProps) => {
  const active = "/Images/star/star_active.svg";
  const nonActive = "/Images/star/star.svg";
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
          onClick={() => {
            if (editable && onChange) onChange(i + 1); // ⭐️ 변경됨: 별 클릭 시 점수 변경
          }}
          sx={{
            position: "relative",
            width: size,
            height: size,
            flexShrink: 0,
            cursor: editable ? "pointer" : "default", // ⭐️ 변경됨: editable이면 포인터 커서
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
