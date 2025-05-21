import { Header } from "@/shared/components/header/Header";
import { Progress } from "@/shared/components/progress/Progress";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Header> = {
  title: "Header",
  component: Header,
  parameters: {
    docs: {
      description: {
        component: "A button component for shared use",
      },
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Header>;

export const base: Story = {
  args: {},
};
