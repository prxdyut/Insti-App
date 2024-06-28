import { Hono } from "hono";
import executionTimeHeader from "../utils/executionTimeHeader";
import isAuthenticated from "../middlewares/isAuthenticated";
import decodePayload from "../utils/decodePayload";
import {
  createResource,
  editResource,
  getResource,
  getResources,
} from "../controllers/resources";
import { zValidator } from "@hono/zod-validator";
import { validateCreateReply } from "../validate/replies";
import { validateCreateResource, validateEditResource } from "../validate/resource";

const resources = new Hono();

resources.get(
  "/",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  getResources
);

resources.get(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  getResource
);

resources.post(
  "/",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateResource),
  createResource
);
resources.put(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateEditResource),
  editResource
);

export default resources;
