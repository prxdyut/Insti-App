import { Hono } from "hono";
import {
  createDoubt,
  editDoubt,
  getDoubt,
  getDoubts,
} from "../controllers/doubts";
import executionTimeHeader from "../utils/executionTimeHeader";
import isAuthenticated from "../middlewares/isAuthenticated";
import decodePayload from "../utils/decodePayload";
import { zValidator } from "@hono/zod-validator";
import { validateCreateDoubt, validateEditDoubt } from "../validate/doubts";

const doubts = new Hono();

doubts.get("/", executionTimeHeader, isAuthenticated, decodePayload, getDoubts);

doubts.post(
  "/",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateDoubt),
  createDoubt
);

doubts.get(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  getDoubt
);

doubts.put(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateEditDoubt),
  editDoubt
);

export default doubts;
