import { Hono } from "hono";
import { Alerts } from "../models/alerts";
import { zValidator } from "@hono/zod-validator";
import { validateCreateAlert, validateEditAlert } from "../validate/alerts";
import { createMiddleware } from "hono/factory";
import decodePayload from "../utils/decodePayload";
import isAuthenticated from "../middlewares/isAuthenticated";
import executionTimeHeader from "../utils/executionTimeHeader";
import {
  createAlert,
  deleteAlert,
  editAlert,
  getAlert,
  getAlerts,
} from "../controllers/alerts";

const alerts = new Hono();

alerts.get("/", executionTimeHeader, isAuthenticated, decodePayload, getAlerts);
alerts.get(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  getAlert
);
alerts.post(
  "/",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateAlert),
  createAlert
);
alerts.put(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateEditAlert),
  editAlert
);
alerts.delete(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  deleteAlert
);

export default alerts;
