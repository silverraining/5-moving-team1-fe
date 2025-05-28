import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 아닙니다" }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자리입니다" })
    .max(20, { message: "비밀번호는 최대 20자리입니다" })
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{}|\\:;"'<>,.?/~`])/,
      {
        message: "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다",
      }
    ),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
