import type { Meta, StoryObj } from "@storybook/react";
import AddressCard from "../shared/components/address-card/AddressCard";

const meta = {
  title: "address-card/AddressCard",
  component: AddressCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AddressCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "sm",
    zipCode: "04538",
    newAddress:
      "서울 중구 삼일대로 343 (대신파이낸스센터 Daishin Finance Center)",
    oldAddress: "서울 중구 저동1가 114",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    zipCode: "04538",
    newAddress:
      "서울 중구 삼일대로 343 (대신파이낸스센터 Daishin Finance Center)",
    oldAddress: "서울 중구 저동1가 114",
  },
};

export const Selected: Story = {
  args: {
    size: "md",
    zipCode: "04538",
    newAddress:
      "서울 중구 삼일대로 343 (대신파이낸스센터 Daishin Finance Center)",
    oldAddress: "서울 중구 저동1가 114",
    selected: true,
  },
};
