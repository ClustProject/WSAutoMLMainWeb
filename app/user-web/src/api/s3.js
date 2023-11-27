import axios from "axios";

export async function getPreSignedUrl(filename) {
  return axios.get(`/url/presigned?filename=${filename}`).then((response) => ({
    uploadUrl: response.data.uploadUrl,
    downloadUrl: response.data.downloadUrl,
  }));
}

export async function uploadFileToS3(preSignedUrl, file, setUploadPercent) {
  return axios.put(preSignedUrl, file, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: function (progressEvent) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );

      setUploadPercent(percentCompleted);
    },
  });
}

export async function deleteFileFromS3(keys) {
  return axios.post(`/files`, keys);
}
