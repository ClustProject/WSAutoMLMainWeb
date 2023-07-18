import axios from "axios";

export async function deleteFileFromS3(keys) {
  return axios.post(`/files`, keys);
}
