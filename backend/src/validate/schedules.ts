import { z } from "zod";

export const validateCreateSchedule = z.object({
  subject: z.string(),
  title: z.string(),
  date: z.coerce.date(),
  timeStart: z.string(),
  timeEnd: z.string(),
});
export type createScheduleType = z.infer<typeof validateCreateSchedule>;

export const validateEditSchedule = z.object({
  subject: z.string().optional(),
  title: z.string().optional(),
  date: z.coerce.date().optional(),
  timeStart: z.string().optional(),
  timeEnd: z.string().optional(),
});
export type editScheduleType = z.infer<typeof validateEditSchedule>;
