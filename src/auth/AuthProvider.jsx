import { useState } from "react";
import TokenManager from "./TokenManager";
import AuthContext from "./AuthContext";
import PropTypes from "prop-types";

const AuthProvider = ({ children }) => {
  const existingUser = TokenManager.getClaims() || null;
  const [user, setUser] = useState(existingUser);

  const login = (token, rememberMe) => {
    try {
      const userDetails = TokenManager.setAccessToken(token, rememberMe);
      setUser(userDetails);
    } catch (error) {
      console.error("Failed to set access token in login: ", error);
    }
  };

  const logout = () => {
    TokenManager.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
