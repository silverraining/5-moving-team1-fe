import type { Meta, StoryObj } from "@storybook/react";
import DropDownButton from "@/src/components/shared/components/drop-down/filter-drop-down/DropDownButton";

const meta: Meta<typeof DropDownButton> = {
  title: "drop-down/filter/DropDownButton",
  component: DropDownButton,
} satisfies Meta<typeof DropDownButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "지역",
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    label: "서울",
    isSelected: true,
  },
};
