import { jwtDecode } from 'jwt-decode';

const TokenManager = {
  getAccessToken: () => localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"),

  getClaims: () => {
    const claims = localStorage.getItem("claims") || sessionStorage.getItem("claims");
    return claims ? JSON.parse(claims) : undefined;
  },

  setAccessToken: (token, rememberMe = false) => {
    try {
      const claims = jwtDecode(token);
      if (rememberMe) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("claims", JSON.stringify(claims));
      } else {
        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("claims", JSON.stringify(claims));
      }
      return claims;
    } catch (error) {
      console.error("Failed to decode JWT with token: ", token, error);
      throw error;
    }
  },

  clear: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("claims");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("claims");
  },
};

export default TokenManager;
