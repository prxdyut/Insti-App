const express = require("express");
const { createTransport } = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const transporter = createTransport({
    host: "pradyutdas.online",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "pradyutdas91@pradyutdas.online",
      pass: "1234567890qwertyuiop",
    },
    tls: { rejectUnauthorized: false },
  });

  console.log(transporter)

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

  res.send("Hello, Docker!" + info.messageId);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
