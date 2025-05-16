import { Button } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "ex/ex2",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: "A button component for shared use",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const base: Story = {
  render: (args) => <Button {...args}>{"test"}</Button>,
  args: {},
};
