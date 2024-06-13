import useErrorHandler from "../config/useErrorHandler";
import { postWorkout } from "../config/apiPost";

const usePostWorkoutRequest = (accessToken) => {
  const { handleErrors } = useErrorHandler();

  const postData = async (values) => {
    try {
      await postWorkout(values, accessToken);
    } catch (error) {
      handleErrors(error);
    }
  };

  return { postData };
};

export default usePostWorkoutRequest;
