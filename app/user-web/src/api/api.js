import axios from "axios";

// 메타데이터 리스트
function getMetadatas() {
  return axios.get("/metadata").then((response) => response.data.data);
}

function getFeatureSelectionContent() {
  return axios
    .get("/data/feature-selection.json")
    .then((response) => response.data);
}

function getNavigationContent() {
  return axios
    .get("/data/data-navigation-content.json")
    .then((response) => response.data);
}

// 사용자별 모델학습결과 리스트
function getModelLearningResult() {
  return axios.get("/mlResultById").then((response) => response.data.data);
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

export {
  getMetadatas,
  getFeatureSelectionContent,
  getNavigationContent,
  getModelLearningResult,
  getUserInfo,
  deleteModelLearningResult,
};
