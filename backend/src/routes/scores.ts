import { Hono } from "hono";
import executionTimeHeader from "../utils/executionTimeHeader";
import isAuthenticated from "../middlewares/isAuthenticated";
import decodePayload from "../utils/decodePayload";
import { createScores, deleteScore, getScore, getScores } from "../controllers/scores";
import { zValidator } from "@hono/zod-validator";
import { validateCreateScores } from "../validate/scores";

const scores = new Hono();

scores.get("/", executionTimeHeader, isAuthenticated, decodePayload, getScores);
scores.get(
  "/:UId",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  getScore
);
scores.post(
  "/",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateScores),
  createScores
);

scores.put("/:id", (c) => {
  // Tutor - self
  // Admin
  return c.json({ success: true });
});


scores.delete(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  deleteScore
);

export default scores;
