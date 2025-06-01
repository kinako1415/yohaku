import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email("メールアドレスの形式ではないです。"),
    password: z
      .string()
      .min(6, "6文字以上で入力してください。")
      .regex(/^[\x20-\x7E]+$/, "英数字と記号のみを使用してください。"),
    passwordConfirm: z.string().min(1, "文字を入力してください。"),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        path: ["passwordConfirm"],
        code: "custom",
        message: "同じパスワードを入力してください。",
      });
    }
  });

export type signUpValue = z.infer<typeof signUpSchema>;
