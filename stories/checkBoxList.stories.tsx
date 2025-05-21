import type { Meta, StoryObj } from "@storybook/react";
import { CheckBoxList } from "@/shared/components/check-box/CheckBoxList";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof CheckBoxList> = {
  title: "CheckBox/CheckBoxList",
  component: CheckBoxList,
  argTypes: {
    selected: {
      control: { type: "select" },
      options: [
        "소형이사 (원룸, 투룸, 20평대 미만)",
        "가정이사 (쓰리룸, 20평대 이상)",
        "사무실이사 (사무실, 상업공간)",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckBoxList>;

export const Default: Story = {
  args: {
    selected: "가정이사 (쓰리룸, 20평대 이상)",
    onChange: action("onChange"),
    onConfirm: action("onConfirm"),
  },
};
