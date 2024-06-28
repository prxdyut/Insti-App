import { Context } from "hono";
import { Performances } from "../models/performances";

export const getPerformance = async (c: Context) => {
  const id = c.req.param("id");
  const db = c.req.query("db") || "3A";
  const start = c.req.query("start");
  const end = c.req.query("end");
  if (!(start && end)) return c.text("Date range is not provided", 400);

  const Performance = await Performances(db);
  const data = await Performance.findById(id);
  if (!data) return c.text("Performance Report not found", 400);
  return c.json({ Performance: data });
};
