import { createTransport } from "nodemailer";

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

// async..await is not allowed in global scope, must use a wrapper
async function main() {
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
}

main().catch(console.error);
