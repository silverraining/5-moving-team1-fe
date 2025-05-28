import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(2, "이름은 최소 2자 이상이어야 합니다.")
    .max(20, "이름은 최대 20자까지 가능합니다."),
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  phone: z.string().regex(/^010\d{8}$/, "유효한 전화번호를 입력해주세요."),
});

const passwordFields = {
  currentPassword: z.string(),
  newPassword: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자리입니다" })
    .max(20, { message: "비밀번호는 최대 20자리입니다" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,20}$/, {
      message: "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다",
    }),
  confirmPassword: z.string(),
};

export const passwordChangeSchema = z
  .object(passwordFields)
  .refine(
    (data) => {
      if (data.currentPassword || data.newPassword || data.confirmPassword) {
        return data.currentPassword && data.newPassword && data.confirmPassword;
      }
      return true;
    },
    {
      message: "모든 비밀번호 필드를 입력해주세요.",
      path: ["confirmPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["confirmPassword"],
    }
  );

export const profileEditSchema = z.object({
  ...personalInfoSchema.shape,
  ...passwordFields,
  serviceType: z.array(z.string()).min(1, "최소 하나의 서비스를 선택해주세요."),
  serviceRegion: z.array(z.string()).min(1, "최소 하나의 지역을 선택해주세요."),
  imageUrl: z.string().optional(),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;
export type ProfileEditFormData = z.infer<typeof profileEditSchema>;
