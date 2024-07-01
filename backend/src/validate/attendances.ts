import { z } from "zod";

export const validateCreateAttendance = z.object({
  punch: z.string(),
  date: z.coerce.date(),
  userId: z.string(),
});
export type CreateAttendanceType = z.infer<typeof validateCreateAttendance>;

export const validateEditAttendance = z.object({
  punch: z.string(),
  date: z.coerce.date(),
  userId: z.string(),
});
export type EditAttendanceType = z.infer<typeof validateEditAttendance>;
