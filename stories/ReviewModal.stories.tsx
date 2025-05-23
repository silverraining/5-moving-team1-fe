import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ReviewModal from "@/src/components/shared/components/modal/ReviewModal";

const meta: Meta<typeof ReviewModal> = {
  title: "Components/ReviewModal",
  component: ReviewModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof ReviewModal>;

// ✅ moveType은 배열, onSubmit은 ReviewModal의 props 시그니처에 맞게 수정
const ReviewModalWrapper = () => {
  const [open, setOpen] = useState(true);

  const handleSubmit = (
    moverName: string,
    moveDate: string,
    price: number,
    rating: number,
    comment: string,
    moveType: string[]
  ) => {
    console.log("리뷰 제출:", {
      moverName,
      moveDate,
      price,
      rating,
      comment,
      moveType,
    });
    setOpen(false);
  };

  return (
    <ReviewModal
      isOpen={open}
      onClose={() => setOpen(false)}
      onSubmit={handleSubmit}
      moverName="김코드 기사님"
      moveDate="2024.07.01"
      price={210000}
      moveType={["small", "designation"]}
    />
  );
};

export const Default: Story = {
  render: () => <ReviewModalWrapper />,
};
