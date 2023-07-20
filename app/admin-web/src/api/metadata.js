import axios from "axios";

export function getMetadatas(page, size) {
  return axios.get(`/metadata?page=${page}&size=${size}`).then((response) => {
    return {
      data: response.data.data,
      totalElements: response.data.totalElements,
    };
  });
}

export async function createMetadata(createMetadataAttributes) {
  return axios.post("/metadata", createMetadataAttributes);
}

export function deleteMetadata(ids) {
  return axios.all(ids.map((id) => axios.delete(`/metadata/${id}`)));
}
