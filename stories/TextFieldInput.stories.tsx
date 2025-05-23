import type { Meta, StoryObj } from "@storybook/react";
import TextField from "@/src/components/shared/components/text-field";
import { Button } from "@mui/material";
import { InputHTMLAttributes } from "react";
import { useForm } from "react-hook-form";

type InputType = NonNullable<InputHTMLAttributes<HTMLInputElement>["type"]>;

const inputTypeOptions: InputType[] = [
  "text",
  "password",
  "email",
  "number",
  "search",
  "tel",
  "url",
];

import { RegisterOptions } from "react-hook-form";

const getRegisterRules = (type: InputType): RegisterOptions => {
  switch (type) {
    case "text":
    case "search":
      return {
        required: "이 필드는 필수입니다.",
        minLength: {
          value: 2,
          message: "최소 2자 이상 입력해주세요.",
        },
        maxLength: {
          value: 100,
          message: "최대 100자까지 입력 가능합니다.",
        },
      };

    case "email":
      return {
        required: "이메일을 입력해주세요.",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "유효한 이메일 주소를 입력해주세요.",
        },
      };

    case "password":
      return {
        required: "비밀번호를 입력해주세요.",
        minLength: {
          value: 6,
          message: "비밀번호는 최소 6자 이상이어야 합니다.",
        },
      };

    case "number":
      return {
        required: "숫자를 입력해주세요.",
        valueAsNumber: true,
        min: {
          value: 0,
          message: "0 이상의 숫자만 입력 가능합니다.",
        },
      };

    case "url":
      return {
        required: "URL을 입력해주세요.",
        pattern: {
          value: /^(https?:\/\/)?([\w\d-]+\.){1,2}[\w]{2,}(\/.*)?$/i,
          message: "유효한 URL을 입력해주세요.",
        },
      };

    case "tel":
      return {
        required: "전화번호를 입력해주세요.",
        pattern: {
          value: /^[0-9]{9,11}$/,
          message: "숫자만 입력하며 9~11자리여야 합니다.",
        },
      };

    default:
      return {};
  }
};

const meta: Meta = {
  title: "TextField",
  component: TextField.Input,
  argTypes: {
    type: {
      control: { type: "radio" },
      options: inputTypeOptions,
    },
  },
};
export default meta;

export const Input: StoryObj<typeof TextField.Input> = {
  render: (args) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = (data: any) => {
      alert(JSON.stringify(data, null, 2));
    };
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField.Input
          errorMessage={errors.value?.message?.toString()}
          {...args}
          register={register(
            "value",
            getRegisterRules((args?.type as InputType) || "text")
          )}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    );
  },
  args: {
    placeholder: "메시지를 입력하세요",
  },
};
