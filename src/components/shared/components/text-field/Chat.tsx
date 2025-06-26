"use client";

import {
  Box,
  BoxProps,
  Stack,
  Typography,
  useTheme,
  Slide,
} from "@mui/material";
import { useState, useEffect } from "react";

interface ChatProps {
  content: string;
  variant: "received" | "sent" | "system";
  delay?: number; // 애니메이션 지연 시간 (ms)
}

export const Chat = ({ content, variant, delay = 0 }: ChatProps) => {
  const theme = useTheme();
  const isSmall = theme.breakpoints.down("tablet");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

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
        backgroundColor: theme.palette.PrimaryBlue[300],
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
        backgroundColor: theme.palette.PrimaryBlue[100],
        borderBottomRightRadius: ["24px", "24px", "30px"],
        borderBottomLeftRadius: ["24px", "24px", "30px"],
        borderTopLeftRadius: ["24px", "24px", "30px"],
        boxShadow: "0px 4px 8px #E0E0E033 20%",
      },
    },
  };
  return (
    <Slide
      direction={variant === "sent" ? "right" : "left"}
      in={isVisible}
      timeout={800}
      style={{ transitionDelay: isVisible ? "0ms" : "200ms" }}
    >
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
          sx={{
            ...bubbleStyles[variant].sx,
            transform: isVisible ? "scale(1)" : "scale(0.8)",
            transition: "transform 0.3s ease-out",
          }}
        >
          <Typography
            variant={isSmall ? "M_14" : "M_18"}
            color={
              variant === "sent"
                ? "black"
                : variant === "system"
                  ? theme.palette.PrimaryBlue[300]
                  : "white"
            }
          >
            {content}
          </Typography>
        </Box>
      </Stack>
    </Slide>
  );
};
