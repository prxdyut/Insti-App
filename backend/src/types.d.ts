type CustomContext<Target, Schema> = import("hono").Context<
  {},
  "/",
  {
    in: {
      [key in Target]: Schema;
    };
    out: {
      [key in Target]: Schema;
    };
  }
>;
