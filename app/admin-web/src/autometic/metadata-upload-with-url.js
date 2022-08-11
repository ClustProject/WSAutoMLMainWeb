require("dotenv").config();

const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(stealthPlugin()); // 구글 로그인을 위해 해당 플러그인 사용

const OPTIONS = {
  headless: false, // 브라우저 창을 연다
  args: [`--window-size=1920,1080`],
  defaultViewport: {
    width: 1920,
    height: 1080
  }
};
const WEB_URL = 'http://localhost:3000/metadata/management';
const SERVER_URL = 'http://localhost:8080/metadata/management';
const FILE_NAME = './ETC_79_04_01_510483.csv';
const SOURCE_URL = "http://data.ex.co.kr/portal/fdwn/view?type=ETC&num=79&requestfrom=dataset";

(async () => {
  const browser = await puppeteer.launch(OPTIONS);
  const page = await browser.newPage();

  await googleLogin(page);
  // 구글 로그인 후 URL이 리다이렉트되어 바뀌기를 기다린다.
  await page.waitForFunction(`window.location.href == '${SERVER_URL}'`)

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
})()

async function typeSourceUrl(page) {
  await page.type("input#sourceUrl", SOURCE_URL);
}

async function googleLogin(page) {
  await page.goto(SERVER_URL, {
    // waitUntil: 'networkidle2',
  });

  await page.type("input#identifierId", process.env.GOOGLE_EMAIL)
  await page.keyboard.press("Enter");

  await page.waitForSelector('input[type="password"]', {visible: true});

  await page.type("input[type=password]", process.env.GOOGLE_PASSWORD)
  await page.keyboard.press("Enter");
}

async function clickFinishButton(page) {
  await page.click("button#finishButton");
}

async function clickLinkInputNextButton(page) {
  await page.click('button#linkInputNextButton');
}

async function clickUploadButton(page) {
  await page.click('button#uploadButton');
}

async function uploadFile(page) {
  await page.keyboard.press("Tab");
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click("input#file"),
  ]);
  await fileChooser.accept([FILE_NAME]);
}
