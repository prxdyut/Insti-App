import { Context } from "hono";
import { Attendances } from "../models/attendances";
import { endOfMonth, startOfMonth } from "date-fns";
import { CreateAttendanceType } from "../validate/attendances";

export const getAttendances = async (c: Context) => {
  const db = c.req.query("db") || "3A";

  const month = c.req.query("month");
  const year = c.req.query("year");
  try {
    if (!month) {
      throw "Month is not provided";
    }
    if (!year) {
      throw "Year is not provided";
    }

    const start = startOfMonth(new Date(Number(year), Number(month) - 1));
    const end = endOfMonth(new Date(Number(year), Number(month) - 1));

    const Attendance = await Attendances(db);
    const data = await Attendance.find({ date: { $gte: start, $lte: end } });

    return c.json({ Attendances: data });
  } catch (error: any) {
    return c.text(`${error}`, 200);
  }
};

export const createAttendances = async (
  c: CustomContext<"form", CreateAttendanceType>
) => {
  const db = c.req.query("db") || "3A";
  const { date, punch, userId } = c.req.valid("form");

  try {
    const Attendance = await Attendances(db);
    const data = await Attendance.findOneAndUpdate(
      { date, userId },
      {
        date,
        userId,
        $push: {
          punches: punch,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return c.json({ Attendances: data });
  } catch (error: any) {
    return c.text(`${error}`, 200);
  }
};
