import type { Decorator, Meta, StoryObj } from "@storybook/react";
import NotificationDropDown from "@/src/components/shared/components/drop-down/notifications/NotificationDropDown";
const withContainer: Decorator = (Story) => {
  return (
    <div
      style={{
        width: "500px",
        height: "700px",
        margin: "100px auto",
        position: "relative",
        background: "#fff",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <Story />
    </div>
  );
};
const meta: Meta<typeof NotificationDropDown> = {
  title: "drop-down/Notification/NotificationDropDown",
  component: NotificationDropDown,
  decorators: [withContainer],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "알림 목록을 보여주는 드롭다운 컴포넌트입니다. 알림 헤더와 스크롤 가능한 리스트를 포함하며, 강조된 텍스트를 클릭할 수 있습니다. 리스트 항목 갯수 4개 이상 부터 스크롤이 생성됩니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationDropDown>;

export const Default: Story = {
  render: () => <NotificationDropDown />,
};
