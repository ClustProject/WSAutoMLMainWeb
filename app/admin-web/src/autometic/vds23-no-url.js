import Vds23NoUrlMetadataInputMacro from "./macros/implementation/Vds23NoUrlMetadataInputMacro";
import puppeteer from "puppeteer-extra";

import {BROWSER_OPTIONS} from './common/constrants'
import {googleLogin} from "./common/functions";

(async () => {
  const browser = await puppeteer.launch(BROWSER_OPTIONS);
  const page = await browser.newPage();

  await googleLogin(page);

  await new Vds23NoUrlMetadataInputMacro(page).run();

  await browser.close();
})();
