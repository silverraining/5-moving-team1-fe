import { Button } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "ex/ex1",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: "A button component for shared use",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" }, // 드롭다운 타입 지정
      options: ["text", "outlined", "contained"], // 선택지 옵션 배열
      description: "Button variant type",
      table: {
        defaultValue: { summary: "outlined" },
      },
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "info", "success", "warning"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const base: Story = {
  args: {
    variant: "outlined",
    color: "primary",
    size: "medium",
    disabled: false,
    children: "Click me",
  },
};
