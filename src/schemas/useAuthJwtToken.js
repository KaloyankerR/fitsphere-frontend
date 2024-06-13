import axios from "axios";
import { useContext } from "react";
import AuthContext from "../auth/AuthContext";
import { BASE_URL } from "../services/config/config";

const url = BASE_URL + "/tokens";

const useAuthJwtToken = () => {
  const { login } = useContext(AuthContext);

  const performLogin = async (email, password, rememberMe) => {
    try {
      // console.log("Login attempt: ", email, password, rememberMe); TODO: remove
      const resp = await axios.post(url, { email, password });
      login(resp.data.accessToken, rememberMe);
      // console.log(resp.data.accessToken); TODO: remove
    } catch (error) {
      console.error("Login error:", error.response && error.response.data, error);
      throw error;
    }
  };

  return performLogin;
};

export default useAuthJwtToken;
