import { Hono } from "hono";

const attendance = new Hono();

attendance.get("/", (c) => {
  // date?
  // Universal
  return c.json({ success: true });
});

attendance.post("/", (c) => {
  // Universal
  return c.json({ success: true });
});

attendance.put("/:id", (c) => {
  // Universal
  return c.json({ success: true });
});

export default attendance;
