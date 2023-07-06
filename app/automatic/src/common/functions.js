import dotenv from "dotenv";
import { BROWSER_OPTIONS, loginURL, homeURL, metaDataURL } from "./constrants";
import { INPUT_ID, INPUT_PASSWORD, GOOGLE_LOGIN_BUTTON } from "./selectors";
import puppeteer from "puppeteer-extra";

export async function runMacro(macro) {
  const browser = await puppeteer.launch(BROWSER_OPTIONS);
  const page = await browser.newPage();

  await googleLogin(page);

  const startTime = Date.now();

  try {
    macro.setPage(page);
    await macro.run();
  } catch (error) {
    console.error("An error occurred while running the macro:", error);
  } finally {
    const endTime = Date.now();
    console.log(`걸린 시간: ${endTime - startTime}ms`);

    await browser.close();
  }
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function googleLogin(page) {
  dotenv.config();

  await page.goto(loginURL);

  await page.click(GOOGLE_LOGIN_BUTTON);

  await sleep(1000);

  await page.waitForSelector(INPUT_ID);
  await page.type(INPUT_ID, process.env.GOOGLE_EMAIL);

  await page.keyboard.press("Enter");

  await page.waitForSelector(INPUT_PASSWORD, { visible: true });

  await page.type(INPUT_PASSWORD, process.env.GOOGLE_PASSWORD);
  await page.keyboard.press("Enter");

  // 구글 로그인 후 URL이 리다이렉트되어 바뀌기를 기다린다.
  await page.waitForFunction(`window.location.href == "${homeURL}"`);

  await page.goto(metaDataURL);

  await page.waitForFunction(`window.location.href == "${metaDataURL}"`);
}
