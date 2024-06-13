import axios from "axios";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config";

const url = BASE_URL + "/workouts/info";

const useGetWorkoutInfoRequest = (accessToken) => {
    const [workoutInfo, setWorkoutInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const fetchDataById = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${url}/${id}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setWorkoutInfo(response.data);
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
                    return 'The user you are looking for does not exist.';
                default:
                    return 'Bad request. Please try again.';
            }
        } else if (error.request) {
            return 'Unable to connect. Please check your internet connection.';
        } else {
            return 'An unexpected error occurred.';
        }
    }
    
    return { workoutInfo, fetchDataById, isLoading };
}

export default useGetWorkoutInfoRequest;
