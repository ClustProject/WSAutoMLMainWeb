import {CATEGORY_THEME_MAP} from "../constants";

export const INIT_CATALOG_ARGS = {
  themes: [],
};

export default function CatalogReducer(state, action) {
  const {type, payload} = action;

  if (type === "clear") {
    return {
      ...INIT_CATALOG_ARGS
    }
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
    [payload.name]: payload.value
  }
}
