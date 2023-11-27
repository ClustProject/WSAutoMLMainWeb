import axios from "axios";

let eTag = null; // ETag 값을 저장할 변수

// 메타데이터 리스트
function getMetadatas() {
  return axios.get("/metadata").then((response) => response.data.data);
}

// 사용자별 모델학습결과 리스트
function getModelLearningResult() {
  const headers = {};

  // ETag 값이 존재하면 headers에 추가
  if (eTag) {
    headers["If-None-Match"] = eTag;
  }

  return axios.get("/mlResultById", { headers }).then((response) => {
    // 응답으로부터 ETag 값을 가져와서 저장
    eTag = response.headers.etag;
    return response.data.data;
  });
}

// 사용자 세션 정보
function getUserInfo() {
  return axios
    .get("/user/info", { withCredentials: true })
    .then((response) => response.data);
}

// 모델운영페이지 선택한 mlResult삭제
function deleteModelLearningResult(id) {
  return axios.delete(`/mlResult/${id}`).then((response) => response.data);
}

// 콘존 데이터 구간명 리스트
function getConzonRowNames() {
  return axios
    .get("/conzon/row/id/distinct")
    .then((response) => response.data.data);
}

// 콘존 데이터 구간별 날짜 리스트
function getConzonRowDatesById() {
  return axios
    .get("/conzon/row/date/distinct")
    .then((response) => response.data.data);
}

function getConzonRowData(conzonId, conzonDate) {
  return axios
    .get(`/conzon/row/${conzonId}/${conzonDate}`)
    .then((response) => response.data.data);
}

function getConzonImputatedNames() {
  return axios
    .get("/conzon/imputated/id/distinct")
    .then((response) => response.data.data);
}

// 콘존 데이터 구간별 날짜 리스트
function getConzonImputatedDatesById() {
  return axios
    .get("/conzon/imputated/date/distinct")
    .then((response) => response.data.data);
}

function getConzonImputatedData(conzonId, conzonDate) {
  return axios
    .get(`/conzon/imputated/${conzonId}/${conzonDate}`)
    .then((response) => response.data.data);
}

export {
  getMetadatas,
  getModelLearningResult,
  getUserInfo,
  deleteModelLearningResult,
  getConzonRowNames,
  getConzonRowDatesById,
  getConzonRowData,
  getConzonImputatedNames,
  getConzonImputatedDatesById,
  getConzonImputatedData,
};
