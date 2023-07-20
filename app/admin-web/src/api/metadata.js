import axios from "axios";

export function getMetadatas() {
  return axios.get("/metadata").then((response) => response.data.data);
}

export async function createMetadata(createMetadataAttributes) {
  return axios.post("/metadata", createMetadataAttributes);
}

export function deleteMetadata(ids) {
  return axios.all(ids.map((id) => axios.delete(`/metadata/${id}`)));
}
