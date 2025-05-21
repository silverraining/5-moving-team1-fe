import { Progress } from "@/shared/components/progress/Progress";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Progress> = {
  title: "Progress",
  component: Progress,
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

type Story = StoryObj<typeof Progress>;

export const base: Story = {
  args: { value: 1 },
};
