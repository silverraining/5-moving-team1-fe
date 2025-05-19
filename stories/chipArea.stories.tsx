import type { Meta, StoryObj } from "@storybook/react";
import { ChipArea } from "@/shared/components/ChipArea";

const meta: Meta<typeof ChipArea> = {
  title: "Chip/chipArea",
  component: ChipArea,
  argTypes: {
    label: {
      control: "text",
      defaultValue: "소형이사",
    },
    selected: {
      control: "boolean",
      defaultValue: false,
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      defaultValue: "md",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ChipArea>;

export const Default: Story = {
  args: {
    label: "소형이사",
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    label: "사무실이사",
    selected: true,
  },
};

export const SmallSize: Story = {
  args: {
    label: "가정이사",
    selected: false,
    size: "sm",
  },
};
