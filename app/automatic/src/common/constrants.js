export const loginURL = "http://localhost:3000";

export const homeURL = "http://localhost:3000/home";

export const metaDataURL = "http://localhost:3000/metadata/management";

export const BROWSER_OPTIONS = {
  headless: false, // 브라우저 창을 연다
  args: [
    `--window-size=1920,1080`, // 브라우저 창 크기 설정
    `--window-position=1530,-220`, // 복제된 화면에 창이 나타나게 브라우저 창의 위치를 설정
  ],
  defaultViewport: {
    width: 1920,
    height: 920,
  },
};
