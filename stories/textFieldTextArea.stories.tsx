import TextField from "@/shared/components/text-field";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TextField.TextArea> = {
  title: "TextField",
  component: TextField.TextArea,
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

type Story = StoryObj<typeof TextField.TextArea>;

export const TextArea: Story = {
  args: { content: "안녕하세요." },
};
