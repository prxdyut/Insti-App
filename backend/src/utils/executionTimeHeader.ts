import { createMiddleware } from "hono/factory";

export default createMiddleware(async (c, next) => {
    const start = performance.now();
    await next();
    const end = performance.now();
    const time = Math.round(end - start) + "ms";
    c.header("Execution-Time", time);
  })