import useErrorHandler from "../config/useErrorHandler";
import { postUser } from "../config/apiPost";


const usePostUserRequest = () => {
  const { handleErrors } = useErrorHandler();

  const postData = async (values) => {
    try {
      await postUser(values);
    } catch (error) {
      handleErrors(error);
    }
  };
  
  return { postData };
};

export default usePostUserRequest;
