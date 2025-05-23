import type { Meta, StoryObj } from "@storybook/react";
import { ReviewChart } from "@/src/components/shared/components/review-chart/ReviewChart";

const meta: Meta<typeof ReviewChart> = {
  title: "ReviewChart",
  component: ReviewChart,
  parameters: {
    docs: {
      description: {
        component: "A button component for shared use",
      },
    },
  },
  argTypes: {
    data: {
      control: "object",
      defaultValue: {
        average: 2.5,
        score: {
          1: 100,
          2: 100,
          3: 100,
          4: 100,
          5: 100,
        },
        max: 500,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ReviewChart>;

export const chart: Story = {
  args: {
    data: {
      average: 2.5,
      score: {
        1: 100,
        2: 100,
        3: 100,
        4: 100,
        5: 100,
      },
      max: 500,
    },
  },
};
