import { z } from "zod";

export const validateCreateDoubt = z.object({
  title: z.string(),
  subject: z.coerce.number(),
  description: z.string(),
  "files[]": z.array(z.string()),
});
export type createDoubtType = z.infer<typeof validateCreateDoubt>;

export const validateEditDoubt = z.object({
  title: z.string().optional(),
  subject: z.coerce.number().optional(),
  description: z.string().optional(),
  "files[]": z.array(z.string()).optional(),
});
export type editDoubtType = z.infer<typeof validateEditDoubt>;
