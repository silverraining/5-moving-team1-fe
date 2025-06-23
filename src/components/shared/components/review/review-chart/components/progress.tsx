import { Box, LinearProgress, Stack, Typography } from "@mui/material";
interface ProgressProps {
  max: number;
  value: number;
  label: string;
  isSmall: boolean;
}
export const Progress = ({ max, value, label, isSmall }: ProgressProps) => {
  const percentage = (value / max) * 100;
  return (
    <Stack direction="row" alignItems="center" width="100%">
      <Typography variant="B_20" sx={{ whiteSpace: "nowrap" }}>
        {label}
      </Typography>
      <Box
        width={"100%"}
        maxWidth={"370px"}
        minWidth={"180px"}
        px={["16px", "16px", "30px"]}
        sx={{ m: 0 }}
      >
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={(theme) => ({
            backgroundColor: theme.palette.NeutralGray[300],
            "& .MuiLinearProgress-bar": {
              backgroundColor: theme.palette.SecondaryYellow[100],
            },
            height: "8px",
            borderRadius: "15px",
          })}
        />
      </Box>
      <Typography
        variant="B_20"
        sx={(theme) => ({ color: theme.palette.Grayscale[300] })}
      >
        {value}
      </Typography>
    </Stack>
  );
};
