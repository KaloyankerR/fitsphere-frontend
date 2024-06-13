import { useState, useCallback } from "react";
import { fetchUsersByRole } from "../../config/apiGet";
import useErrorHandler from "../../config/useErrorHandler";

const useGetUsersRequests = (accessToken) => {
  const [users, setUsers] = useState([]);
  const { handleErrors } = useErrorHandler();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(
    async (role) => {
      setIsLoading(true);
      try {
        const data = await fetchUsersByRole(role, accessToken);
        setUsers(data);
      } catch (error) {
        handleErrors(error);
      } finally {
        setIsLoading(false);
      }
    }, 
    [accessToken]
  );

  return { users, fetchUsers, isLoading };
};

export default useGetUsersRequests;
