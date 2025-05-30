import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("メールアドレスの形式ではないです。"),
  password: z
    .string()
    .min(1, "文字を入力してください。")
    .min(6, "6文字以上で入力してください。")
    .regex(/^[\x20-\x7E]+$/, "英数字と記号のみを使用してください。"),
});

export type signInValue = z.infer<typeof signInSchema>;
