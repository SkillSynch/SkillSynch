import { NextFunction, Request, Response } from 'express';
import playwright from 'playwright';

let browser: playwright.Browser | null = null;
let context: playwright.BrowserContext | null = null;

async function getBrowser() {
  if (browser) {
    return browser;
  }

  browser = await playwright['chromium'].launch({ headless: true });
  return browser;
}

async function getContext() {
  if (context) {
    return context;
  }

  const browser = await getBrowser();
  context = await browser.newContext();
  return context;
}

async function getNewTab() {
  const context = await getContext();
  const page = await context.newPage();
  return page;
}

async function getHtml(url: string) {
  const page = await getNewTab();
  await page.goto(url);
  const html = await page.content();
  return html;
}

async function getDescription(url: string) {
  const page = await getNewTab();
  await page.goto(url);
  await page.waitForSelector('.adp-body');
  const description = await page.$eval('.adp-body', el => el.textContent);
  return description;
}

// clean up the browser on exit
export async function closeBrowser() {
  if (browser) {
    await browser.close();
    console.log('Browser closed');
  }
}

// create an express controller
export async function getJobHtml(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const url = res.locals.url as string;
  const html = await getHtml(url);
  res.locals.html = html;
  next();
}

export async function getJobDescription(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const url = res.locals.url as string;
  const description = await getDescription(url);
  res.locals.description = description;
  console.log('Scraped job description for', url);
  next();
}

export async function getJobDescriptions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const urls = res.locals.urls as string[];
  const descriptions: string[] = []

  for await (const url of urls) {
    const description = await getDescription(url);
    console.log('Scraped job description for', url);
    if (description) {
      descriptions.push(description)
    }
  }
  res.locals.descriptions = descriptions;
  next();
}

export async function setUrl(req: Request, res: Response, next: NextFunction) {
  const url = `https://www.adzuna.com/details/4443767391?utm_medium=api&utm_source=5e7a40f2`;
  res.locals.url = url;
  next();
}
