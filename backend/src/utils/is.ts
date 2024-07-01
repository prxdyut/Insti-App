import { createMiddleware } from "hono/factory";

type Status = "admin" | "tutor" | "student";

export default (...roles: Status[]) => {
  return createMiddleware(async (c, next) => {
    const { role } = c.get("jwtPayload");
    if (!role) {
      c.res = new Response("Forbidden Action", { status: 400 });
    }
    if (
      (roles.includes("admin") && role === 2) ||
      (roles.includes("tutor") && role === 1) ||
      (roles.includes("student") && role === 0)
    )
      await next();
    else c.res = new Response("Forbidden Action", { status: 400 });
  });
};
