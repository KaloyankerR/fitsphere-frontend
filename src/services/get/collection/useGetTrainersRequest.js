import { useState, useCallback } from "react";
import { fetchTrainersRequest } from "../../config/apiGet";
import useErrorHandler from "../../config/useErrorHandler";

const useGetTrainersRequest = () => {
  const [trainers, setTrainers] = useState([]);
  const { handleErrors } = useErrorHandler();

  const fetchTrainers = useCallback(async () => {
    try {
      const data = await fetchTrainersRequest();
      setTrainers(data);
    } catch (error) {
      handleErrors(error);
    }
  }, []);

  return [trainers, fetchTrainers];
};

export default useGetTrainersRequest;
