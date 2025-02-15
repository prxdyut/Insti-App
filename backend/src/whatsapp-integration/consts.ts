import path from "path";

export const screenshotPath: string = path.join(
  __dirname,
  "public",
  "whatsapp_qr.png"
);
export const userDataDir: string = path.join(
  __dirname,
  "data",
  "browser"
);
export const port: string = process.env.PORT as string;
