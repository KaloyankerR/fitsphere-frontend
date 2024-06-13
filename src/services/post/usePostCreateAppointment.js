import useErrorHandler from "../config/useErrorHandler";
import { postAppointment } from "../config/apiPost";

const usePostAppointment = (accessToken) => {
  const { handleErrors } = useErrorHandler();

  const postData = async (values) => {
    try {
      await postAppointment(values, accessToken);
    } catch (error) {
      handleErrors(error);
    }
  };

  return { postData };
};

export default usePostAppointment;
