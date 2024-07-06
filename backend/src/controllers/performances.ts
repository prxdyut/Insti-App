import { Context } from "hono";
import { Scores } from "../models/scores";
import { Attendances } from "../models/attendances";
import calculateAveragePercentage from "../utils/calculateAveragePercentage";
import { Holidays } from "../models/holidays";
import calculateAttendance from "../utils/calculateAttendance";

export const getPerformance = async (c: Context) => {
  const UId = c.req.param("UId");
  const db = c.req.query("db") || "3A";
  const start = c.req.query("start");
  const end = c.req.query("end");

  if (!(start && new Date(start))) throw "Start is not provided";
  if (!(end && new Date(end))) throw "End is not provided";

  try {
    const Score = await Scores(db);
    const Attendance = await Attendances(db);
    const Holiday = await Holidays(db);

    const scores = await Score.find({
      date: { $gte: start, $lte: end },
      "obtained.student": UId,
      deleted: false
    }).select(["obtained", "total", "subject"]);
    const attendances = await Attendance.find({
      date: { $gte: start, $lte: end },
      userId: UId,
      deleted: false
    }).select(["punches", "date"]);
    const holidays = await Holiday.find({
      date: { $gte: start, $lte: end },
      deleted: false
    }).select(["title", "date"]);

    let data = {
      scores: calculateAveragePercentage(scores, UId),
      attendance: calculateAttendance(
        { attendances, holidays },
        new Date(start),
        new Date(end)
      ),
    };

    return c.json({ ...data });
  } catch (error: any) {
    return c.text(error, 400);
  }
};
