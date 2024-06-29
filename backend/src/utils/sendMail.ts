import { createTransport } from "nodemailer";
import SMTPTransport = require("nodemailer/lib/smtp-transport");

const domain = Bun.env.MAIL_DOMAIN as string;
const alias = Bun.env.MAIL_ALIAS as string;
const pass = Bun.env.MAIL_PASSWORD as string;
const name = Bun.env.MAIL_NAME as string;
const user = `${alias}@${domain}`;

const transporter = createTransport({
  host: domain,
  port: 587,
  secure: false,
  auth: {
    user,
    pass,
  },
  tls: { rejectUnauthorized: false },
});

export default (to: string, subject: string, content: string) => {
  return transporter.sendMail({
    from: '"' + name + '" <' + user + ">",
    to,
    subject,
    html: content,
  }) as Promise<SMTPTransport.SentMessageInfo>;
};
