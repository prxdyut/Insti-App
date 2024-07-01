import { Hono } from "hono";
import {
  createUser,
  editUser,
  getUser,
  getUsers,
  loginUser,
  resetPassword,
  resetPasswordLink,
} from "../controllers/users";
import { zValidator } from "@hono/zod-validator";
import {
  validateCreateUser,
  validateEditUser,
  validateLoginUser,
  validateResetPassword,
  validateResetPasswordLink,
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
  isAuthenticated,
  decodePayload,
  zValidator("form", validateCreateUser),
  createUser
);
users.post(
  "/reset",
  executionTimeHeader,
  zValidator("form", validateResetPasswordLink),
  resetPasswordLink
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