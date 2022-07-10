import axios from 'axios';

export async function getUserInfo() {
  return axios.get("/user/info")
    .then(response => response.data)
}

export async function getUsers() {
  return axios.get("/user")
    .then(response => response.data);
}

export async function putUsersRole(ids, role) {
  return axios.all(
    ids.map(id => axios.put(`/user/${id}/role`, {
        role: role
      })
    )
  );
}
