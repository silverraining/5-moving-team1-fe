import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function EstimateSection({ title, children }: SectionProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));

  return (
    <Stack width={"100%"}>
      <Typography
        variant={isDesktop ? "SB_24" : "SB_18"}
        sx={(theme) => ({
          color: theme.palette.Black[400],
          marginBottom: ["24px", "24px", "40px"],
        })}
      >
        {title}
      </Typography>
      {children}
    </Stack>
  );
}
