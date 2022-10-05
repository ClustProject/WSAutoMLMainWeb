import axios from 'axios'

function getCategoryCount() {
  return axios.get("/category/count")
    .then(response => response.data);
}

export default getCategoryCount;
