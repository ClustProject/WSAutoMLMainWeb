const mockUserInfo = {
  "name": "박주영"
}

export async function getUserInfo() {
  return Promise.resolve(mockUserInfo);
}
