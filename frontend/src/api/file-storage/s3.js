import axios from 'axios'

export function uploadFileToS3(preSignedUrl, file) {
  axios.put(preSignedUrl, file, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}
