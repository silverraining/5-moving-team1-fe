import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../src/components/shared/components/filter-check-box/Checkbox";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "filter-check-box/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    count: { control: "number" },
    checked: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "소형이사",
    count: 10,
    checked: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label="소형이사"
        count={10}
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};
