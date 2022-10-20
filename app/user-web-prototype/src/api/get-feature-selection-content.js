import axios from "axios";
import {LOCALHOST_PREFIX} from "../contants";

function getFeatureSelectionContent() {
  return axios.get(LOCALHOST_PREFIX + "/data/feature-selection.json")
    .then(response => response.data);
}

export default getFeatureSelectionContent;
