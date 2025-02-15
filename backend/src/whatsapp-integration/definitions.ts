export type Context = {
  browser?: import("puppeteer").Browser | null;
  page?: import("puppeteer").Page | null;
};
