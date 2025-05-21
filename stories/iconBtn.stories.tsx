import type { Meta, StoryObj } from "@storybook/react";
import {
  Clip,
  Like,
  Kakao,
  FaceBook,
} from "@/src/components/shared/components/icon-btn/IconBtn";

const meta: Meta = {
  title: "IconBtn",
};

export default meta;

export const LikeButton: StoryObj = {
  render: () => <Like />,
};

export const ClipButton: StoryObj = {
  render: () => <FaceBook />,
};
export const FaceBookButton: StoryObj = {
  render: () => <Clip />,
};
export const KakaoButton: StoryObj = {
  render: () => <Kakao />,
};
