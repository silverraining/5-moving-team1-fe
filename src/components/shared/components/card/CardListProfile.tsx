import { Box, Button, Typography } from "@mui/material";
import { CardData } from "./CardListdd";
import Image from "next/image";
import { COLORS } from "@/public/theme/colors";

interface CardProps {
  data: CardData;
  onMyClick?: () => void;
  onBasicClick?: () => void;
}

export const CardListProfile = ({
  data,
  onMyClick,
  onBasicClick,
}: CardProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      border="0.5px solid"
      borderColor={COLORS.Line[100]}
      width={[327, 600, 688]}
      height={[222, 222, 280]}
      bgcolor="#FFFFFF"
      borderRadius="16px"
      padding={[
        "16px 14px 10px 14px",
        "16px 14px 10px 14px",
        "20px 24px 14px 24px",
      ]}
      boxShadow="2px 2px 10px 0px #DCDCDC24, -2px -2px 10px 0px #DCDCDC24"
      boxSizing={"border-box"}
    >
      <Box display="flex" flexDirection="row" gap={["14px", "16px"]}>
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
        <Box>
          <Typography
            sx={{
              fontSize: [14, 14, 24],
              lineHeight: ["24px", "24px", "32px"],
              fontWeight: 600,
              color: COLORS.Black[300],
            }}
          >
            {data.name}
          </Typography>
          <Typography
            sx={{
              fontSize: [14, 14, 24],
              lineHeight: ["24px", "24px", "32px"],
              fontWeight: 600,
              color: COLORS.Black[300],
            }}
          >
            {data.message}
          </Typography>
        </Box>
      </Box>

      {/* 별 있는 곳 */}
      <Box>
        <Box>
          <Box position={"relative"} width={[46, 46, 56]} height={[46, 46, 56]}>
            <Image
              src="/images/star/star_active.svg"
              alt="별점 사진"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
          <Typography></Typography>
        </Box>
        <Box>
          <Typography></Typography>
          <Typography></Typography>
        </Box>
        <Box>
          <Typography></Typography>
          <Typography></Typography>
        </Box>
      </Box>

      {/* 제공 서비스 있는 곳 */}
      <Box>
        <Box display="flex">
          <Typography
            sx={{
              fontSize: [13, 13, 16],
              lineHeight: ["22px", "22px", "26px"],
              fontWeight: 500,
              color: COLORS.Grayscale[300],
            }}
          >
            제공 서비스
          </Typography>
          <Typography
            sx={{
              fontSize: [13, 13, 16],
              lineHeight: ["22px", "22px", "26px"],
              fontWeight: 500,
              color: COLORS.Black[300],
            }}
          >
            {data.types}
          </Typography>
        </Box>

        <Box display="flex">
          <Typography
            sx={{
              fontSize: [13, 13, 16],
              lineHeight: ["22px", "22px", "26px"],
              fontWeight: 500,
              color: COLORS.Black[300],
            }}
          >
            {data.confirm}
          </Typography>
          <Typography
            sx={{
              fontSize: [13, 13, 16],
              lineHeight: ["22px", "22px", "26px"],
              fontWeight: 500,
              color: COLORS.Grayscale[300],
            }}
          >
            확정
          </Typography>
        </Box>
      </Box>

      {/* 버튼 있는 곳 */}
      <Box
        display={"flex"}
        gap={["8px", "8px", "11px"]}
        flexDirection={["column", "row", "row"]}
      >
        <Button
          onClick={onMyClick}
          variant="contained"
          sx={{
            height: [48, 48, 64],
            bgcolor: COLORS.PrimaryBlue[300],
            borderRadius: ["8px", "8px", "16px"],
          }}
        >
          <Typography
            sx={{
              fontSize: [16, 16, 20],
              lineHeight: ["26px", "26px", "32px"],
              fontWeight: 600,
              color: COLORS.White[100],
            }}
          >
            내 프로필 수정
          </Typography>
          <Image
            src={"/images/write/active_write.svg"}
            alt="상세보기"
            width={24}
            height={24}
          ></Image>
        </Button>
        <Button
          onClick={onBasicClick}
          variant="outlined"
          sx={{
            height: [48, 48, 64],
            borderRadius: ["8px", "8px", "16px"],
            border: `1px solid ${COLORS.PrimaryBlue[300]}`,
          }}
        >
          <Typography
            sx={{
              fontSize: [16, 16, 20],
              lineHeight: ["26px", "26px", "32px"],
              fontWeight: 600,
              color: COLORS.PrimaryBlue[300],
            }}
          >
            기본 정보 수정
          </Typography>
          <Image
            src={"/images/write/write.svg"}
            alt="상세보기"
            width={24}
            height={24}
          ></Image>
        </Button>
      </Box>
    </Box>
  );
};
