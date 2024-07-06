import { Hono } from "hono";
import decodePayload from "../utils/decodePayload";
import isAuthenticated from "../middlewares/isAuthenticated";
import executionTimeHeader from "../utils/executionTimeHeader";
import { createReply, deleteReply, getReplies } from "../controllers/replies";
import { zValidator } from "@hono/zod-validator";
import { validateCreateReply } from "../validate/replies";

const replies = new Hono();

replies.get(
  "/:DId/replies",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  getReplies
);

replies.post(
  "/:DId/replies",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateReply),
  createReply
);
replies.delete(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  deleteReply
);

export default replies;
