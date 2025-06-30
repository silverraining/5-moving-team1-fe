import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { joinAddress } from "@/src/lib/joinAddress";
import { typeMapper } from "@/src/lib/typeMapper";
import { EstimateOffer } from "@/src/types/estimate";
import { useTranslation } from "react-i18next";

interface CardProps {
  data: EstimateOffer;
  onMyClick?: () => void;
  onBasicClick?: () => void;
}

export const CardListProfile = ({
  data,
  onMyClick,
  onBasicClick,
}: CardProps) => {
  const info = data.mover;
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      bgcolor={"transparent"}
      gap={"10px"}
      width={[327, 600, 1200]}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        width={[327, 600, 1200]}
        height={[222, 186, 272]}
        borderRadius="16px"
        border="0.5px solid"
        padding={[
          "16px 14px 10px 14px",
          "16px 14px 10px 14px",
          "20px 24px 14px 24px",
        ]}
        boxSizing={"border-box"}
        sx={(theme) => ({
          backgroundColor: theme.palette.NeutralGray[200],
          borderColor: theme.palette.Grayscale[100],
        })}
      >
        <Box
          display="flex"
          flexDirection="row"
          gap={["14px", "16px"]}
          justifyContent={["flex-start", "flex-start", "space-between"]}
        >
          <Box
            display={["inline-block", "inline-block", "none"]}
            width={[46, 46, 56]}
            height={[46, 46, 56]}
            position="relative"
          >
            <Image
              src={info.imageUrl || "/Images/default_profile.png"}
              alt={"프로필 Images"}
              fill
              style={{
                overflow: "hidden",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box maxWidth={["80%", "80%", "45%"]}>
            <Typography
              sx={(theme) => ({
                fontSize: [14, 14, 24],
                lineHeight: ["24px", "24px", "32px"],
                fontWeight: 600,
                color: theme.palette.Black[300],
              })}
            >
              {info.nickname}
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
              {info.intro}
            </Typography>
          </Box>
          <Box
            display={["none", "none", "flex"]}
            gap={["8px", "8px", "11px"]}
            flexDirection={["column", "row", "row"]}
          >
            <Button
              onClick={onMyClick}
              variant="contained"
              sx={(theme) => ({
                width: ["auto", "auto", 280],
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
                {t("견적 보내기")}
              </Typography>
            </Button>
            <Button
              onClick={onBasicClick}
              variant="outlined"
              sx={(theme) => ({
                width: ["auto", "auto", 280],
                height: [48, 48, 64],
                borderRadius: ["8px", "8px", "16px"],
                border: `1px solid ${theme.palette.PrimaryBlue[300]}`,
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
                {t("반려")}
              </Typography>
            </Button>
          </Box>
        </Box>

        {/* 별 있는 곳 */}
        <Box
          display="flex"
          padding={["10px", "26px 18px"]}
          justifyContent={"space-between"}
          flexDirection="column"
          border={"1px solid"}
          height={[120, 84, 128]}
          sx={(theme) => ({
            backgroundColor: theme.palette.NeutralGray[100],
            borderColor: theme.palette.Line[100],
            boxShadow: "4px 4px 16px 0px rgba(233, 233, 233, 0.1)",
          })}
        >
          <Box
            display={["none", "none", "inline-block"]}
            width={[46, 46, 56]}
            height={[46, 46, 56]}
            position="relative"
          >
            <Image
              src={info.imageUrl || "/Images/default_profile.png"}
              alt={"프로필 Images"}
              fill
              style={{
                overflow: "hidden",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap={"9.5px"}
            alignItems="center"
            justifyContent={["flex-start"]}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
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
                {info.rating}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                })}
              >
                ({info.reviewCount})
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
                {t("경력")}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {info.experience} {t("년")}
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
                {info.confirmedCount}
              </Typography>
              <Typography
                sx={(theme) => ({
                  fontSize: [13, 13, 16],
                  lineHeight: ["22px", "22px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Grayscale[300],
                })}
              >
                {t("확정")}
              </Typography>
            </Box>
          </Box>

          <Box
            display={"flex"}
            flexDirection={["column", "row", "row"]}
            gap={"20px"}
          >
            <Box display={"flex"} gap={["8px", "8px", "12px"]}>
              <Box
                borderRadius="4px"
                display={"inline-block"}
                padding={["2px 6px", "2px 6px", "4px 6px"]}
                sx={(theme) => ({
                  backgroundColor: theme.palette.Background[400],
                })}
              >
                <Typography
                  sx={(theme) => ({
                    fontSize: [14, 14, 18],
                    lineHeight: ["24px", "24px", "26px"],
                    fontWeight: [500, 500, 400],
                    color: theme.palette.Grayscale[400],
                  })}
                >
                  {t("제공 서비스")}
                </Typography>
              </Box>
              <Typography
                sx={(theme) => ({
                  fontSize: [14, 14, 18],
                  lineHeight: ["24px", "24px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {joinAddress(typeMapper(info.serviceType))}
              </Typography>
            </Box>

            <Box display={"flex"} gap={["8px", "8px", "12px"]}>
              <Box
                borderRadius="4px"
                display={"inline-block"}
                padding={["2px 6px", "2px 6px", "4px 6px"]}
                sx={(theme) => ({
                  backgroundColor: theme.palette.Background[400],
                })}
              >
                <Typography
                  sx={(theme) => ({
                    fontSize: [14, 14, 18],
                    lineHeight: ["24px", "24px", "26px"],
                    fontWeight: [500, 500, 400],
                    color: theme.palette.Grayscale[400],
                  })}
                >
                  {t("지역")}
                </Typography>
              </Box>
              <Typography
                sx={(theme) => ({
                  fontSize: [14, 14, 18],
                  lineHeight: ["24px", "24px", "26px"],
                  fontWeight: 500,
                  color: theme.palette.Black[300],
                })}
              >
                {data.toAddress.roadAddress}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 버튼 있는 곳 */}
      <Box
        display={["flex", "flex", "none"]}
        gap={["8px", "8px", "11px"]}
        flexDirection={["column", "row", "row"]}
      >
        <Button
          onClick={onMyClick}
          variant="contained"
          sx={(theme) => ({
            height: [48, 48, 64],
            bgcolor: theme.palette.PrimaryBlue[300],
            borderRadius: ["8px", "8px", "16px"],
            flex: 1,
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
            {t("견적 보내기")}
          </Typography>
        </Button>
        <Button
          onClick={onBasicClick}
          variant="outlined"
          sx={(theme) => ({
            height: [48, 48, 64],
            borderRadius: ["8px", "8px", "16px"],
            border: `1px solid ${theme.palette.PrimaryBlue[300]}`,
            flex: 1,
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
            {t("반려")}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
