import axios from 'axios';

export async function getUserInfo() {
  return axios.get("/user/info")
    .then(response => response.data)
}
