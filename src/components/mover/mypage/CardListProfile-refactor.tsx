import { Box, Button, Stack, Typography } from "@mui/material";
import { CardData } from "@/src/types/card";
import Image from "next/image";

import { joinAddress } from "@/src/lib/joinAddress";
import { typeMapper } from "@/src/lib/typeMapper";

interface CardProps {
  data: CardData;
  onMyClick?: () => void;
  onBasicClick?: () => void;
  buttonLabels?: {
    primary: React.ReactNode;
    secondary: React.ReactNode;
  };
  reverseButtons?: boolean;
}
/**
 * @file CardListProfile-refactor.tsx
 * @description
 * 기사님 소개 카드 컴포넌트
 * 기존 CardListProfile 컴포넌트 리팩토링함
 *
 */
export const CardListProfile = ({
  data,
  onMyClick,
  onBasicClick,
  buttonLabels,
  reverseButtons,
}: CardProps) => {
  const buttons = [
    <Button
      key="primary"
      onClick={onMyClick}
      variant="contained"
      sx={(theme) => ({
        width: ["100%", 296, 280],
        height: [48, 48, 64],
        bgcolor: theme.palette.PrimaryBlue[300],
        borderRadius: ["8px", "8px", "16px"],
      })}
    >
      <Typography
        sx={(theme) => ({
          fontSize: [16, 16, 20],
          lineHeight: ["26px", "26px", "32px"],
          fontWeight: 600,
          color: theme.palette.White[100],
        })}
      >
        {buttonLabels?.primary ?? "견적 보내기"}
      </Typography>
    </Button>,

    <Button
      key="secondary"
      onClick={onBasicClick}
      variant="outlined"
      sx={(theme) => ({
        width: ["100%", 296, 280],
        height: [48, 48, 64],
        borderRadius: ["8px", "8px", "16px"],
        border: `1px solid ${theme.palette.Grayscale[300]}`,
      })}
    >
      <Typography
        sx={(theme) => ({
          fontSize: [16, 16, 20],
          lineHeight: ["26px", "26px", "32px"],
          fontWeight: 600,
          color: theme.palette.Grayscale[300],
        })}
      >
        {buttonLabels?.secondary ?? "반려"}
      </Typography>
    </Button>,
  ];
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        bgcolor={"transparent"}
        gap={"10px"}
        width="100%"
        minWidth={["327px", "600px", "1000px"]}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          // width={[327, 600, 1200]}
          width="100%"
          borderRadius="16px"
          border="0.5px solid"
          padding={[
            "16px 14px 10px 14px",
            "16px 14px 10px 14px",
            "20px 24px 14px 24px",
          ]}
          boxSizing={"border-box"}
          sx={(theme) => ({
            backgroundColor: theme.palette.NeutralGray[100],
            borderColor: theme.palette.Grayscale[100],
          })}
        >
          {/* 이름, 소개 문구, 데스크탑 시 버튼 */}
          <Stack
            direction="row"
            spacing={["14px", "16px"]}
            mb="24px"
            justifyContent={["flex-start", "flex-start", "space-between"]}
          >
            <Box
              display={["inline-block", "inline-block", "none"]}
              width={[46, 46, 56]}
              height={[46, 46, 56]}
              position="relative"
            ></Box>
            <Box maxWidth={["80%", "80%", "45%"]}>
              <Typography
                sx={(theme) => ({
                  fontSize: [14, 14, 24],
                  lineHeight: ["24px", "24px", "32px"],
                  fontWeight: 600,
                  color: theme.palette.Black[300],
                })}
              >
                {data.name}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: [14, 14, 20],
                  lineHeight: ["24px", "24px", "32px"],
                  fontWeight: 400,
                  color: theme.palette.Grayscale[400],
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                })}
              >
                {data.message}
              </Typography>
            </Box>
            <Stack
              direction={["column", "row", "row"]}
              spacing={["8px", "8px", "11px"]}
              display={["none", "none", "flex"]}
              gap={["8px", "8px", "11px"]}
            >
              {reverseButtons ? [...buttons].reverse() : buttons}
            </Stack>
          </Stack>

          {/* 내부 박스 (이미지, 정보) */}
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap="20px"
            padding={["10px", "24px 18px"]}
            border="1px solid"
            borderRadius="6px"
            sx={(theme) => ({
              backgroundColor: theme.palette.NeutralGray[100],
              borderColor: theme.palette.Line[200],
              boxShadow: "4px 4px 16px 0px rgba(233, 233, 233, 0.1)",
            })}
          >
            {/* 1. 프로필 이미지 */}
            <Box
              width="80px"
              height="80px"
              position="relative"
              flexShrink={0}
              sx={{
                borderRadius: "100px",
                overflow: "hidden",
                backgroundColor: "#D9D9D9",
              }}
            >
              <Image
                src={data.imgSrc}
                alt="프로필 이미지"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* 2. 정보 영역 */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              flex={1}
            >
              {/* 별점, 경력, 확정 */}
              <Stack
                direction="row"
                spacing="16px"
                alignItems="center"
                justifyContent={["space-between", "flex-start"]}
                flexGrow={1}
              >
                {/* 평점 */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap="4px"
                >
                  <Image
                    src="/Images/star/star_active.svg"
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
                {/* Divider */}
                <Box height={14} border={"1px solid #E6E6E6"}></Box>
                {/* 경력 */}
                <Box display="flex" gap="16px">
                  <Typography
                    sx={(theme) => ({
                      fontSize: [13, 13, 16],
                      lineHeight: ["22px", "22px", "26px"],
                      fontWeight: 500,
                      color: theme.palette.Grayscale[300],
                      whiteSpace: "nowrap",
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
                      whiteSpace: "nowrap",
                    })}
                  >
                    {data.career}년
                  </Typography>
                </Box>
                {/* Divider */}
                <Box height={14} border={"1px solid #E6E6E6"}></Box>
                {/* 확정 */}
                <Box display="flex" gap="4px">
                  <Typography
                    sx={(theme) => ({
                      fontSize: [13, 13, 16],
                      lineHeight: ["22px", "22px", "26px"],
                      fontWeight: 500,
                      color: theme.palette.Black[300],
                      whiteSpace: "nowrap",
                      span: {
                        color: theme.palette.Grayscale[300],
                      },
                    })}
                  >
                    {data.confirm}건 <span>확정</span>
                  </Typography>
                </Box>
              </Stack>

              {/* 제공 서비스 & 지역 */}
              <Box display="flex" gap="20px" mt="12px" flexWrap="wrap">
                <Box display="flex" gap="8px" alignItems="center">
                  <Box
                    borderRadius="4px"
                    px="6px"
                    py="2px"
                    sx={(theme) => ({
                      backgroundColor: theme.palette.Background[400],
                    })}
                  >
                    <Typography sx={{ fontSize: 14, color: "#999999" }}>
                      제공 서비스
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 14 }}>
                    {joinAddress(typeMapper(data.types))}
                  </Typography>
                </Box>

                <Box display="flex" gap="8px" alignItems="center">
                  <Box
                    borderRadius="4px"
                    px="6px"
                    py="2px"
                    sx={(theme) => ({
                      backgroundColor: theme.palette.Background[400],
                    })}
                  >
                    <Typography sx={{ fontSize: 14, color: "#999999" }}>
                      지역
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 14 }}>
                    {joinAddress(data.address)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* tablet, mobile시 버튼 있는 곳 */}
        <Box
          display={["flex", "flex", "none"]}
          gap={["8px", "8px", "11px"]}
          flexDirection={["column", "row", "row"]}
        >
          {reverseButtons ? [...buttons].reverse() : buttons}
        </Box>
      </Box>
    </>
  );
};
