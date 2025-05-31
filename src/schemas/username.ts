import { z } from "zod";

export const usernameSchema = z.object({
  username: z
    .string()
    .min(1, "文字を入力してください。")
    .max(20, "ユーザーネームは20文字以下で入力してください"),
});

export type UsernameValue = z.infer<typeof usernameSchema>;
