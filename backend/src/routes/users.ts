import { Hono } from "hono";
import {
  createUser,
  editUser,
  getUser,
  getUsers,
  loginUser,
  resetPassword,
} from "../controllers/users";
import { zValidator } from "@hono/zod-validator";
import {
  validateCreateUser,
  validateEditUser,
  validateLoginUser,
  validateResetPassword,
} from "../validate/users";
import isAuthenticated from "../middlewares/isAuthenticated";
import decodePayload from "../utils/decodePayload";
import is from "../utils/is";

const users = new Hono();

users.get(
  "/",
  // isAuthenticated,
  // decodePayload,
  // is("tutor", "admin", "student"),
  getUsers
);
users.get("/:id", getUser);
users.post("/", zValidator("form", validateCreateUser), createUser);
users.put("/:id", zValidator("form", validateEditUser), editUser);
users.post("/reset", zValidator("form", validateResetPassword), resetPassword);
users.post("/login", zValidator("form", validateLoginUser), loginUser);

export default users;
