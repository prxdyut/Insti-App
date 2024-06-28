import { z } from "zod";

export const validateCreateAlert = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  "files[]": z.array(z.string()),
  buttonLabel: z.string().optional(),
  buttonUrl: z.string().optional(),
});
export type createAlertType = z.infer<typeof validateCreateAlert>;

export const validateEditAlert = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  "files[]": z.array(z.string()).optional(),
  buttonLabel: z.string().optional(),
  buttonUrl: z.string().optional(),
});
export type editAlertType = z.infer<typeof validateEditAlert>;
