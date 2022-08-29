import Etc78NoUrlMetadataInputMacro from "./macros/implementation/Etc78NoUrlMetadataInputMacro";
import puppeteer from "puppeteer-extra";

import {BROWSER_OPTIONS} from './common/constrants'
import {googleLogin} from "./common/functions";

(async () => {
  const browser = await puppeteer.launch(BROWSER_OPTIONS);
  const page = await browser.newPage();

  await googleLogin(page);

  await new Etc78NoUrlMetadataInputMacro(page).run();

  await browser.close();
})();

