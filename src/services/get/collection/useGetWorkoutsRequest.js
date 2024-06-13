import { useState, useCallback } from "react";
import { fetchWorkoutsRequest } from "../../config/apiGet";
import useErrorHandler from "../../config/useErrorHandler";

const useGetWorkoutsRequests = () => {
  const [workouts, setWorkouts] = useState([]);
  const { handleErrors } = useErrorHandler();

  const fetchWorkouts = useCallback(async () => {
    try {
      const data = await fetchWorkoutsRequest();
      setWorkouts(data.workouts);
    } catch (error) {
      handleErrors(error);
    }
  }, []);

  return { workouts, fetchWorkouts };
};

export default useGetWorkoutsRequests;
