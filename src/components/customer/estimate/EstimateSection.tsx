import { Stack, Typography } from "@mui/material";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function EstimateSection({ title, children }: SectionProps) {
  return (
    <Stack width={"100%"}>
      <Typography
        variant="SB_24"
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
