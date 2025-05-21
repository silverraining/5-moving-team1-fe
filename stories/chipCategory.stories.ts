import type { Meta, StoryObj } from "@storybook/react";
import { ChipCategory } from "@/src/components/shared/components/chip/ChipCategory";

const meta: Meta<typeof ChipCategory> = {
  title: "Chip/ChipCategory",
  component: ChipCategory,
};

export default meta;
type Story = StoryObj<typeof ChipCategory>;

export const Mobile: Story = {
  args: {
    type: "small",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1", // 약 375px
    },
  },
};

export const Tablet: Story = {
  args: {
    type: "home",
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet", // 약 768px
    },
  },
};

export const Desktop: Story = {
  args: {
    type: "office",
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop", // 약 1280px
    },
  },
};
