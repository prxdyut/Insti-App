import { Hono } from "hono";
import { createAttendances, getAttendances } from "../controllers/attendances";
import executionTimeHeader from "../utils/executionTimeHeader";
import isAuthenticated from "../middlewares/isAuthenticated";
import decodePayload from "../utils/decodePayload";
import { zValidator } from "@hono/zod-validator";
import { validateCreateAttendance } from "../validate/attendances";

const attendance = new Hono();

attendance.get(
  "/",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  getAttendances
);

attendance.post(
  "/",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateAttendance),
  createAttendances
);

export default attendance;
