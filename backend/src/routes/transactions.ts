import { Hono } from "hono";
import executionTimeHeader from "../utils/executionTimeHeader";
import isAuthenticated from "../middlewares/isAuthenticated";
import decodePayload from "../utils/decodePayload";
import {
  createTransactionRequest,
  createValidTransaction,
  getFees,
  getTransactionOptions,
} from "../controllers/transactions";
import { zValidator } from "@hono/zod-validator";
import {
  validateCreateTransactionRequest,
  validateCreateValidTransaction,
} from "../validate/transactions";

const transactions = new Hono();

transactions.get(
  "/order/:id",
  executionTimeHeader,
  getTransactionOptions
);

transactions.post(
  "/validate",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateValidTransaction),
  createValidTransaction
);

transactions.post(
  "/:UId",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateTransactionRequest),
  createTransactionRequest
);

transactions.get(
  "/:UId",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  getFees
);

export default transactions;
