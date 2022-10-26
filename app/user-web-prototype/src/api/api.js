import axios from "axios";

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

function getModelLearningResult() {
  return axios
    .get("/data/model-learning-result.json")
    .then((response) => response.data);
}

export {
  getFeatureSelectionContent,
  getNavigationContent,
  getModelLearningResult,
};
