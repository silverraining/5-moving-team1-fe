import type { Meta, StoryObj } from "@storybook/react";
import NotificationItem from "@/src/components/shared/components/drop-down/notifications/NotificationItem";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof NotificationItem> = {
  title: "drop-down/Notification/NotificationItem",
  component: NotificationItem,
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "text",
      description: "알림 메시지",
      table: {
        category: "Props",
        type: { summary: "string" },
      },
    },
    highlight: {
      control: "text",
      description: "강조 부분 (파란색 + 클릭 가능)",
      table: {
        category: "Props",
        type: { summary: "string" },
      },
    },
    createdAt: {
      control: "text",
      description: "ISO 형식의 생성 시간 (예: 2025-05-22T08:45:00)",
      table: {
        category: "Props",
        type: { summary: "string (ISO8601)" },
      },
    },
    onHighlightClick: {
      control: false,
      description: "highlight 클릭 시 호출되는 이벤트 핸들러",
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
          "알림 목록 내 하나의 알림 아이템입니다. `highlight` 키워드는 강조 표시되며 클릭해서 해당 페이지로 라우팅하거나 이벤트를 발생시킬 수 있습니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationItem>;

export const Default: Story = {
  args: {
    message: "김코드 기사님의 소형이사 견적이 도착했어요",
    highlight: "소형이사 견적",
    createdAt: "2025-05-22T10:30:00",
    onHighlightClick: action("highlight 클릭됨"),
  },
};

export const ClickToNavigate: Story = {
  args: {
    message: "내일은 경기(일산) → 서울(영등포) 이사 예정일이에요",
    highlight: "경기(일산) → 서울(영등포) 이사 예정일",
    createdAt: "2025-05-22T08:45:00",
    onHighlightClick: action("이사 일정 highlight 클릭됨"),
  },
};
