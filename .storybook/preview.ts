import type { Preview } from "@storybook/react";

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
            width: "343px",
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
};

export default preview;
