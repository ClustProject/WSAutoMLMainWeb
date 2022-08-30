import SurfaceAsos95MiNoUrlMetadataInputMacro from "./macros/implementation/SurfaceAsos95MiNoUrlMetadataInputMacro";
import puppeteer from "puppeteer-extra";

import {BROWSER_OPTIONS} from './common/constrants'
import {googleLogin} from "./common/functions";

(async () => {
  const browser = await puppeteer.launch(BROWSER_OPTIONS);
  const page = await browser.newPage();

  await googleLogin(page);

  await new SurfaceAsos95MiNoUrlMetadataInputMacro(page).run();

  await browser.close();
})();
