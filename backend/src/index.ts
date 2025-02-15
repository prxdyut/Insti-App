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
import transactions from "./routes/transactions";
import { serve } from "bun";
import attendance from "./routes/attendance";
import scores from "./routes/scores";
import attendance_arduino from "./attendance_arduino";
import { format, startOfDay } from "date-fns";
import { Users } from "./models/users";
import { Attendances } from "./models/attendances";
import { appendTrailingSlash } from 'hono/trailing-slash'

const app = new Hono({ strict: true }).basePath("/api");

app.use(appendTrailingSlash());
app.use("*", logger(), prettyJSON());

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "DELETE", "PUT"],
  })
);


app.route("/device", attendance_arduino);
app.route("/assignments", assignments);
app.route("/assignments", submissions);
app.route("/attendance", attendance);
app.route("/doubts", doubts);
app.route("/doubts", replies);
app.route("/scores", scores);
app.route("/alerts", alerts);
app.route("/users", users);
app.route("/holidays", holidays);
app.route("/files", files);
app.route("/performances", performance);
app.route("/resources", resources);
app.route("/schedules", schedule);
app.route("/transactions", transactions);
app.get("/", (c) =>
  c.html(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button id="rzp-button1">Pay</button>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <script>
      const processPayment = async () => {
        const searchParams = new URL(location).searchParams;
        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        const res = await fetch(
          "http://localhost:3000/api/transactions/order/" +
            searchParams.get("id"),
          requestOptions
        ).then((response) => response.json());

        const options = res.options;

        if (!options) {
          alert("Options was not get");
          return;
        }

        const rzp = new Razorpay(options);

        rzp.on("payment.failed", function (response) {
        console.log(response)
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });

        document.getElementById("rzp-button1").onclick = async function (e) {
          e.preventDefault();
          rzp.open();
        };

        alert("ready to pay");
      };

      processPayment();
    </script>
  </body>
</html>
`)
);

app.get("/attendance/punch", async (c) => {
  const uid = c.req.query("uid") as string;
  const timestamp = c.req.query("timestamp") as string;

  if (!uid && !timestamp) throw "Invalid request";

  const User = await Users("3A");
  const user = await User.findOne({ "uid.card": uid, "uid.tag": uid });

  if (!user) throw "User not found";

  const userId = user._id;
  const db = user.batch;
  const date = startOfDay(timestamp);
  const punch = format(date, "HH:mm");

  const Attendance = await Attendances(db);
  await Attendance.findOneAndUpdate(
    { date, userId },
    {
      date,
      userId,
      $push: {
        punches: punch,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return c.json({ success: true }, 200);
});


const port = Bun.env.PORT || 3000;

export default {
  port,
  fetch: app.fetch,
};

console.log("started server");
