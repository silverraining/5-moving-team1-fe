import { Box, Typography } from "@mui/material";
import { ChipCategory, ChipProps } from "../chip/ChipCategory";
import Image from "next/image";

interface CardData {
  types: ChipProps["type"][];
  message?: string;
  imgSrc: string;
  name: string;
  like: number;
  rating: number;
  count: number;
  career: number;
  confirm: number;
  isLiked: boolean;
  cost: number;
}

interface CardProps {
  data: CardData;
  onLikeClick?: () => void;
}

export const ChipArea = ({ data, onLikeClick }: CardProps) => {
  const {
    types,
    message = "고객님의 물품을 안전하게 운송해 드립니다.",
    imgSrc,
    name,
    like,
    rating,
    count,
    career,
    confirm,
    isLiked = false,
    cost,
  } = data;

  return (
    <Box display="flex" flexWrap="wrap" gap={1}>
      <Box>
        <Box>
          {types.map((type, index) => (
            <ChipCategory key={index} type={type} />
          ))}
        </Box>
        <Typography>{message}</Typography>
      </Box>

      {/* 아래 */}
      <Box>
        <Box>
          <Image src={imgSrc} alt={"프로필 사진"} width={80} height={80} />
        </Box>
        <Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>{name} 기사님</Typography>
            <Image
              src={
                isLiked ? "/images/like/like.svg" : "/images/like/unlike.svg"
              }
              alt="좋아요 버튼"
              width={24}
              height={24}
              onClick={onLikeClick}
              style={{ cursor: "pointer" }}
            />
            <Typography>{like}</Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Image
                src="/images/star/star.svg"
                alt="별점 사진"
                width={16}
                height={16}
              />
              <Typography>{rating}</Typography>
              <Typography>({count})</Typography>
            </Box>
            <Box>
              <Typography>경력</Typography>
              <Typography>{career}년</Typography>
            </Box>
            <Box>
              <Typography>{confirm}</Typography>
              <Typography>확정</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography>견적 금액</Typography>
        <Typography>{cost}</Typography>
      </Box>
    </Box>
  );
};
