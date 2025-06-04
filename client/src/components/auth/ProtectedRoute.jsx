import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useContext(AuthContext);
  const location = useLocation();

 

  // If user is not authenticated, redirect to login 
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

 
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
  
    return <Navigate to="/" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;
