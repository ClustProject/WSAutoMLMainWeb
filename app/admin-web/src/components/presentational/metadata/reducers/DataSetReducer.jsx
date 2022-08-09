import {CREATOR_CONTACT_POINT_NAME_MAP, LICENSE_RIGHTS_MAP} from "../constants";
import {INIT_DATASET_ARGS} from "../MetadataManagementContent";

export default function DataSetReducer(state, action) {
  const {type, payload} = action;

  if (type === "clear") {
    return {
      ...INIT_DATASET_ARGS
    };
  }

  if (type !== undefined && type.startsWith("data-ex-")) {
    const dataExCommonData = {
      publisher: "한국도로공사",
      creator: "위세아이텍",
      contactPointNames: CREATOR_CONTACT_POINT_NAME_MAP.위세아이텍,
      contactPointName: "최태동",
      type: "숫자",
      license: "PUBLIC",
      rightses: LICENSE_RIGHTS_MAP.PUBLIC,
      rights: "All",
    }

    if (type === "data-ex-79") {
      return {
        ...dataExCommonData,
        title: "VDS존",
        keyword: "구간, 교통량, VDS, VDS존, 콘존",
        description: "한국도로공사에서 제공한 구간(CONZON) 별 교통량을 VDS 수집체계로부터 획득한 자료",
      };
    }

    if (type === "data-ex-78") {
      return {
        ...dataExCommonData,
        title: "콘존",
        keyword: "구간, 콘존, 노드, 제한속도",
        description: "콘존에 대한 정보를 ETC 수집체계로부터 획득한 자료",
      }
    }

    if (type === "data-ex-38") {
      return {
        ...dataExCommonData,
        title: "구간 통행속도",
        keyword: "구간, 교통량, VDS, 콘존",
        description: "한국도로공사에서 제공한 구간(CONZON) 별 교통량을 VDS 수집체계로부터 획 득한 자료",
      }
    }

    if (type === "data-ex-23") {
      return {
        ...dataExCommonData,
        title: "구간 통행속도",
        keyword: "통행속도, VDS, 콘존",
        description: "한국도로공사에서 제공한 구간(CONZON) 별 통행속도를 VDS 수집체계로부터 획득한 자료",
      }
    }
  }

  if (type === "data-kma-36") {
    return {
      title: "종간기상관측(ASOS)",
      publisher: "기상청",
      creator: "위세아이텍",
      contactPointNames: CREATOR_CONTACT_POINT_NAME_MAP.위세아이텍,
      contactPointName: "최태동",
      type: "숫자",
      keyword: "기온, 습도, 지면온도, 풍향, 풍속, 일조",
      license: "PUBLIC",
      rightses: LICENSE_RIGHTS_MAP.PUBLIC,
      rights: "All",
      description: "종관기상관측이란 종관규모의 날씨를 파악하기 위하여 정해진 시각에 모든 관측 소에서 같은 시각에 실시하는 지상관측을 말합니다. 종관규모는 일기도에 표현되어 있는 보통의 고기압이나 저기압의 공간적 크기 및 수명을 말하며, 주로 매일의 날씨 현상을 뜻합니다.",
    }
  }

  if (type === "data.go.kr") {
    return {
      ...state,
      title: payload.name,
      description: payload.description,
      publisher: payload.creator.name,
      keyword: payload.keywords.reduce((acc, cur) => `${acc},${cur}`)
    };
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
