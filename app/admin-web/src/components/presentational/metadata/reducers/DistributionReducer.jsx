import { INIT_DISTRIBUTION_ARGS } from "../MetadataManagementContent";

export default function DistributionReducer(state, action) {
  const { type, payload } = action;

  if (type === "clear") {
    return {
      ...INIT_DISTRIBUTION_ARGS,
    };
  }

  if (type === "data-ex-79") {
    return {
      description:
        "VDS_ID, 지점이정, VDS존시작이정, VDS존종료이정, 노선번호, VDS존유형구 분코드, 노선구성순번, 기점종점방향구분코드, VDS존길이, 도로등급구분코드, 콘존ID",
      temporalResolution: "1일",
      accrualPeriodicty: "1일",
      spatial: "전국",
      temporal: "2021.01.01.~2021.01.31",
    };
  }

  if (type === "data-ex-78") {
    return {
      description:
        "콘존ID, 콘존길이, 기점종점방향구분코드, 시작노드ID, 종료노드ID, 차로수, 노 선번호, 제한속도, 노선구성순번, 콘존명, 버스전용차로유무, 도로등급구분코드",
      temporalResolution: "1일",
      accrualPeriodicty: "1일",
      spatial: "전국",
      temporal: "2021.01.01",
    };
  }

  if (type === "data-ex-38") {
    return {
      description:
        "집계일자(PK), 집계시분 Or 집계시 Or 제외(PK), 콘존ID(PK), 차로유형구분코드 (PK), 교통량",
      temporalResolution: "5분",
      accrualPeriodicty: "1일",
      spatial: "전국",
      temporal: "2021.01.01.~2021.01.31",
    };
  }

  if (type === "data-ex-23") {
    return {
      description:
        "집계일자(PK), 집계시분 Or 집계시 Or 제외(PK), 콘존ID(PK), 차로유형구분코드 (PK), 평균속도",
      temporalResolution: "5분",
      accrualPeriodicty: "1일",
      spatial: "전국",
      temporal: "2021.01.01.~2021.01.31",
    };
  }

  if (type === "data-kma-36") {
    return {
      description:
        "기상강원지방기상청 춘천기상대에서 측정한 데이터로 철원지점 해발고도 155m 지점에서 측정된 자료",
      temporalResolution: "1분",
      accrualPeriodicty: "1일",
      spatial: "위도 : 38.14787 경도 : 127.3042",
      temporal: "2022.01.31~2022.01.31",
    };
  }

  return {
    ...state,
    [payload.name]: payload.value,
  };
}
