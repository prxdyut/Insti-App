import { Hono } from "hono";
import executionTimeHeader from "../utils/executionTimeHeader";
import isAuthenticated from "../middlewares/isAuthenticated";
import decodePayload from "../utils/decodePayload";
import {
  createSchedule,
  editSchedule,
  getSchedules,
} from "../controllers/schedules";
import { zValidator } from "@hono/zod-validator";
import { validateCreateSchedule, validateEditSchedule } from "../validate/schedules";

const schedule = new Hono();

schedule.get(
  "/",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  getSchedules
);

schedule.post(
  "/",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateSchedule),
  createSchedule
);

schedule.put("/:id", 
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateEditSchedule),
editSchedule
);

export default schedule;
