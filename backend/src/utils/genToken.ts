import { Jwt } from "hono/utils/jwt";

export default (id: string) => {
  return Jwt.sign({ id }, Bun.env.JWT_SECRET || "");
};
