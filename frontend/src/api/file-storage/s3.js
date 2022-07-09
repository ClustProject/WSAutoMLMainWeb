import axios from 'axios'

export async function uploadFileToS3(preSignedUrl, file) {
  return axios.put(preSignedUrl, file, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      console.log(percentCompleted)
    }
  })
}
