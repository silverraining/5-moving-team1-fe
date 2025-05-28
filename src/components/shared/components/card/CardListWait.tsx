import { Box, Button, Typography } from "@mui/material";
import { ChipCategory } from "../chip/ChipCategory";
import { CardData } from "@/src/types/card";
import Image from "next/image";

import { formatKoreanDate } from "@/src/lib/formatKoreanDate";

interface CardProps {
  data: CardData;
  onLikeClick?: () => void;
  onConfirmClick?: () => void;
  onDetailClick?: () => void;
}

export const CardListWait = ({
  data,
  onLikeClick,
  onConfirmClick,
  onDetailClick,
}: CardProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid #F2F2F2"
      maxWidth={"688px"}
      minWidth={"327px"}
      width={"100%"}
      gap={["0px", "0px", "14px"]}
      maxHeight={"440px"}
      minHeight={"362px"}
      height={"100%"}
      bgcolor="#FFFFFF"
      borderRadius="16px"
      padding={[
        "20px 12px 14px 12px",
        "22px 12px 16px 12px",
        "28px 24px 22px 24px",
      ]}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
      boxSizing={"border-box"}
    >
      <Box>
        <Box display="flex" flexDirection="row" gap={["8px", "12px"]}>
          {data.types.map((type, index) => (
            <ChipCategory key={index} type={type} />
          ))}
        </Box>
      </Box>

      <Box
        display="flex"
        border="1px solid #F2F2F2"
        bgcolor="#FFFFFF"
        padding={["16px", "10px", "16px 10px"]}
        boxShadow="4px 4px 16px 0px #E9E9E91A"
        gap={["12px", "12px", "24px"]}
        borderRadius={"6px"}
      >
        <Box width={[46, 46, 56]} height={[46, 46, 56]} position="relative">
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
                fontSize: [14, 14, 18],
                lineHeight: ["24px", "24px", "26px"],
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
                    ? "/images/like/like.svg"
                    : "/images/like/unlike.svg"
                }
                alt="좋아요 버튼"
                width={24}
                height={24}
                onClick={onLikeClick}
                style={{ cursor: "pointer" }}
              />
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 18],
                  lineHeight: ["22px", "22px", "26px"],
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
            gap={"9.5px"}
            alignItems="center"
            flexGrow={1}
            justifyContent={["space-between", "flex-start"]}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Image
                src="/images/star/star_active.svg"
                alt="별점 사진"
                width={20}
                height={20}
              />
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {data.rating}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                })}
              >
                ({data.count})
              </Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            <Box display="flex">
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                })}
              >
                경력
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {data.career}년
              </Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            <Box display="flex">
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {data.confirm}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                })}
              >
                확정
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={["8px", "16px", "24px"]}
      >
        <Box
          display={"flex"}
          flexDirection={["column", "column", "row"]}
          gap={["14px", "14px", "24px"]}
          alignItems={["flex-start", "flex-start", "center"]}
          flexWrap={"nowrap"}
        >
          <Box
            display={"flex"}
            gap={["8px", "8px", "12px"]}
            alignItems={"center"}
          >
            <Box
              bgcolor="#F4F7FB"
              borderRadius="4px"
              display={"inline-block"}
              padding={["2px 6px", "2px 6px", "4px 6px"]}
            >
              <Typography
                sx={(theme) => ({
                  fontSize: [14, 14, 18],
                  lineHeight: ["24px", "24px", "26px"],
                  fontWeight: [500, 500, 400],
                  color: theme.palette.Grayscale[400],
                  whiteSpace: "nowrap",
                })}
              >
                이사일
              </Typography>
            </Box>
            <Typography
              sx={(theme) => ({
                fontSize: [14, 14, 18],
                lineHeight: ["24px", "24px", "26px"],
                fontWeight: 500,
                color: theme.palette.Black[300],
                wordBreak: "keep-all",
              })}
            >
              {formatKoreanDate(data.date ?? "")}
            </Typography>
          </Box>
          <Box
            display={["none", "none", "inline-block"]}
            height={14}
            border={"1px solid #E6E6E6"}
          ></Box>
          <Box
            display={"flex"}
            gap={["8px", "8px", "12px"]}
            alignItems={"center"}
          >
            <Box
              display={"flex"}
              gap={["8px", "8px", "12px"]}
              alignItems={"center"}
            >
              <Box
                bgcolor="#F4F7FB"
                borderRadius="4px"
                display={"inline-block"}
                padding={["2px 6px", "2px 6px", "4px 6px"]}
              >
                <Typography
                  sx={(theme) => ({
                    fontSize: [14, 14, 18],
                    lineHeight: ["24px", "24px", "26px"],
                    fontWeight: [500, 500, 400],
                    color: theme.palette.Grayscale[400],
                    whiteSpace: "nowrap",
                  })}
                >
                  출발
                </Typography>
              </Box>
              <Typography
                sx={(theme) => ({
                  fontSize: [14, 14, 18],
                  lineHeight: ["24px", "24px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                  wordBreak: "keep-all",
                })}
              >
                {data.from}
              </Typography>
            </Box>
            <Box height={14} border={"1px solid #E6E6E6"}></Box>
            <Box
              border={"1px solid ##E6E6E6"}
              height={["14px", "14px", "16px"]}
            ></Box>
            <Box
              display={"flex"}
              gap={["8px", "8px", "12px"]}
              alignItems={"center"}
            >
              <Box
                bgcolor="#F4F7FB"
                borderRadius="4px"
                display={"inline-block"}
                padding={["2px 6px", "2px 6px", "4px 6px"]}
              >
                <Typography
                  sx={(theme) => ({
                    fontSize: [14, 14, 18],
                    lineHeight: ["24px", "24px", "26px"],
                    fontWeight: [500, 500, 400],
                    color: theme.palette.Grayscale[400],
                    whiteSpace: "nowrap",
                  })}
                >
                  도착
                </Typography>
              </Box>
              <Typography
                sx={(theme) => ({
                  fontSize: [14, 14, 18],
                  lineHeight: ["24px", "24px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                  wordBreak: "keep-all",
                })}
              >
                {data.to}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          gap={["8px", "8px", "16px"]}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Typography
            sx={(theme) => ({
              fontSize: [14, 14, 18],
              lineHeight: ["24px", "24px", "26px"],
              fontWeight: 500,
              color: theme.palette.Black[400],
            })}
          >
            견적 금액
          </Typography>
          <Typography
            sx={(theme) => ({
              fontSize: [18, 18, 24],
              lineHeight: ["26px", "26px", "32px"],
              fontWeight: 700,
              color: theme.palette.Black[400],
            })}
          >
            {(data.cost ?? 0).toLocaleString()}원
          </Typography>
        </Box>
        <Box
          display={"flex"}
          gap={["8px", "8px", "11px"]}
          flexDirection={["column", "row", "row"]}
        >
          <Button
            onClick={onConfirmClick}
            variant="contained"
            sx={(theme) => ({
              height: [48, 48, 64],
              bgcolor: theme.palette.PrimaryBlue[300],
              borderRadius: ["8px", "8px", "16px"],
              flex: "1",
            })}
          >
            <Typography
              sx={(theme) => ({
                fontSize: [16, 16, 20],
                lineHeight: ["26px", "26px", "32px"],
                fontWeight: 600,
                color: theme.palette.White[100],
                wordBreak: "keep-all",
              })}
            >
              견적 확정하기
            </Typography>
          </Button>
          <Button
            onClick={onDetailClick}
            variant="outlined"
            sx={(theme) => ({
              height: [48, 48, 64],
              borderRadius: ["8px", "8px", "16px"],
              border: `1px solid ${theme.palette.PrimaryBlue[300]}`,
              flex: "1",
            })}
          >
            <Typography
              sx={(theme) => ({
                fontSize: [16, 16, 20],
                lineHeight: ["26px", "26px", "32px"],
                fontWeight: 600,
                color: theme.palette.PrimaryBlue[300],
              })}
            >
              상세보기
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
