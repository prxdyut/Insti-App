import { Hono } from "hono";
import {
  createUser,
  editUser,
  getUser,
  getUsers,
  loginUser,
  resetPassword,
  setInitPassword,
} from "../controllers/users";
import { zValidator } from "@hono/zod-validator";
import {
  validateCreateUser,
  validateEditUser,
  validateLoginUser,
  validateResetPassword,
  validateSetInitPassword,
} from "../validate/users";
import isAuthenticated from "../middlewares/isAuthenticated";
import decodePayload from "../utils/decodePayload";
import is from "../utils/is";
import executionTimeHeader from "../utils/executionTimeHeader";

const users = new Hono();

users.get("/", executionTimeHeader, isAuthenticated, decodePayload, getUsers);
users.post(
  "/",
  executionTimeHeader,
  zValidator("form", validateCreateUser),
  createUser
);
users.post(
  "/setPassword",
  executionTimeHeader,
  zValidator("form", validateSetInitPassword),
  setInitPassword
);
users.put(
  "/:id",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateEditUser),
  editUser
);
users.post(
  "/:id/reset",
  executionTimeHeader,
  isAuthenticated,
  decodePayload,
  zValidator("form", validateResetPassword),
  resetPassword
);
users.post(
  "/login",
  executionTimeHeader,
  zValidator("form", validateLoginUser),
  loginUser
);

users.get("/:id", executionTimeHeader, isAuthenticated, decodePayload, getUser);

export default users;
