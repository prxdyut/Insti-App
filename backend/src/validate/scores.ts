import { z } from "zod";

export const validateCreateScores = z.object({
  subject: z.coerce.number(),
  total: z.coerce.number(),
  title: z.string(),
  date: z.coerce.date(),
  "files_questions[]": z.array(z.string()),
  "files_answers[]": z.array(z.string()),
  "obtained[]": z.array(z.coerce.number()),
});
export type createScoresType = z.infer<typeof validateCreateScores>;

export const validateEditScores = z.object({
  total: z.coerce.number().optional(),
  subject: z.coerce.number().optional(),
  title: z.string().optional(),
  date: z.coerce.date().optional(),
  "files_questions[]": z.array(z.string()).optional(),
  "files_answers[]": z.array(z.string()).optional(),
  "obtained[]": z.array(z.coerce.number()).optional(),
});
export type editScoresType = z.infer<typeof validateEditScores>;
