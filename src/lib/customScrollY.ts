import { COLORS } from "@/public/theme/colors";

import { SxProps, Theme } from "@mui/material";

const CustomScrollY: SxProps<Theme> = {
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: COLORS.Grayscale[200],
    borderRadius: "4px",
    minHeight: "24px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
};

export default CustomScrollY;
