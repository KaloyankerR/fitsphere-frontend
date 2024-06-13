import { useState, useCallback } from "react";
import useErrorHandler from "../../config/useErrorHandler";
import { fetchAllAppointments } from "../../config/apiGet";

const useGetAllAppointments = (accessToken) => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { handleErrors } = useErrorHandler();
    
    const fetchAppointments = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await fetchAllAppointments(accessToken);
            setAppointments(data.appointments);
        } catch (error) {
            handleErrors(error);
        } finally {
            setIsLoading(false);
        }
    }, [accessToken]);

    return { appointments, fetchAppointments, isLoading };
};

export default useGetAllAppointments;   