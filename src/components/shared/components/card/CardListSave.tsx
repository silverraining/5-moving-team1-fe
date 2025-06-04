import { Box, BoxProps, Skeleton, Typography } from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import { CardData } from "@/src/types/card";
import Image from "next/image";
import { useResponsiveValue } from "@/src/hooks/useResponsiveValue";
interface CardProps extends BoxProps {
  data: CardData;
  onLikeClick?: () => void;
  forceMobileSize?: boolean;
}

export const CardListSave = ({
  data,
  onLikeClick,
  forceMobileSize = false,
  ...props
}: CardProps) => {
  const responsive = useResponsiveValue(forceMobileSize);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid #F2F2F2"
      width={responsive([327, 600, 688])}
      height="auto"
      bgcolor="#FFFFFF"
      borderRadius="16px"
      padding={responsive(["16px 14px", "16px 14px", "20px 24px"])}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
      boxSizing={"border-box"}
      sx={(theme) => ({
        transition:
          "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          boxShadow: theme.shadows[4],
          borderColor: theme.palette.grey[400],
        },
      })}
      {...props}
    >
      <Box>
        <Box
          display="flex"
          flexDirection="row"
          gap={responsive(["8px", "12px", "12px"])}
        >
          {data.types.map((type, index) => (
            <ChipCategory
              key={index}
              type={type}
              forceMobileSize={forceMobileSize}
            />
          ))}
        </Box>
      </Box>
      <Typography
        sx={(theme) => ({
          fontSize: responsive([14, 14, 18]),
          lineHeight: responsive(["24px", "24px", "26px"]),
          fontWeight: 600,
          color: theme.palette.Black[300],
          paddingY: responsive(["10px", "10px", "16px"]),
        })}
      >
        {data.message}
      </Typography>
      {/* 아래 */}
      <Box
        display="flex"
        border="1px solid #F2F2F2"
        bgcolor="#FFFFFF"
        padding={responsive(["10px", "10px", "16px 18px"])}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={responsive(["12px", "12px", "24px"])}
        borderRadius="6px"
      >
        <Box
          width={responsive([46, 46, 56])}
          height={responsive([46, 46, 56])}
          position="relative"
        >
          <Image
            src={data.imgSrc}
            alt={"프로필 이미지"}
            fill
            style={{
              overflow: "hidden",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              sx={(theme) => ({
                fontSize: responsive([14, 14, 18]),
                lineHeight: responsive(["24px", "24px", "26px"]),
                fontWeight: 600,
                color: theme.palette.Black[300],
              })}
            >
              {data.name} 기사님
            </Typography>
            <Box display="flex" alignItems="center">
              <Image
                src={
                  data.isLiked
                    ? "/Images/like/like.svg"
                    : "/Images/like/unlike.svg"
                }
                alt="좋아요 버튼"
                width={24}
                height={24}
                onClick={onLikeClick}
                style={{ cursor: "pointer" }}
              />
              <Typography
                sx={(theme) => ({
                  fontSize: responsive([13, 13, 18]),
                  lineHeight: responsive(["22px", "22px", "26px"]),
                  fontWeight: 500,
                  color: theme.palette.PrimaryBlue[400],
                })}
              >
                {data.like}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="9.5px"
            alignItems="center"
            flexGrow={1}
            justifyContent={responsive([
              "space-between",
              "flex-start",
              "flex-start",
            ])}
          >
            {/* 별점 */}
            <Box display="flex" alignItems="center" gap="4px">
              <Image
                src="/Images/star/star_active.svg"
                alt="별점"
                width={20}
                height={20}
              />
              <Typography
                sx={(theme) => ({
                  fontSize: responsive([13, 13, 16]),
                  lineHeight: responsive(["22px", "22px", "26px"]),
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {data.rating}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: responsive([13, 13, 16]),
                  lineHeight: responsive(["22px", "22px", "26px"]),
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                })}
              >
                ({data.count})
              </Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            {/* 경력 */}
            <Box display="flex" gap="4px">
              <Typography
                sx={(theme) => ({
                  fontSize: responsive([13, 13, 16]),
                  lineHeight: responsive(["22px", "22px", "26px"]),
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                  whiteSpace: "nowrap",
                })}
              >
                경력
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: responsive([13, 13, 16]),
                  lineHeight: responsive(["22px", "22px", "26px"]),
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                  whiteSpace: "nowrap",
                })}
              >
                {data.career}년
              </Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            {/* 확정 */}
            <Box display="flex" gap="4px">
              <Typography
                sx={(theme) => ({
                  fontSize: responsive([13, 13, 16]),
                  lineHeight: responsive(["22px", "22px", "26px"]),
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                  whiteSpace: "nowrap",
                })}
              >
                {data.confirm}건
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: responsive([13, 13, 16]),
                  lineHeight: responsive(["22px", "22px", "26px"]),
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                  whiteSpace: "nowrap",
                })}
              >
                확정
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export const CardListSaveSkeleton = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid #F2F2F2"
      width={[327, 600, 688]}
      height={[150, 150, 202]}
      bgcolor="#FFFFFF"
      borderRadius="16px"
      padding={["16px 14px", "16px 14px", "20px 24px"]}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
      boxSizing="border-box"
    >
      {/* 상단 카테고리 */}
      <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
        {[...Array(2)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width={60}
            height={28}
            sx={{ borderRadius: "16px" }}
          />
        ))}
      </Box>

      {/* 하단 카드 본문 */}
      <Box
        display="flex"
        border="1px solid #F2F2F2"
        bgcolor="#FFFFFF"
        padding={["10px", "10px", "16px 18px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
        borderRadius={"6px"}
      >
        {/* 프로필 이미지 */}
        <Box width={[46, 46, 56]} height={[46, 46, 56]}>
          <Skeleton variant="circular" width="100%" height="100%" />
        </Box>

        {/* 텍스트 영역 */}
        <Box display="flex" flexDirection="column" flexGrow={1} gap={1}>
          <Box display="flex" justifyContent="space-between">
            <Skeleton width={120} height={24} />
            <Box display="flex" gap="4px">
              <Skeleton variant="circular" width={24} height={24} />
              <Skeleton width={20} height={24} />
            </Box>
          </Box>

          <Skeleton width="100%" height={20} />
        </Box>
      </Box>
    </Box>
  );
};
