import { jwt } from "hono/jwt";
import { SECRET } from "../variables";

export default jwt({
  secret: SECRET,
});
