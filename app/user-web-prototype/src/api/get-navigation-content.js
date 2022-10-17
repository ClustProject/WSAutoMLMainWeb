import axios from "axios";

export const LOCALHOST_PREFIX = "http://localhost:3000";

function getNavigationContent() {
  return axios.get(LOCALHOST_PREFIX + "/data/data-navigation-content.json")
    .then(response => response.data);
}

export default getNavigationContent;
