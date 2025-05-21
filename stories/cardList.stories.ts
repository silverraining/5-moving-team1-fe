import { CardList } from "@/shared/components/card/CardList";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CardList> = {
  title: "cardList",
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
