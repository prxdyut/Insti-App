import { validator } from "hono/validator";
import validateType from "../utils/validateType";

export const validateUser = validator("form", (values, c) =>
  validateType(values, c, [
    { key: "first", type: "string" },
    { key: "last", type: "string" },
    { key: "password", type: "string" },
    { key: "role", type: "number", tryConvert: (v: string) => parseInt(v) },
    { key: "phone", type: "string" },
    { key: "email", type: "string" },
  ])
);
