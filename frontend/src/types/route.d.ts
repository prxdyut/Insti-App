type CustomRouteObject = RouteObject & {
    access?: Array<"student" | "tutor" | "admin">;
    noUI?: boolean;
    ui?: UI | boolean;
  };