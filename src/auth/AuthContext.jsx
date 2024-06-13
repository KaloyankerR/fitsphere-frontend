import { createContext } from "react";

// const AuthContext = createContext(null);
const AuthContext = createContext({
    user: null,
    login: (token, rememberMe) => {},
    logout: () => {},
  });

export default AuthContext;
