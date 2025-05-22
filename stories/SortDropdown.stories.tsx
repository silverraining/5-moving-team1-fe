import type { Meta, StoryObj } from "@storybook/react";
import SortDropdown, {
  SortOption,
} from "@/src/components/shared/components/drop-down/SortDropdown";

const meta: Meta<typeof SortDropdown> = {
  title: "dropdown/SortDropdown",
  component: SortDropdown,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SortDropdown>;

const sortOptions: SortOption[] = [
  { label: "리뷰 많은순", value: "review-desc" },
  { label: "평점 높은순", value: "rating-desc" },
  { label: "평점 낮은순", value: "rating-asc" },
  { label: "경력 높은순", value: "career-desc" },
  { label: "확정 많은순", value: "confirmed-desc" },
];

export const Default: Story = {
  args: {
    options: sortOptions,
    defaultOption: sortOptions[0],
  },
};
