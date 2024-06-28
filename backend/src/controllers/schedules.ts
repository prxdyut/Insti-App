import { Context } from "hono";
import { Schedules } from "../models/schedules";
import { createScheduleType, editScheduleType } from "../validate/schedules";
import { endOfMonth, startOfMonth } from "date-fns";

export const getSchedules = async (c: Context) => {
  const db = c.req.query("db") || "3A";
  const month = c.req.query("month");
  const year = c.req.query("year");
  if (month && !Number(month)) return c.text("Month is not provided", 400);
  if (year && !Number(year)) return c.text("Year is not provided", 400);

  const start = startOfMonth(new Date(Number(year), Number(month) - 1));
  const end = endOfMonth(new Date(Number(year), Number(month) - 1));

  const Schedule = await Schedules(db);
  const data = await Schedule.find({ date: { $gte: start, $lte: end } });
  
  return c.json({ Schedules: data });
};

export const createSchedule = async (
  c: CustomContext<"form", createScheduleType>
) => {
  const { title, date, timeStart, timeEnd, subject } = c.req.valid("form");
  const payload = c.get("jwtPayload");
  const db = c.req.query("db") || "3A";
  const Schedule = await Schedules(db);
  const data = await Schedule.insertMany([
    {
      title,
      date,
      subject,
      time: {
        start: timeStart,
        end: timeEnd,
      },
      createdBy: payload?.id,
    },
  ]);
  return c.json({ Schedule: data });
};

export const editSchedule = async (
  c: CustomContext<"form", editScheduleType>
) => {
  const id = c.req.param("id");
  const { title, date, subject, timeStart, timeEnd } = c.req.valid("form");
  const { id: userId, role } = c.get("jwtPayload");

  const db = c.req.query("db") || "3A";
  const Schedule = await Schedules(db);
  let data = (await Schedule.findById(id)) as Schedules;

  if (!data) {
    return c.text("Schedule not found", 400);
  }

  if (data.createdBy != userId ? role != 2 : false) {
    return c.text("You are not Authorised to perform this action", 400);
  }

  data = (await Schedule.findByIdAndUpdate(
    id,
    {
      title,
      date,
      timeStart,
      timeEnd,
      subject,
    },
    { new: true }
  )) as Schedules;

  return c.json({ Schedule: data });
};
