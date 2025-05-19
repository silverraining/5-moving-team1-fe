import type { Meta, StoryObj } from "@storybook/react";
import { ChipCategory } from "@/shared/components/ChipCategory";

const meta: Meta<typeof ChipCategory> = {
  title: "Chip/ChipCategory",
  component: ChipCategory,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "xl"],
    },
    type: {
      control: { type: "select" },
      options: ["small", "home", "office", "designation", "wait"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ChipCategory>;

export const Default: Story = {
  args: {
    size: "md",
    type: "small",
  },
};

export const SmallChip: Story = {
  args: {
    size: "sm",
    type: "home",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    type: "designation",
  },
};

export const NoImage: Story = {
  args: {
    size: "md",
    type: "wait",
  },
};
