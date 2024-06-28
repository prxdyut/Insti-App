import { z } from "zod";

export const validateCreateAssignment = z.object({
  title: z.string(),
  subject: z.coerce.number(),
  description: z.string(),
  "files[]": z.array(z.string()),
  scheduleStart: z.coerce.date(),
  scheduleEnd: z.coerce.date(),
});
export type createAssignmentType = z.infer<typeof validateCreateAssignment>;

export const validateEditAssignment = z.object({
  title: z.string().optional(),
  subject: z.coerce.number().optional(),
  description: z.string().optional(),
  "files[]": z.array(z.string()).optional(),
  scheduleStart: z.coerce.date().optional(),
  scheduleEnd: z.coerce.date().optional(),
});
export type editAssignmentType = z.infer<typeof validateEditAssignment>;
