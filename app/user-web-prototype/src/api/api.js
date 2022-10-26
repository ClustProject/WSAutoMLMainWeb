import axios from "axios";

const LOCALHOST_PREFIX = "http://localhost:3000";

function getFeatureSelectionContent() {
  return axios
    .get(LOCALHOST_PREFIX + "/data/feature-selection.json")
    .then((response) => response.data);
}

function getNavigationContent() {
  return axios
    .get(LOCALHOST_PREFIX + "/data/data-navigation-content.json")
    .then((response) => response.data);
}

function getModelLearningResult() {
  return axios
    .get(LOCALHOST_PREFIX + "/data/model-learning-result.json")
    .then((response) => response.data);
}

export {
  getFeatureSelectionContent,
  getNavigationContent,
  getModelLearningResult,
};
