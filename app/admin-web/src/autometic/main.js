import Etc79NoUrlMetadataInputMacro from "./macros/implementation/Etc79NoUrlMetadataInputMacro";
import puppeteer from "puppeteer-extra";

import {BROWSER_OPTIONS, URL} from './common/constrants'
import dotenv from "dotenv";
import {INPUT_ID, INPUT_PASSWORD} from "./common/selectors";

(async () => {
  const browser = await puppeteer.launch(BROWSER_OPTIONS);
  const page = await browser.newPage();

  await googleLogin(page);

  const macros = [new Etc79NoUrlMetadataInputMacro(page), new Etc79NoUrlMetadataInputMacro(page)];
  for (const macro of macros) {
    await macro.run();
  }

  await browser.close();
})();

async function googleLogin(page) {
  dotenv.config();

  await page.goto(URL);

  await page.type(INPUT_ID, process.env.GOOGLE_EMAIL)
  await page.keyboard.press("Enter");

  await page.waitForSelector(INPUT_PASSWORD, {visible: true});

  await page.type(INPUT_PASSWORD, process.env.GOOGLE_PASSWORD)
  await page.keyboard.press("Enter");

  // 구글 로그인 후 URL이 리다이렉트되어 바뀌기를 기다린다.
  await page.waitForFunction(`window.location.href == "${URL}"`)
}
