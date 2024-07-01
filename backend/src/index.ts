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
app.route("/transactions", transactions);
app.get("/", c => c.html(`<!DOCTYPE html>
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
`))
const port = Bun.env.PORT || 3000;

export default {
  port,
  fetch: app.fetch,
};

console.log("started server");
