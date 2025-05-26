import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "이름은 2자 이상이어야 합니다" })
      .max(20, { message: "이름은 20자 이하여야 합니다" })
      .regex(/^[가-힣a-zA-Z0-9]+$/, {
        message: "한글, 영문, 숫자만 사용할 수 있습니다",
      }),
    email: z.string().email({ message: "이메일 형식이 아닙니다" }),
    phone: z.string().regex(/^010\d{8}$/, {
      message: "유효한 휴대폰 번호를 입력해주세요",
    }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자리입니다" })
      .max(20, { message: "비밀번호는 최대 20자리입니다" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/, {
        message: "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다",
      }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
