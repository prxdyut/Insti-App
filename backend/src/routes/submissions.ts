import { Hono } from "hono";
import {
  createSubmission,
  createSubmissionStatus,
  getSubmissions,
} from "../controllers/submissions";
import executionTimeHeader from "../utils/executionTimeHeader";
import isAuthenticated from "../middlewares/isAuthenticated";
import decodePayload from "../utils/decodePayload";
import { zValidator } from "@hono/zod-validator";
import {
  validateCreateSubmission,
  validateCreateSubmissionStatus,
} from "../validate/submissions";

const submissions = new Hono();

submissions.get(
  "/:id/submissions",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  getSubmissions
);

submissions.post(
  "/:id/submissions",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateSubmission),
  createSubmission
);

submissions.put(
  "/:Aid/submissions/:Sid",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateSubmissionStatus),
  createSubmissionStatus
);

export default submissions;
