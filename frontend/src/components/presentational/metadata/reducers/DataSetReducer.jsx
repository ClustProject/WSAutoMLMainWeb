import {CREATOR_CONTACT_POINT_NAME_MAP, LICENSE_RIGHTS_MAP} from "../constants";

export const INIT_DATASET_ARGS = {
  contactPointNames: [],
  rightses: [],
};

export default function DataSetReducer(state, action) {
  const {type, payload} = action;

  if (type === "clear") {
    return {
      ...INIT_DATASET_ARGS
    }
  }

  if (type === "data.go.kr") {
    return {
      ...state,
      name: payload.name,
      description: payload.description,
      publisher: payload.creator.name,
      keyword: payload.keywords.reduce((acc, cur) => `${acc},${cur}`)
    }
  }

  if (payload.name === "creator") {
    return {
      ...state,
      [payload.name]: payload.value,
      contactPointNames: CREATOR_CONTACT_POINT_NAME_MAP[payload.value]
    }
  }

  if (payload.name === "license") {
    return {
      ...state,
      [payload.name]: payload.value,
      rightses: LICENSE_RIGHTS_MAP[payload.value]
    }
  }

  return {
    ...state,
    [payload.name]: payload.value
  };
}
