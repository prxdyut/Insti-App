import { z } from "zod";

export const validateCreateSubmission = z.object({
  description: z.string(),
  "files[]": z.array(z.string()),
});
export type createSubmissionType = z.infer<typeof validateCreateSubmission>;

export const validateCreateSubmissionStatus = z.object({
  remark: z.string().optional(),
  status: z.coerce.number().min(1).max(2),
});
export type createSubmissionStatusType = z.infer<
  typeof validateCreateSubmissionStatus
>;
