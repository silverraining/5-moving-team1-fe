import TextField from "@/shared/components/text-field";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TextField.Chat> = {
  title: "TextField",
  component: TextField.Chat,
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

type Story = StoryObj<typeof TextField.Chat>;

export const chat: Story = {
  args: { content: "안녕하세요.", variant: "received" },
};
