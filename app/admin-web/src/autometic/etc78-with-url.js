import Etc78WithUrlMetadataInputMacro from './macros/implementation/Etc78WithUrlMetadataInputMacro';
import puppeteer from "puppeteer-extra";

import {BROWSER_OPTIONS} from './common/constrants'
import {googleLogin} from "./common/functions";

(async () => {
  const browser = await puppeteer.launch(BROWSER_OPTIONS);
  const page = await browser.newPage();

  await googleLogin(page);

  await new Etc78WithUrlMetadataInputMacro(page).run();

  await browser.close();
})();
