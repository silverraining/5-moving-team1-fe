import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { Button } from "@mui/material";
import { RequestModal } from "@/src/components/shared/components/modal/requestModal";

const meta: Meta<typeof RequestModal> = {
  title: "Modal",
  component: RequestModal,
  argTypes: {
    onClose: { action: "닫기" },
    onSubmit: { action: "요청하기" },
  },
};
export default meta;

type Story = StoryObj<typeof RequestModal>;

export const Request: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        <RequestModal
          {...args}
          open={open}
          onClose={() => {
            args.onClose?.();
            setOpen(false);
          }}
          onSubmit={() => {
            args.onSubmit?.();
            setOpen(false);
          }}
        />
      </>
    );
  },
};
