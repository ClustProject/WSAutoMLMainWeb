import axios from 'axios';

export async function getPreSignedUrl(filename) {
  return axios.get(`/url/presigned?filename=${filename}`)
    .then(response => response.data.url);
}
