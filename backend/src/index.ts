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
import { createTransport } from "nodemailer";

const app = new Hono().basePath("/api");

app.use("*", logger(), prettyJSON());

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "DELETE", "PUT"],
  })
);

//Home Route
app.get("/", async (c) => {
  const transporter = createTransport({
    host: "mail.pradyutdas.online",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "pradyutdas91@pradyutdas.online",
      pass: "1234567890qwertyuiop",
    },
    tls: { rejectUnauthorized: false },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <pradyutdas91@pradyutdas.online>', // sender address
    to: "daspradyut516@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
});

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
