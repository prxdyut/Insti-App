import { z } from "zod";

export const validateCreateReply = z.object({
  replyTo: z.string().optional(),
  description: z.string(),
  "files[]": z.array(z.string()).optional(),
});
export type createReplyType = z.infer<typeof validateCreateReply>;