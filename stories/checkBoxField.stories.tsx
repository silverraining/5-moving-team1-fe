import type { Meta, StoryObj } from "@storybook/react";
import { CheckBoxField } from "@/shared/components/CheckBoxField";

const meta: Meta<typeof CheckBoxField> = {
  title: "checkBox/CheckBoxField",
  component: CheckBoxField,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CheckBoxField>;

export const Default: Story = {
  args: {
    selected: "가정이사 (쓰리룸, 20평대 이상)",
    size: "md",
    onChange: () => {
      alert(
        "useState는 스토리북에서 어떻게 써야하는지 몰라서 클릭 시 alert로 대체했습니다."
      );
    },
  },
};
