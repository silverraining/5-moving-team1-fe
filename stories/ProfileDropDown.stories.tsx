// ProfileDropDown.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ProfileDropDown from "@/src/components/shared/components/drop-down/profile-drop-down/ProfileDropDown";

const meta: Meta<typeof ProfileDropDown> = {
  title: "drop-down/Profile/ProfileDropDown",
  component: ProfileDropDown,
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileDropDown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ProfileDropDown />,
};
