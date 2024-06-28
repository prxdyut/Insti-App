import { z } from "zod";

export const validateCreateHoliday = z.object({
  title: z.string(),
  date: z.coerce.date(),
});
export type createHolidayType = z.infer<typeof validateCreateHoliday>;

export const validateEditHoliday = z.object({
  title: z.string().optional(),
  date: z.coerce.date().optional(),
});
export type editHolidayType = z.infer<typeof validateEditHoliday>;
