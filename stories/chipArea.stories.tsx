import type { Meta, StoryObj } from "@storybook/react";
import { ChipArea } from "@/shared/components/chip/ChipArea";

const meta: Meta<typeof ChipArea> = {
  title: "Chip/ChipArea",
  component: ChipArea,
  argTypes: {
    label: { control: "text" },
    selected: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ChipArea>;

export const Default: Story = {
  args: {
    label: "서울",
    selected: false,
    onClick: () => alert("Chip clicked"),
  },
};

export const Selected: Story = {
  args: {
    label: "서울",
    selected: true,
    onClick: () => alert("Chip clicked"),
  },
};
