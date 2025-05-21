import type { Meta, StoryObj } from "@storybook/react";
import { CheckBoxField } from "@/shared/components/check-box/CheckBoxField";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof CheckBoxField> = {
  title: "CheckBox/CheckBoxField",
  component: CheckBoxField,
  argTypes: {
    selected: {
      control: { type: "select" },
      options: [
        "소형이사 (원룸, 투룸, 20평대 미만)",
        "가정이사 (쓰리룸, 20평대 이상)",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckBoxField>;

export const Default: Story = {
  args: {
    selected: "소형이사 (원룸, 투룸, 20평대 미만)",
    onChange: action("onChange"),
  },
};
