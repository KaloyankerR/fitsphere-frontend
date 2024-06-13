import { useState, useCallback } from "react";
import useErrorHandler from "../config/useErrorHandler";
import { fetchUserById } from "../config/apiGet";

const useGetUserByIdRequest = (accessToken) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { handleErrors } = useErrorHandler();
    
    const fetchDataById = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const data = await fetchUserById(id, accessToken);
            setUser(data);
        } catch (error) {            
            handleErrors(error);
        } finally {
            setIsLoading(false);
        }
    }, [accessToken]);
    
    return { user, fetchDataById, isLoading };
}

export default useGetUserByIdRequest;
