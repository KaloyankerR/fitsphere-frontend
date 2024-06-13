import { useNavigate } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import { useContext } from "react";

const useErrorHandler = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleErrors = (error, shouldNavigate = false) => {

    let errorMessage;
    if (error.response) {
      switch (error.response.status) {
        case 401:
          logout();
          errorMessage = "Your session has expired. Please login again.";
          break;
        case 404:
          errorMessage = "There are no appointments for this user.";
          break;
        default:
          errorMessage = "Bad request. Please try again.";
      }
    } else if (error.request) {
      errorMessage =
        "Unable to connect. Please check your internet connection.";
    } else {
      errorMessage = "An unexpected error occurred.";
    }

    if (error.code === "ERR_NETWORK"){
      logout();
      errorMessage = "Your session has expired. Please login again.";
      navigate("/signin");
    }

    if (shouldNavigate) {
      navigate("*", { state: { errorMessage: errorMessage } });
    }

    return errorMessage;
  };

  return { handleErrors };
};

export default useErrorHandler;
