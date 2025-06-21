import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { joinAddress } from "@/src/lib/joinAddress";
import { typeMapperFromRecord } from "@/src/lib/typeMapper";
import { MoverProfileCardData } from "@/src/api/mover/api";
import {
  convertToServiceRegionArray,
  convertRegionToKoreanLabels,
} from "@/src/utils/util";

interface CardProps {
  data: MoverProfileCardData;
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
 * 기존 CardListProfile 컴포넌트 수정해서 기사님 마이페이지에 사용중
 *
 */
export const CardListProfile = ({
  data,
  onMyClick,
  onBasicClick,
  buttonLabels,
  reverseButtons = false,
}: CardProps) => {
  const theme = useTheme();
  const isDesktopUp = useMediaQuery(theme.breakpoints.up("desktop"));

  const buttonPrimary = (
    <Button
      key="primary"
      onClick={onMyClick}
      variant="contained"
      sx={{
        px: "68px",
        py: "12px",
        flex: 1,
        minWidth: 0,
        maxWidth: "100%",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          fontSize: [16, 16, 20],
          lineHeight: ["26px", "26px", "32px"],
          fontWeight: 600,
          color: theme.palette.White[100],
          whiteSpace: "nowrap",
        }}
      >
        {buttonLabels?.primary ?? "견적 보내기"}
      </Typography>
    </Button>
  );

  const buttonSecondary = (
    <Button
      key="secondary"
      onClick={onBasicClick}
      variant="outlined"
      sx={{
        px: "68px",
        py: "12px",
        flex: 1,
        minWidth: 0,
        maxWidth: "100%",
        borderRadius: "16px",
        border: `1px solid ${theme.palette.Grayscale[300]}`,
      }}
    >
      <Typography
        sx={{
          fontSize: [16, 16, 20],
          lineHeight: ["26px", "26px", "32px"],
          fontWeight: 600,
          color: theme.palette.Grayscale[300],
          whiteSpace: "nowrap",
        }}
      >
        {buttonLabels?.secondary ?? "반려"}
      </Typography>
    </Button>
  );

  const buttons = reverseButtons
    ? [buttonSecondary, buttonPrimary]
    : [buttonPrimary, buttonSecondary];

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{
        flexGrow: 1,
        overflow: "hidden",
        minWidth: ["375px", "600px", "744px"],
        maxWidth: "100%",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
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
          flexWrap="nowrap"
          justifyContent={["flex-start", "flex-start", "space-between"]}
          alignItems="center"
          width="100%"
        >
          {!isDesktopUp && (
            <Box
              width="46px"
              height="46px"
              position="relative"
              flexShrink={0}
              sx={{
                borderRadius: "100px",
                overflow: "hidden",
                backgroundColor: "#D9D9D9",
              }}
            >
              <Image
                src={data.imageUrl || "/Images/profile/maleProfile.svg"}
                alt="프로필 이미지"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>
          )}

          <Box maxWidth={["80%", "80%", "45%"]}>
            <Typography
              sx={(theme) => ({
                fontSize: [14, 14, 24],
                lineHeight: ["24px", "24px", "32px"],
                fontWeight: 600,
                color: theme.palette.Black[300],
              })}
            >
              {data.nickname}
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
              {data.intro}
            </Typography>
          </Box>

          {isDesktopUp && (
            <Stack
              direction="row"
              spacing={2}
              sx={{
                flexShrink: 1,
                flexWrap: "wrap",
                minWidth: 400,
              }}
            >
              {buttons}
            </Stack>
          )}
        </Stack>

        {/* 내부 박스 (이미지, 정보) */}
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap="24px"
          padding={["10px", "24px 18px"]}
          border="1px solid"
          borderRadius="6px"
          sx={(theme) => ({
            backgroundColor: theme.palette.NeutralGray[100],
            borderColor: theme.palette.Line[200],
            boxShadow: "4px 4px 16px 0px rgba(233, 233, 233, 0.1)",
          })}
        >
          {isDesktopUp && (
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
                src={data.imageUrl || "/Images/profile/maleProfile.svg"}
                alt="프로필 이미지"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>
          )}

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            flex={1}
          >
            <Stack
              direction="row"
              spacing="16px"
              alignItems="center"
              justifyContent="flex-start"
              flexGrow={1}
            >
              <Box display="flex" alignItems="center" gap="4px">
                <Image
                  src="/Images/star/star_active.svg"
                  alt="별점"
                  width={20}
                  height={20}
                />
                <Typography sx={{ fontSize: [13, 13, 16], fontWeight: 500 }}>
                  {data.averageRating.toFixed(1)}
                </Typography>
                <Typography
                  sx={{
                    fontSize: [13, 13, 16],
                    fontWeight: 500,
                    color: theme.palette.Grayscale[300],
                  }}
                >
                  ({data.reviewCount})
                </Typography>
              </Box>

              <Box height={14} border="1px solid #E6E6E6" />

              <Box display="flex" gap="16px">
                <Typography
                  sx={{
                    fontSize: [13, 13, 16],
                    fontWeight: 500,
                    color: theme.palette.Grayscale[300],
                  }}
                >
                  경력
                </Typography>
                <Typography
                  sx={{
                    fontSize: [13, 13, 16],
                    fontWeight: 500,
                    color: theme.palette.Black[300],
                  }}
                >
                  {data.experience}년
                </Typography>
              </Box>

              <Box height={14} border="1px solid #E6E6E6" />

              <Box display="flex" gap="4px">
                <Typography
                  sx={{
                    fontSize: [13, 13, 16],
                    fontWeight: 500,
                    color: theme.palette.Black[300],
                    span: {
                      color: theme.palette.Grayscale[300],
                    },
                  }}
                >
                  {data.confirmedEstimateCount}건 <span>확정</span>
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
                  sx={{
                    backgroundColor: theme.palette.Background[400],
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#999999",
                      whiteSpace: "nowrap",
                    }}
                  >
                    제공 서비스
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 14 }}>
                  {joinAddress(typeMapperFromRecord(data.serviceType || {}))}
                </Typography>
              </Box>

              <Box display="flex" gap="8px" alignItems="center" pr="8px">
                <Box
                  borderRadius="4px"
                  px="6px"
                  py="2px"
                  sx={{
                    backgroundColor: theme.palette.Background[400],
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#999999",
                      whiteSpace: "nowrap",
                    }}
                  >
                    지역
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 14,
                    whiteSpace: {
                      xs: "normal",
                      md: "nowrap",
                    },
                  }}
                >
                  {data.serviceRegion
                    ? convertRegionToKoreanLabels(
                        convertToServiceRegionArray(data.serviceRegion)
                      ).join(", ")
                    : ""}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {!isDesktopUp && (
        <Box
          display="flex"
          gap={["8px", "8px", "11px"]}
          flexDirection={["column", "row"]}
          mt={2}
        >
          {buttons}
        </Box>
      )}
    </Box>
  );
};
