import type { Meta, StoryObj } from "@storybook/react";
import NotificationHeader from "@/src/components/shared/components/drop-down/notifications/NotificationHeader";

const meta: Meta<typeof NotificationHeader> = {
  title: "drop-down/Notification/NotificationHeader",
  component: NotificationHeader,
  tags: ["autodocs"],
  argTypes: {
    onClose: {
      description: "닫기 아이콘 클릭 시 호출되는 핸들러",
      table: {
        category: "Events",
        type: { summary: "() => void" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "알림 드롭다운의 상단 헤더 컴포넌트입니다. 타이틀과 닫기 버튼을 포함합니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationHeader>;

export const Default: Story = {
  args: {
    onClose: () => alert("닫기 버튼이 클릭되었습니다!"),
  },
};
