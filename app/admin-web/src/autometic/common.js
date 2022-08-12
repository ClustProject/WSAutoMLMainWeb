const SERVER_URL = 'http://localhost:8080/metadata/management';
const FILE_NAME = './ETC_79_04_01_510483.csv';

module.exports.OPTIONS = {
  headless: false, // 브라우저 창을 연다
  args: [`--window-size=1920,1080`],
  defaultViewport: {
    width: 1920,
    height: 1080
  }
};

module.exports.WEB_URL = 'http://localhost:3000/metadata/management';

module.exports.googleLogin = async function (page) {
  require('dotenv').config();

  await page.goto(SERVER_URL, {
    // waitUntil: 'networkidle2',
  });

  await page.type("input#identifierId", process.env.GOOGLE_EMAIL)
  await page.keyboard.press("Enter");

  await page.waitForSelector('input[type="password"]', {visible: true});

  await page.type("input[type=password]", process.env.GOOGLE_PASSWORD)
  await page.keyboard.press("Enter");

  // 구글 로그인 후 URL이 리다이렉트되어 바뀌기를 기다린다.
  await page.waitForFunction(`window.location.href == '${SERVER_URL}'`)
}

module.exports.clickFinishButton = async function (page) {
  await page.click("button#finishButton");
}

module.exports.clickLinkCheckBox = async function (page) {
  await page.click('input#linkCheckBox');
}

module.exports.clickLinkInputNextButton = async function (page) {
  await page.click('button#linkInputNextButton');
}

module.exports.clickUploadButton = async function (page) {
  await page.click('button#uploadButton');
}

module.exports.uploadFile = async function (page) {
  await page.keyboard.press("Tab");
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click("input#file"),
  ]);
  await fileChooser.accept([FILE_NAME]);
}
