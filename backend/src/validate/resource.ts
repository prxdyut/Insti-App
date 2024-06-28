import { z } from "zod";

export const validateCreateResource = z.object({
  title: z.string(),
  subject: z.string(),
  priority: z.string(),
  file: z.string(),
});
export type createResourceType = z.infer<typeof validateCreateResource>;

export const validateEditResource = z.object({
  title: z.string().optional(),
  subject: z.string().optional(),
  priority: z.string().optional(),
  file: z.string().optional(),
});
export type editResourceType = z.infer<typeof validateEditResource>;
