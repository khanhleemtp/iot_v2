const TOKEN_KEY = "x-auth-token";
const TokenService = {
  getToken(token = TOKEN_KEY) {
    return localStorage.getItem(token);
  },

  saveToken(tokenValues, token = TOKEN_KEY) {
    localStorage.setItem(token, tokenValues);
  },

  removeToken(token = TOKEN_KEY) {
    localStorage.removeItem(token);
  }
};

export { TokenService };
