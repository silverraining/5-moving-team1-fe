import type { Meta, StoryObj } from "@storybook/react";
import { ChipAddress } from "@/shared/components/ChipAddress";

const meta: Meta<typeof ChipAddress> = {
  title: "Chip/ChipAddress",
  component: ChipAddress,
  argTypes: {
    label: {
      control: "text",
      defaultValue: "도로명",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      defaultValue: "md",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChipAddress>;

export const Default: Story = {
  args: {
    label: "도로명",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    label: "도로명 (소형)",
    size: "sm",
  },
};

export const CustomLabel: Story = {
  args: {
    label: "서울특별시 종로구 세종대로",
    size: "md",
  },
};
