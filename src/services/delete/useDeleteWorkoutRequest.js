import { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config";

const url = BASE_URL + "/workouts";

const useDeleteWorkoutRequest = (accessToken) => {
    const navigate = useNavigate();

    const deleteWorkout = useCallback(async (id) => {
        try {
            await axios.delete(`${url}/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
        } catch (error) {
            let errorMessage = handleErrors(error);
            navigate("*", { state: { errorMessage: errorMessage } });
        }
    }, [accessToken, navigate]);

    const handleErrors = (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    return 'Your session has expired. Please login again.';
                case 404:
                    return 'Workout not found.';
                default:
                    return 'Bad request. Please try again.';
            }
        } else if (error.request) {
            return 'Unable to connect. Please check your internet connection.';
        } else {
            return 'An unexpected error occurred.';
        }
    };

    return { deleteWorkout };
};

export default useDeleteWorkoutRequest;
