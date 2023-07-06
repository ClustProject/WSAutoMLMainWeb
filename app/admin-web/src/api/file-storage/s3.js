import axios from "axios";

export async function uploadFileToS3(preSignedUrl, file, setUploadPercent) {
  return axios.put(preSignedUrl, file, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: function(progressEvent) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      setUploadPercent(percentCompleted);
    },
  });
}

export async function deleteFileFromS3(key) {
  return axios.delete(`/file/${key}`);
}
