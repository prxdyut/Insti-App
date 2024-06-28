import { z } from "zod";

export const validateCreateFile = z.object({
  name: z.string(),
  url: z.string(),
  size: z.coerce.number(),
  type: z.string(),
  s3Bucket: z.string(),
  s3Key: z.string(),
});
export type createFileType = z.infer<typeof validateCreateFile>;
