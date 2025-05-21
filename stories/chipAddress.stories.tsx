import type { Meta, StoryObj } from "@storybook/react";
import { ChipAddress } from "@/shared/components/chip/ChipAddress";

const meta: Meta<typeof ChipAddress> = {
  title: "Chip/ChipAddress",
  component: ChipAddress,
  argTypes: {
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ChipAddress>;

export const Default: Story = {
  args: {
    label: "도로명",
  },
};
