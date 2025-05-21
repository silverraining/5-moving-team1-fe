import type { Meta, StoryObj } from "@storybook/react";
import { CardList } from "@/src/components/shared/components/card/CardList";

const meta: Meta<typeof CardList> = {
  title: "CardList",
  component: CardList,
  parameters: {
    docs: {
      description: {
        component: "A button component for shared use",
      },
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof CardList>;

export const base: Story = {
  args: { variant: "small" },
};
