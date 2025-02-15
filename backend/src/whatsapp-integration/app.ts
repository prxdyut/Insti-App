// @ts-nocheck
import express, { Express, Request, Response } from "express";
import { screenshotPath, userDataDir } from "./consts";
import { Context } from "./definitions";
import puppeteer from "puppeteer";
import { promises } from "fs";
import Jimp from "jimp";
import QrCode from "qrcode-reader";

let app: Express = express();
let port: number = 6969;
let context: Context = { browser: null, page: null };

interface QueueItem {
  task: () => Promise<any>;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}
type FailedMessage = {
  contactName?: string;
  phoneNumber?: string;
  message: string;
  error: string;
};

let failedMessages: FailedMessage[] = [];
class RequestQueue {
  private queue: QueueItem[] = [];
  private isProcessing: boolean = false;

  enqueue(task: () => Promise<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    const { task, resolve, reject } = this.queue.shift()!;

    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.isProcessing = false;
      this.processQueue();
    }
  }
}

const requestQueue = new RequestQueue();

app.use(express.json());
app.use(express.static("public"));

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default async function initializeBrowser(): Promise<void> {
  try {
    context.browser = await puppeteer.launch({
      headless: true,
      userDataDir: "./data",
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
      executablePath: process.env.CHROME_PATH as string || '/usr/bin/google-chrome-stable',
    });
    context.page = await context.browser?.newPage();
    await context.page.setViewport({
      width: 1366,
      height: 768,
      deviceScaleFactor: 1,
    });
    await context.page?.goto("https://web.whatsapp.com");
    console.log("Browser initialized and WhatsApp Web loaded");
  } catch (error) {
    console.error("Error initializing browser:", error);
    throw error;
  }
}

async function openContact(contactName: string): Promise<void> {
  try {
    if (!context.page) throw new Error("Page not initialized");
    await context.page.waitForSelector(
      'div[contenteditable="true"][data-tab="3"][aria-label="Search input textbox"]',
      {
        timeout: 60000,
      }
    );
    await context.page.type(
      'div[contenteditable="true"][data-tab="3"][aria-label="Search input textbox"]',
      contactName
    );
    await delay(500)
    await context.page.waitForSelector(
      `span[title="${contactName}"]`,
      {
        timeout: 5000,
      }
    );
    await context.page.click(
      `span[title="${contactName}"]`
    );
    await delay(1000)
  } catch (error) {
    console.log(error);
    throw new Error("Cannot open contact.");
  }
}

async function verifyChat(
  contactName: string,
  phoneNumber: string
): Promise<void> {
  console.log(contactName, phoneNumber);

  try {
    if (!context.page) throw new Error("Page not initialized");
    await context.page.waitForSelector("#main", {
      timeout: 5000,
    });
    let verifiedChat = false;

    verifiedChat = await context.page.evaluate(
      ({ contactName, phoneNumber }) => {
        const text = document
          .querySelector("#main")
          .innerText.replaceAll(" ", "");
        const contactMatches = text.includes(
          (contactName || " ").replaceAll(" ", "")
        );
        const phoneMatches = text.includes(
          (phoneNumber || " ").replaceAll(" ", "")
        );

        return contactMatches || phoneMatches;
      },
      { contactName, phoneNumber }
    );
    if (!verifiedChat)
      throw new Error("Cant Match Contact Name or Phone Number");
  } catch (error) {
    console.log(error);
    throw new Error("Cannot verify chat.");
  }
}

async function openPhone(phoneNumber: string): Promise<void> {
  if (phoneNumber)
    try {
      if (!context.page) throw new Error("Page not initialized");
      const url = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
      await context.page.goto(url, { waitUntil: "networkidle0" });
    } catch (error) {
      console.log(error);
      throw new Error("Cannot open Phone Number.");
    }
}

async function resetSearch(): Promise<void> {
  try {
    if (!context.page) throw new Error("Page not initialized");
    await context.page.type(
      'div[contenteditable="true"][data-tab="3"][aria-label="Search input textbox"]',
      ""
    );
  } catch (error) {
    console.log(error);
  }
}

async function sendMessage(message: string): Promise<void> {
  try {
    if (!context.page) throw new Error("Page not initialized");
    await context.page.waitForSelector(
      '#main div[contenteditable="true"][data-tab="10"]'
    );
    await context.page.type(
      '#main div[contenteditable="true"][data-tab="10"]',
      message
    );
    await context.page.keyboard.press("Enter");
    await delay(1000);
    console.log("Message sent successfully!");
  } catch (error) {
    console.log(error);
    throw new Error("Message was not sent.");
  }
}

async function deleteScreenshot(): Promise<void> {
  try {
    await promises.unlink(screenshotPath);
    console.log("QR code screenshot deleted");
  } catch (error) {
    console.error("Couldn't delete screenshot");
  }
}

async function isLoggedIn(): Promise<boolean> {
  try {
    if (!context.page) throw new Error("Page not initialized");
    await context.page.waitForSelector(".landing-header", {
      timeout: 5000,
    });
    const loggedIn = !(await context.page.evaluate(() => {
      return (
        document.querySelector(".landing-header").innerText == "WHATSAPP WEB"
      );
    }));
    if (loggedIn) {
      return true;
    }
    console.log("WhatsApp is not logged in");
    return false;
  } catch (error) {
    console.log("WhatsApp is logged in");
    return true;
  }
}
async function detectAndCropQRCode(path: string): Promise<void> {
  try {
    // Read the image
    const image = await Jimp.read(path);
    console.log(
      `Image dimensions: ${image.bitmap.width}x${image.bitmap.height}`
    );

    // Create QR code reader
    const qr = new QrCode();

    // Promisify the callback-based decode function
    const qrResult = await new Promise<QrCode.QrCodeResult>(
      (resolve, reject) => {
        qr.callback = (err, value) =>
          err != null ? reject(err) : resolve(value);
        qr.decode(image.bitmap);
      }
    );

    if (qrResult) {
      console.log("QR Code detected!");
      console.log("Content:", qrResult.result);
      console.log("QR Code points:", JSON.stringify(qrResult.points));

      // Calculate crop area with increased padding
      const padding = 50; // Increased padding
      const minX = Math.min(...qrResult.points.map((p) => p.x));
      const minY = Math.min(...qrResult.points.map((p) => p.y));
      const maxX = Math.max(...qrResult.points.map((p) => p.x));
      const maxY = Math.max(...qrResult.points.map((p) => p.y));

      const x = Math.max(0, minX - padding);
      const y = Math.max(0, minY - padding);
      const width = Math.min(image.bitmap.width - x, maxX - minX + 2 * padding);
      const height = Math.min(
        image.bitmap.height - y,
        maxY - minY + 2 * padding
      );

      console.log(
        `Crop dimensions: x=${x}, y=${y}, width=${width}, height=${height}`
      );

      if (width <= 0 || height <= 0) {
        throw new Error(
          `Invalid crop dimensions: width=${width}, height=${height}`
        );
      }

      // Crop the image
      const croppedImage = image.clone().crop(x, y, width, height);

      // Save the cropped image
      await croppedImage.writeAsync(path);
      console.log("Cropped QR code saved to:", path);
    } else {
      console.log("No QR code detected in the image.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function takeQRCode(): Promise<string> {
  try {
    if (!context.page) throw new Error("Page not initialized");
    await context.page.waitForSelector(".landing-main", { timeout: 15000 });
    await context.page.screenshot({ path: screenshotPath });
    console.log("Took screenshot");
    detectAndCropQRCode(screenshotPath);
    return "/whatsapp_qr.png";
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getLinkCode(): Promise<string> {
  const linkCode = await context.page.evaluate(() => {
    const element = document.querySelector(
      '[aria-label="Enter code on phone:"] > div'
    );
    return element
      ? element.getAttribute("data-link-code").replaceAll(",", " ")
      : null;
  });
  return linkCode;
}
async function takeLinkCode(phoneNumber: string): Promise<string> {
  try {
    if (!context.page) throw new Error("Page not initialized");
    await context.page.waitForSelector(".landing-main", { timeout: 15000 });
    await context.page.waitForSelector('[role="button"]:nth-of-type(1)');
    await context.page.click('[role="button"]:nth-of-type(1)');
    await delay(500);
    await context.page.click("button");
    await context.page.waitForSelector(
      'div[contenteditable="true"][data-lexical-editor="true"]',
      {
        timeout: 60000,
      }
    );
    await context.page.type(
      'div[contenteditable="true"][data-lexical-editor="true"]',
      "india",
      {
        delay: 100,
      }
    );
    await context.page.click(
      '[aria-label="Selected country: India. Click to select a different country."]'
    );
    await delay(500);
    await context.page.waitForSelector(
      '[aria-label="Type your phone number."]',
      {
        timeout: 60000,
      }
    );
    await context.page.type(
      '[aria-label="Type your phone number."]',
      phoneNumber,
      {
        delay: 100,
      }
    );
    await context.page.waitForSelector(
      ".landing-main > div > div:nth-of-type(3) > div:nth-of-type(2) button",
      {
        timeout: 60000,
      }
    );
    await context.page.click(
      ".landing-main > div > div:nth-of-type(3) > div:nth-of-type(2) button"
    );
    await context.page.waitForSelector(
      '[aria-label="Enter code on phone:"] > div[data-link-code]',
      {
        timeout: 60000,
      }
    );
    return await getLinkCode();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function waitForQRLogin(): Promise<boolean> {
  let lastQRCode: string = "";
  while (true) {
    try {
      if (!context.page) throw new Error("Page not initialized");
      const qrCodeSelector = 'div[data-testid="qrcode"]';
      await context.page.waitForSelector(qrCodeSelector, { timeout: 5000 });
      const currentQRCode = await context.page.$eval(
        qrCodeSelector,
        (el: Element) => (el as HTMLElement).dataset.ref || ""
      );
      if (currentQRCode !== lastQRCode) {
        lastQRCode = currentQRCode;
        await takeQRCode();
        console.log("New QR code detected, updated screenshot");
      }
    } catch (error) {
      console.log("QR code not found, checking if logged in");
      if (await isLoggedIn()) {
        console.log("Successfully logged in via QR code");
        await deleteScreenshot();
        return true;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

async function waitForLinkCode(phoneNumber: string): Promise<boolean> {
  let lastLinkCode: string = "";
  while (true) {
    try {
      if (!context.page) throw new Error("Page not initialized");
      const linkCodeSelector = '[aria-label="Enter code on phone:"] > div';
      await context.page.waitForSelector(linkCodeSelector, { timeout: 5000 });
      const currentLinkCode = await context.page.evaluate(() => {
        const element = document.querySelector(
          '[aria-label="Enter code on phone:"] > div'
        );
        return element ? element.getAttribute("data-link-code") : null;
      });

      if (currentLinkCode !== lastLinkCode) {
        lastLinkCode = currentLinkCode;
        const linkCode = await getLinkCode();
        console.log("New Link code detected, " + linkCode);
      }
    } catch (error) {
      console.log("Link code not found, checking if logged in");
      if (await isLoggedIn()) {
        console.log("Successfully logged in via Link Code");
        return true;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

app.get("/", async (req: Request, res: Response) => {
  res.send("api working")
})



app.post("/login", async (req: Request, res: Response) => {
  try {
    const { phoneNumber, method } = req.body;

    if (await isLoggedIn()) {
      res.json({ success: true, message: "Already logged in" });
      return;
    }

    if (method == "code" && !phoneNumber) {
      res.json({ success: false, message: "Please provide Phone Number" });
      return;
    }

    switch (method) {
      case "qr":
        const qrCodeUrl = await takeQRCode();
        res.json({
          success: false,
          message: "Log via QR code",
          qrCodeUrl,
        });
        await waitForQRLogin();
        break;

      case "code":
        const linkCode = await takeLinkCode(phoneNumber);
        res.json({
          success: false,
          message: "Log in via this link code.",
          linkCode,
        });
        await waitForLinkCode(phoneNumber);
        break;

      default:
        res.json({ success: false, message: "Invalid method" });
        break;
    }
    return;
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/send", async (req: Request, res: Response) => {
  const { contactName, message, phoneNumber } = req.body;

  if (!contactName && !phoneNumber) {
    res.status(400).json({ success: false, message: "No Parameter Specified" });
    return;
  }

  if (!(await isLoggedIn())) {
    res.json({ success: false, message: "Whatsapp not logged in" });
    return;
  }

  res.json({ success: true, message: "Message queued for sending" });

  // Queue the sending task
  requestQueue.enqueue(async () => {
    try {
      if (contactName && !phoneNumber) {
        await openContact(contactName);
      } else if (contactName && phoneNumber) {
        try {
          await openContact(contactName);
        } catch {
          await openPhone(phoneNumber);
        }
      } else if (phoneNumber && !contactName) {
        await openPhone(phoneNumber);
      }
      await verifyChat(contactName, phoneNumber);
      await sendMessage(message);
      await resetSearch();
      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      failedMessages.push({
        contactName,
        phoneNumber,
        message,
        error: error.message || "Unknown error occurred",
      });
    }
  });
});

app.get("/failed-messages", (req: Request, res: Response) => {
  res.json({ success: true, failedMessages });
});

app.post("/retry-failed-messages", async (req: Request, res: Response) => {
  res.json({ success: true, message: "Retrying failed messages" });

  requestQueue.enqueue(async () => {
    const messagesToRetry = [...failedMessages];
    failedMessages = [];

    for (const failedMessage of messagesToRetry) {
      try {
        await isLoggedIn();
        await openContact(failedMessage.contactName);
        await openPhone(failedMessage.phoneNumber);
        await verifyChat(failedMessage.contactName, failedMessage.phoneNumber);
        await sendMessage(failedMessage.message);
        await resetSearch();
        console.log("Failed message sent successfully on retry!");
      } catch (error) {
        console.error("Error sending failed message on retry:", error);
        failedMessages.push({
          ...failedMessage,
          error: error.message || "Unknown error occurred on retry",
        });
      }
    }
  });
});

app.use('*', (req, res) => {
  console.log('Received request for:', req.originalUrl);
});

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  try {
    await initializeBrowser();
    console.log("Browser Started");
  } catch (error) {
    console.error("Failed to start the browser:", error);
    process.exit(1);
  }
});

process.on("SIGINT", async () => {
  console.log("Closing browser and shutting down server...");
  if (context.browser) {
    try {
      await context.browser.close();
      console.log("Browser closed successfully");
    } catch (error) {
      console.error("Error closing browser:", error);
    }
  }
  process.exit();
});
