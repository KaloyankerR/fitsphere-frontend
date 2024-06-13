import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../auth/AuthContext'; 

const ProtectedRoute = ({ isAllowed, children }) => {
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  } else if (!isAllowed) {
    return <Navigate to="/denied" replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
