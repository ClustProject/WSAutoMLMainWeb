import axios from "axios";
import {LOCALHOST_PREFIX} from "../contants";

function getNavigationContent() {
  return axios.get(LOCALHOST_PREFIX + "/data/data-navigation-content.json")
    .then(response => response.data);
}

export default getNavigationContent;
