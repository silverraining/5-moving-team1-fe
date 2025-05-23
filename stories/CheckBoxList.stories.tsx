import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxList } from "../src/components/shared/components/filter-check-box/CheckboxList";
import { ThemeProvider } from "@mui/material/styles";
import { createAppTheme } from "../public/theme/theme";
import { useState } from "react";

const theme = createAppTheme("light");

const meta: Meta<typeof CheckboxList> = {
  title: "filter-check-box/CheckboxList",
  component: CheckboxList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CheckboxList>;

const defaultItems = [
  { label: "소형이사", count: 10, checked: false },
  { label: "가정이사", count: 2, checked: false },
  { label: "사무실이사", count: 8, checked: false },
];

export const Default: Story = {
  args: {
    title: "이사 유형",
    items: defaultItems,
    onItemChange: () => {},
    onSelectAll: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [items, setItems] = useState(defaultItems);

    const handleSelectAll = (checked: boolean) => {
      setItems(items.map((item) => ({ ...item, checked })));
    };

    const handleItemChange = (index: number, checked: boolean) => {
      setItems(
        items.map((item, i) => ({
          ...item,
          checked: i === index ? checked : item.checked,
        }))
      );
    };

    return (
      <CheckboxList
        title="이사 유형"
        items={items}
        onSelectAll={handleSelectAll}
        onItemChange={handleItemChange}
      />
    );
  },
};
