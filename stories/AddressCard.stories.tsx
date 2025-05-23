import type { Meta, StoryObj } from "@storybook/react";
import AddressCard from "@/src/components/shared/components/address-card/AddressCard";

const meta = {
  title: "address-card/AddressCard",
  component: AddressCard,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AddressCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    zipCode: "04538",
    roadAddress:
      "서울 중구 삼일대로 343 (대신파이낸스센터 Daishin Finance Center)",
    jibunAddress: "서울 중구 저동1가 114",
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본적인 주소 카드입니다. 600px 이상에서는 큰 버전으로, 미만에서는 작은 버전으로 자동 변환됩니다.",
      },
    },
  },
};

export const Selected: Story = {
  args: {
    zipCode: "04538",
    roadAddress:
      "서울 중구 삼일대로 343 (대신파이낸스센터 Daishin Finance Center)",
    jibunAddress: "서울 중구 저동1가 114",
    selected: true,
  },
  parameters: {
    docs: {
      description: {
        story: "선택된 상태의 주소 카드입니다.",
      },
    },
  },
};
