import { z } from "zod";

export const usernameSchema = z.object({
  username: z
    .string()
    .min(1, "文字を入力してください。")
    .max(20, "ユーザーネームは20文字以下で入力してください")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "ユーザーネームは英数字とアンダースコアのみ使用できます"
    ),
});

export type UsernameValue = z.infer<typeof usernameSchema>;
