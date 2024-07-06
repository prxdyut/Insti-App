import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import decodePayload from "../utils/decodePayload";
import isAuthenticated from "../middlewares/isAuthenticated";
import executionTimeHeader from "../utils/executionTimeHeader";
import {
  createAssignment,
  deleteAssignment,
  editAssignment,
  getAssignment,
  getAssignments,
} from "../controllers/assignments";
import {
  validateCreateAssignment,
  validateEditAssignment,
} from "../validate/assignments";

const assignments = new Hono();

assignments.get(
  "/",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  getAssignments
);
assignments.get(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  getAssignment
);
assignments.post(
  "/",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateAssignment),
  createAssignment
);
assignments.put(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateEditAssignment),
  editAssignment
);
assignments.delete(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  deleteAssignment
);

export default assignments;
