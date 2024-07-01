import { Context } from "hono";
import { Performances } from "../models/performances";

export const getPerformance = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const db = c.req.query("db") || "3A";
    const start = c.req.query("start");
    const end = c.req.query("end");
    if (!(start && end)) {
      throw "Date range is not provided";
    }

    const Performance = await Performances(db);
    const data = await Performance.findById(id);
    if (!data) {
      throw "Performance Report not found";
    }
    return c.json({ Performance: data });
  } catch (error: any) {
    return c.text(error, 400) ; }
};
