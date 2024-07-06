import { Context } from "hono";
import { Schedules } from "../models/schedules";
import { createScheduleType, editScheduleType } from "../validate/schedules";
import { endOfMonth, startOfMonth } from "date-fns";

export const getSchedules = async (c: Context) => {
  const db = c.req.query("db") || "3A";
  const month = c.req.query("month");
  const year = c.req.query("year");
  if (month && !Number(month)) {
    throw "Month is not provided";
  }
  if (year && !Number(year)) {
    throw "Year is not provided";
  }

  try {
    const start = startOfMonth(new Date(Number(year), Number(month) - 1));
    const end = endOfMonth(new Date(Number(year), Number(month) - 1));

    const Schedule = await Schedules(db);
    const data = await Schedule.find({ date: { $gte: start, $lte: end }, deleted:false });

    return c.json({ Schedules: data });
  } catch (error: any) {
    return c.text(`${error}`, 400);
  }
};

export const createSchedule = async (
  c: CustomContext<"form", createScheduleType>
) => {
  const { title, date, timeStart, timeEnd, subject } = c.req.valid("form");
  const payload = c.get("jwtPayload");
  const db = c.req.query("db") || "3A";
  const Schedule = await Schedules(db);

  try {
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
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const editSchedule = async (
  c: CustomContext<"form", editScheduleType>
) => {
  const id = c.req.param("id");
  const { title, date, subject, timeStart, timeEnd } = c.req.valid("form");
  const { id: userId, role } = c.get("jwtPayload");

  const db = c.req.query("db") || "3A";
  const Schedule = await Schedules(db);

  try {
    let data = (await Schedule.findById(id)) as Schedules;

    if (!data) {
      throw "Schedule not found";
    }

    if (data.createdBy != userId && role != 2) {
      throw "You are not Authorised to perform this action";
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
  } catch (error: any) {
    return c.text(error, 400);
  }
};

export const deleteSchedule = async (c: Context) => {
  const id = c.req.param("id");
  const { id: userId, role } = c.get("jwtPayload");
  const db = c.req.query("db") || "3A";
  let data;

  try {
    const Schedule = await Schedules(db);
    data = await Schedule.findOne({_id: id, deleted: false});

    if (!data) {
      throw "Schedule not found";
    }

    if (data.createdBy != userId && role != 2) {
      throw "You are not Authorised to perform this action";
    }

    data = await Schedule.findByIdAndUpdate(
      id,
      {
        deleted: true,
      },
      { new: true }
    );

    return c.json({});
  } catch (error: any) {
    return c.text(error, 400);
  }
};
