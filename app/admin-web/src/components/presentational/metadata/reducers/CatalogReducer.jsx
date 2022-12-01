import {CATEGORY_THEME_MAP} from "../constants";
import {INIT_CATALOG_ARGS} from "../MetadataManagementContent";

export default function CatalogReducer(state, action) {
  const {type, payload} = action;

  if (type === "test") {
    retirn {
      category: "오픈데이터",
      themes: CATEGORY_THEME_MAP.오픈데이터,
      theme: "test",
      themeTaxonomy: "test"
    }
  }
  
  if (type === "clear") {
    return {
      ...INIT_CATALOG_ARGS
    }
  }

  if (type === "data.ex.co.kr") {
    return {
      category: "오픈데이터",
      themes: CATEGORY_THEME_MAP.오픈데이터,
      theme: "교통",
      themeTaxonomy: "국내 교통"
    }
  }

  if (type === "data-kma-36") {
    return {
      category: "대기 환경",
      themes: CATEGORY_THEME_MAP["대기 환경"],
      theme: "공기질",
      themeTaxonomy: "실외 대기"
    }
  }

  if (type !== undefined) {
    if (type.startsWith("kma")) {
      return {
        category: "대기 환경",
        themes: CATEGORY_THEME_MAP["대기 환경"],
        theme: "공기질",
        themeTaxonomy: "실외 대기"
      };
    }

    //교통 하드 코딩
    if (type.startsWith("ex/tcs")) {
      return {
        category: "오픈데이터",
        themes: CATEGORY_THEME_MAP.오픈데이터,
        theme: "교통",
        themeTaxonomy: "국내 교통"
      }
    }
    //교통 하드 코딩
  }

  if (payload.name === "category") {
    return {
      ...state,
      [payload.name]: payload.value,
      themes: CATEGORY_THEME_MAP[payload.value] // 카테고리에 따른 주제 목록 리스트 설정
    };
  }

  return {
    ...state,
    [payload.name]: payload.value,
  }
}
