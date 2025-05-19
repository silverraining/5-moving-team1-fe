import type { Meta, StoryObj } from "@storybook/react";
import { CheckBoxList } from "@/shared/components/CheckBoxList";

const meta: Meta<typeof CheckBoxList> = {
  title: "checkBox/CheckBoxList",
  component: CheckBoxList,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CheckBoxList>;

export const LooksSelected: Story = {
  args: {
    selected: "가정이사 (쓰리룸, 20평대 이상)",
    size: "md",
    onChange: () => {
      alert(
        "useState는 스토리북에서 어떻게 써야하는지 몰라서 클릭 시 alert로 대체했습니다."
      );
    },
    onConfirm: () => {
      alert("선택 완료 버튼이 클릭되었습니다.");
    },
  },
};
