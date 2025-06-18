import { COLORS } from "@/public/theme/colors";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface EditableBoxProps {
  fromLabel: string;
  toLabel: string;
  onFromClick: () => void;
  onToClick: () => void;
  onConfirmClick: () => void;
}

export const EditableBox = ({
  fromLabel,
  toLabel,
  onFromClick,
  onToClick,
  onConfirmClick,
}: EditableBoxProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("tablet"));

  const hasFrom = !!fromLabel;
  const hasTo = !!toLabel;
  const showConfirm = hasFrom && hasTo;

  return (
    <Box
      display="flex"
      width={[327, 624]}
      flexDirection="column"
      padding={["20px 24px", "32px"]}
      alignItems="center"
      gap={["16px", "16px", "20px"]}
      borderRadius="32px 0 32px 32px "
      sx={{
        backgroundColor: COLORS.White[100],
      }}
      boxSizing={"border-box"}
    >
      {/* 출발지 */}
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-end"}
        gap={"8px"}
      >
        <Button
          variant="outlined"
          onClick={onFromClick}
          sx={{
            borderRadius: "16px",
            width: [279, 560],
            height: [54, 64],
            justifyContent: "flex-start",
            padding: 2,
          }}
        >
          {fromLabel || "출발지 선택하기"}
        </Button>
        {hasFrom && (
          <Typography
            onClick={onFromClick}
            sx={{
              fontSize: [12, 16],
              lineHeight: ["24px", "26px"],
              fontWeight: 500,
              color: COLORS.Black[400],
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            수정하기
          </Typography>
        )}
      </Box>

      {/* 도착지 */}
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-end"}
        gap={"8px"}
      >
        <Button
          variant="outlined"
          onClick={onToClick}
          sx={{
            borderRadius: "16px",
            width: [279, 560],
            height: [54, 64],
            justifyContent: "flex-start",
            padding: 2,
          }}
        >
          {toLabel || "도착지 선택하기"}
        </Button>
        {hasTo && (
          <Typography
            onClick={onToClick}
            sx={{
              fontSize: [12, 16],
              lineHeight: ["24px", "26px"],
              fontWeight: 500,
              color: COLORS.Black[400],
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            수정하기
          </Typography>
        )}
      </Box>

      {/* 견적 확정하기 버튼 */}
      {showConfirm && (
        <Button
          variant="contained"
          onClick={onConfirmClick}
          sx={{
            width: [279, 560],
            height: [54, 64],
            backgroundColor: COLORS.PrimaryBlue[300],
            borderRadius: "16px",
          }}
        >
          <Typography variant={isSmall ? "SB_16" : "SB_20"}>
            견적 확정하기
          </Typography>
        </Button>
      )}
    </Box>
  );
};
