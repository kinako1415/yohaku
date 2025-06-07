import { z } from "zod";

export const postInSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  area: z.string().min(1, "場所は必須です"),
	startedAt: z.string(), // ← 追加
  endedAt: z.string(),  // ← 追加

});

export type postInValue = z.infer<typeof postInSchema>;
