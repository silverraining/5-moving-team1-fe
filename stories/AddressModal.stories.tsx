import type { Meta, StoryObj } from "@storybook/react";
import AddressModal from "@/src/components/shared/components/address-card/AddressModal";
import { useState } from "react";

const meta: Meta<typeof AddressModal> = {
  title: "address-card/AddressModal",
  component: AddressModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AddressModal>;

const AddressModalWrapper = ({
  title,
}: {
  title: "출발지를 선택해주세요" | "도착지를 선택해주세요";
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        {title === "출발지를 선택해주세요"
          ? "출발지 선택하기"
          : "도착지 선택하기"}
      </button>
      <AddressModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={(address) => {
          console.log("Selected address:", address);
          setIsOpen(false);
        }}
        title={title}
      />
    </>
  );
};

export const StartingPoint: Story = {
  render: () => <AddressModalWrapper title="출발지를 선택해주세요" />,
};

export const Destination: Story = {
  render: () => <AddressModalWrapper title="도착지를 선택해주세요" />,
};
