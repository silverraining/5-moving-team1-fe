"use client";
import { COLORS } from "@/src/public/theme/colors";
import { Box, BoxProps, Stack, Typography, useTheme } from "@mui/material";

interface ChatProps {
  content: string;
  variant: "received" | "sent" | "system";
}

export const Chat = ({ content, variant }: ChatProps) => {
  const theme = useTheme();
  const isSmall = theme.breakpoints.down("tablet");

  const bubbleStyles: Record<"sent" | "received" | "system", BoxProps> = {
    sent: {
      sx: {
        backgroundColor: "white",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        borderBottomRightRadius: ["24px", "24px", "30px"],
        borderBottomLeftRadius: ["24px", "24px", "30px"],
        borderTopRightRadius: ["24px", "24px", "30px"],
        boxShadow: "0px 4px 8px #E0E0E033 20%",
      },
    },
    received: {
      sx: {
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        backgroundColor: COLORS.PrimaryBlue[300],
        borderBottomRightRadius: ["24px", "24px", "30px"],
        borderBottomLeftRadius: ["24px", "24px", "30px"],
        borderTopLeftRadius: ["24px", "24px", "30px"],
        boxShadow: "0px 4px 8px #E0E0E033 20%",
      },
    },
    system: {
      sx: {
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        backgroundColor: COLORS.PrimaryBlue[100],
        borderBottomRightRadius: ["24px", "24px", "30px"],
        borderBottomLeftRadius: ["24px", "24px", "30px"],
        borderTopLeftRadius: ["24px", "24px", "30px"],
        boxShadow: "0px 4px 8px #E0E0E033 20%",
      },
    },
  };
  return (
    <Stack
      width="100%"
      direction="row"
      justifyContent={variant === "sent" ? "flex-start" : "flex-end"}
      alignItems="center"
    >
      <Box
        maxWidth={["248px", "248px", "100%"]}
        px={["20px", "20px", "40px"]}
        py={["12px", "12px", "20px"]}
        {...bubbleStyles[variant]}
      >
        <Typography
          variant={isSmall ? "M_14" : "M_18"}
          color={
            variant === "sent"
              ? "black"
              : variant === "system"
                ? COLORS.PrimaryBlue[300]
                : "white"
          }
        >
          {content}
        </Typography>
      </Box>
    </Stack>
  );
};
