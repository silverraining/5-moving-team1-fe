import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

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
    // → /이미지/ 같은 경로를 정상적으로 로딩할 수 있게 해줌
    ["../public"],
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, ".."),
        "@shared": path.resolve(__dirname, "../src/components/shared"),
        "@src": path.resolve(__dirname, "../src"),
        "@public": path.resolve(__dirname, "../public"),
      };

      // 절대 경로 설정 추가
      config.resolve.modules = [path.resolve(__dirname, ".."), "node_modules"];
    }
    return config;
  },
};

export default config;
