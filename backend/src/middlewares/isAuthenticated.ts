import { bearerAuth } from "hono/bearer-auth";
import { verify } from "hono/jwt";
import { SECRET } from "../variables";

export default bearerAuth({
  verifyToken: async (token, c) => Boolean(await verify(token, SECRET)),
});
