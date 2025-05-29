import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import{ AuthContext} from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const location = useLocation();

  // While checking authentication, show a basic loading text
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
