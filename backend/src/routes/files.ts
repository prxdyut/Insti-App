import { Hono } from "hono";
import executionTimeHeader from "../utils/executionTimeHeader";
import isAuthenticated from "../middlewares/isAuthenticated";
import decodePayload from "../utils/decodePayload";
import { createFile, getFile } from "../controllers/files";
import { zValidator } from "@hono/zod-validator";
import { validateCreateFile } from "../validate/files";

const files = new Hono();

files.get("/:id", executionTimeHeader, isAuthenticated, decodePayload, getFile);
files.post(
  "/",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateFile),
  createFile
);

export default files;
