import { useState, useCallback } from "react";
import useErrorHandler from "../../config/useErrorHandler";
import { fetchAppointmentsByUserId } from "../../config/apiGet";

const useGetAppointmentsByUserId = (accessToken) => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { handleErrors } = useErrorHandler();
    
    const fetchData = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const data = await fetchAppointmentsByUserId(id, accessToken);
            setAppointments(data);
        } catch (error) {
            handleErrors(error);
        } finally {
            setIsLoading(false);
        }
    }, [accessToken]);

    return { appointments, fetchData, isLoading };
};

export default useGetAppointmentsByUserId;
