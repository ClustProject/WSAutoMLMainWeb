const {
  WEB_URL, clickUploadButton, clickLinkInputNextButton,
  uploadFile, clickFinishButton, OPTIONS, googleLogin
} = require("./common");

const puppeteer = require("puppeteer-extra");

const SOURCE_URL = "http://data.ex.co.kr/portal/fdwn/view?type=ETC&num=79&requestfrom=dataset";

(async () => {
  const browser = await puppeteer.launch(OPTIONS);
  const page = await browser.newPage();

  await googleLogin(page);

  await page.goto(WEB_URL);

  console.log("=== 시작 ===");
  const startTime = Date.now();

  await clickUploadButton(page);
  await typeSourceUrl(page);
  await clickLinkInputNextButton(page);

  await uploadFile(page);
  await clickFinishButton(page);

  await page.waitForFunction(
    'document.querySelector("body").innerText.includes("100%")'
  );

  console.log("=== 끝 ===");
  const endTime = Date.now();
  await console.log(`걸린 시간(ms): ${endTime - startTime}`);

  await browser.close();
})();

async function typeSourceUrl(page) {
  await page.type("input#sourceUrl", SOURCE_URL);
}
