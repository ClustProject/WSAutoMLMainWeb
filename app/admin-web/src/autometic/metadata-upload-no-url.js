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
  await clickLinkCheckBox(page);
  await clickLinkInputNextButton(page);

  await selectDropDown(page, 1);
  await selectDropDown(page, 1);
  await typeText(page, "국내 교통");
  await typeText(page, "VDS존");
  await typeText(page, "한국도로공사");
  await selectDropDown(page, 1);
  await selectDropDown(page, 2);
  await selectDropDown(page, 3);
  await typeText(page, "구간, 교통량, VDS, VDS존, 콘존");
  await selectDropDown(page, 2);
  await selectDropDown(page, 1);
  await typeText(page, "한국도로공사에서 제공한 구간(CONZON) 별 교통량을 VDS 수집체계로부터 획 득한 자료");
  await typeText(page, "VDS_ID, 지점이정, VDS존시작이정, VDS존종료이정, 노선번호, VDS존유형구 분코드, 노선구성순번, 기점종점방향구분코드, VDS존길이, 도로등급구분코드, 콘존ID");
  await typeText(page, "1일");
  await typeText(page, "1일");
  await typeText(page, "전국");
  await typeText(page, "2021.01.01.~2021.01.31");

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

async function clickLinkCheckBox(page) {
  await page.click('input#linkCheckBox');
}

async function clickLinkInputNextButton(page) {
  await page.click('button#linkInputNextButton');
}

async function clickUploadButton(page) {
  await page.click('button#uploadButton');
}

/**
 * n번째 드롭다운을 선택합니다.
 */
async function selectDropDown(page, n) {
  await page.keyboard.press("Tab");
  for (let i = 0; i < n; i++) {
    await page.keyboard.press("ArrowDown");
  }
  await page.keyboard.press("Enter");
}

async function uploadFile(page) {
  await page.keyboard.press("Tab");
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click("input#file"),
  ]);
  await fileChooser.accept([FILE_NAME]);
}

async function typeText(page, text) {
  await page.keyboard.press("Tab");
  await page.keyboard.type(text);
}
