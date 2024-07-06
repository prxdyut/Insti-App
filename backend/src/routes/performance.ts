import { Hono } from "hono";
import executionTimeHeader from "../utils/executionTimeHeader";
import isAuthenticated from "../middlewares/isAuthenticated";
import decodePayload from "../utils/decodePayload";
import { getPerformance } from "../controllers/performances";

const performance = new Hono();

performance.get(
  "/:UId",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  getPerformance
);

export default performance;
