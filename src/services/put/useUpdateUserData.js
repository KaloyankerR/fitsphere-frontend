import useErrorHandler from "../config/useErrorHandler";
import { putUser } from "../config/apiPut";

const useUpdateUserData = (accessToken) => {
  const { handleErrors } = useErrorHandler();

  const updateUser = async (values) => {
    try {
      await putUser(values, accessToken);
    } catch (error) {
      handleErrors(error);
    }
  };

  return { updateUser };
};

export default useUpdateUserData;
