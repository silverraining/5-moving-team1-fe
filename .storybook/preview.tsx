import type { Preview } from "@storybook/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createAppTheme } from "../public/theme/theme"; // 실제 테마 경로로 수정
const theme = createAppTheme("light");
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "0px",
            height: "800px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "744px",
            height: "1000px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1200px",
            height: "1000px",
          },
        },
      },
      defaultViewport: "desktop",
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default preview;
