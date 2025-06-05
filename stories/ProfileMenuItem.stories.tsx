// ProfileMenuItem.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ProfileMenuItem from "@/src/components/shared/components/drop-down/profile-drop-down/ProfileMenuItem";

const meta: Meta<typeof ProfileMenuItem> = {
  title: "drop-down/Profile/ProfileMenuItem",
  component: ProfileMenuItem,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    nickname: { control: "text" },
    bold: { control: "boolean" },
    type: {
      control: "select",
      options: ["nickname", "menu", "logout"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileMenuItem>;

export const Nickname: Story = {
  args: {
    nickname: "김가나",
    bold: true,
    type: "nickname",
  },
};

export const MenuItem: Story = {
  args: {
    label: "프로필 수정",
    type: "menu",
  },
};

export const Logout: Story = {
  args: {
    label: "로그아웃",
    type: "logout",
  },
};
