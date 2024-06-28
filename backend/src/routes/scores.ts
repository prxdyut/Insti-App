import { Hono } from "hono";

const scores = new Hono();

scores.get("/:id", (c) => {
  // Universal
  return c.json({ success: true });
});

scores.post("/:id", (c) => {
  // Admin
  // Tutor
  return c.json({ success: true });
});

scores.put("/:id", (c) => {
  // Tutor - self
  // Admin
  return c.json({ success: true });
});

scores.delete("/:id", (c) => {
  // Tutor - self
  // Admin
  return c.json({ success: true });
});

export default scores;
