import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config";

const url = BASE_URL + "/workouts/trainer";

const useGetWorkoutsByTrainerRequest = (accessToken) => {
    const [workoutsData, setWorkoutsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchDataByTrainer = useCallback(async (trainerId) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${url}/${trainerId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setWorkoutsData(response.data);
        } catch (error) {
            let errorMessage = handleErrors(error);
            navigate("*", { state: { errorMessage: errorMessage } });
        } finally {
            setIsLoading(false);
        }
    }, [accessToken, navigate]);

    const handleErrors = (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    return 'Your session has expired. Please login again.';
                case 404:
                    return 'No workouts found for this trainer.';
                default:
                    return 'Bad request. Please try again.';
            }
        } else if (error.request) {
            return 'Unable to connect. Please check your internet connection.';
        } else {
            return 'An unexpected error occurred.';
        }
    };

    return { workoutsData, fetchDataByTrainer, isLoading };
};

export default useGetWorkoutsByTrainerRequest;
