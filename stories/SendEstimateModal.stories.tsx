import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SendEstimateModal from "@/src/components/shared/components/modal/SendEstimateModal";

const meta: Meta<typeof SendEstimateModal> = {
  title: "Modal/SendEstimateModal",
  component: SendEstimateModal,
};

export default meta;

type Story = StoryObj<typeof SendEstimateModal>;

const Template = () => {
  const [open, setOpen] = useState(true);

  const handleSend = (data: { price: number; comment: string }) => {
    console.log("Storybook: 견적 전송", data);
    alert(`견적 전송됨!\n가격: ${data.price}\n코멘트: ${data.comment}`);
  };

  return (
    <SendEstimateModal
      open={open}
      onClose={() => setOpen(false)}
      onSend={handleSend}
      moveType={["small", "designation"]}
      customerName="김코드"
      moveDate="2024. 07. 01 (월)"
      fromAddress="서울시 중구"
      toAddress="경기도 수원시"
    />
  );
};

export const Default: Story = {
  render: () => <Template />,
};
