import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      fastRefresh: true,
    },
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs:
    // Next.js의 public 폴더를 Storybook dev 서버에서 접근 가능하도록 설정
    // → /images/ 같은 경로를 정상적으로 로딩할 수 있게 해줌
    ["../public"],
};

export default config;
