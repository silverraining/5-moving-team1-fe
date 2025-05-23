import type { Meta, StoryObj, Decorator } from "@storybook/react";
import DropDownWrapper from "@/src/components/shared/components/drop-down/filter-drop-down/DropDownWrapper";
const withContainer: Decorator = (Story) => {
  return (
    <div
      style={{
        width: "500px",
        height: "300px",
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
const meta = {
  title: "drop-down/filter/DropDownWrapper",
  component: DropDownWrapper,
  decorators: [withContainer],
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "desktop",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DropDownWrapper>;
export default meta;
type Story = StoryObj<typeof meta>;

export const RegionDropdown: Story = {
  args: { type: "region", label: "지역" },
  parameters: {
    docs: {
      description: {
        story: "지역 드롭다운을 2열 레이아웃으로 보여줍니다.",
      },
    },
  },
};

export const ServiceDropdown: Story = {
  args: { type: "service", label: "서비스" },
  parameters: {
    docs: {
      description: {
        story: "서비스 유형 드롭다운을 1열 레이아웃으로 보여줍니다.",
      },
    },
  },
};
