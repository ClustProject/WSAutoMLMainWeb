import axios from 'axios';

const DATA_GO_KR_URL_REGEX = /data.go.kr\/data\/\d+/;
const DATA_GO_KR_ID_REGEX = /\d+/;

/**
 * 스크래핑한 JSON 결과를 리턴합니다.
 */
export async function scrap(url) {
  if (!matchDataGoKrUrlRegex(url)) {
    return;
  }

  const extractedId = extractIdFromUrl(url);
  const dataGoKrCatalogUrl = `https://www.data.go.kr/catalog/${extractedId}/fileData.json`;

  return axios.get(dataGoKrCatalogUrl)
    .then(response => response.data)
}

export function extractIdFromUrl(url) {
  return url.split("/")
    .find(it => DATA_GO_KR_ID_REGEX.test(it))
}

export function matchDataGoKrUrlRegex(url) {
  return DATA_GO_KR_URL_REGEX.test(url);
}

