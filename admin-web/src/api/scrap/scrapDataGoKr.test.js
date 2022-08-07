import {extractIdFromUrl, matchDataGoKrUrl} from "./scrapDataGoKr";

describe("matchDataGoKrUrlRegex 메서드는", () => {

  it("일치한 url이 주어진 경우 true를 리턴한다", () => {
    const url = "https://www.data.go.kr/data/15050247/fileData.do";

    const actual = matchDataGoKrUrl(url);

    expect(actual).toBe(true);
  })

  it("일치하지 않는 url이 주어진 경우 false를 리턴한다", () => {
    const url = "https://data-on.co.kr/";

    const actual = matchDataGoKrUrl(url);

    expect(actual).toBe(false);
  })
})

describe("extractIdFromUrl 메서드는", () => {

  it("URL에서 추출한 id를 리턴한다", () => {
    const url = "https://www.data.go.kr/data/15050247/fileData.do";

    const id = extractIdFromUrl(url);

    expect(id).toBe("15050247");
  })
})
