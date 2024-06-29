import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import users from "./routes/users";
import alerts from "./routes/alerts";
import assignments from "./routes/assignments";
import submissions from "./routes/submissions";
import holidays from "./routes/holidays";
import files from "./routes/files";
import performance from "./routes/performance";
import replies from "./routes/replies";
import doubts from "./routes/doubts";
import resources from "./routes/resources";
import schedule from "./routes/schedule";

const app = new Hono().basePath("/api");

app.use("*", logger(), prettyJSON());

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "DELETE", "PUT"],
  })
);

app.route("/assignments", assignments);
app.route("/assignments", submissions);
app.route("/doubts", doubts);
app.route("/doubts", replies);
app.route("/alerts", alerts);
app.route("/users", users);
app.route("/holidays", holidays);
app.route("/files", files);
app.route("/performances", performance);
app.route("/resources", resources);
app.route("/schedules", schedule);

const port = Bun.env.PORT || 3000;

export default {
  port,
  fetch: app.fetch,
};

console.log("started server");