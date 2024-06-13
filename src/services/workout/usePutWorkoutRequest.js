import axios from "axios";
import { BASE_URL } from "../config/config";

const url = BASE_URL + "/workouts";

const usePutWorkoutRequest = (accessToken) => {
  const putData = async (id, values) => {
    try {
      await axios.put(`${url}/${id}`, values, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (error) {
      console.error(error.response);
      throw error;
    }
  };

  return { putData };
};

export default usePutWorkoutRequest;
