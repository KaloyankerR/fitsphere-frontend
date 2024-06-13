import useErrorHandler from "../config/useErrorHandler";
import { postRating } from "../config/apiPost";

const usePostTrainerRatingRequest = (accessToken) => {
  const { handleErrors } = useErrorHandler();

  const postData = async (values) => {
    try {
      await postRating(values, accessToken);
    } catch (error) {
      handleErrors(error);
    }
  };

  return { postData };
};

export default usePostTrainerRatingRequest;
