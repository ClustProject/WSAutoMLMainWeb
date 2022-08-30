import Vds23WithUrlMetadataInputMacro from './macros/implementation/Vds23WithUrlMetadataInputMacro';
import puppeteer from "puppeteer-extra";

import {BROWSER_OPTIONS} from './common/constrants'
import {googleLogin} from "./common/functions";

(async () => {
  const browser = await puppeteer.launch(BROWSER_OPTIONS);
  const page = await browser.newPage();

  await googleLogin(page);

  await new Vds23WithUrlMetadataInputMacro(page).run();

  await browser.close();
})();
