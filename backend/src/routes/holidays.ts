import { Hono } from "hono";
import executionTimeHeader from "../utils/executionTimeHeader";
import isAuthenticated from "../middlewares/isAuthenticated";
import decodePayload from "../utils/decodePayload";
import {
  validateCreateHoliday,
  validateEditHoliday,
} from "../validate/holidays";
import { zValidator } from "@hono/zod-validator";
import { createHoliday, deleteHoliday, editHoliday } from "../controllers/holidays";

const holidays = new Hono();

holidays.post(
  "/",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateHoliday),
  createHoliday
);
holidays.put(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateEditHoliday),
  editHoliday
);
holidays.delete(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  deleteHoliday
);

export default holidays;
